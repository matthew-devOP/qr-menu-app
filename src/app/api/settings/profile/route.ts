import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { hash, compare } from 'bcryptjs'
import { z } from 'zod'

const profileSchema = z.object({
    name: z.string().min(2, 'Numele trebuie să aibă minim 2 caractere').max(100),
    email: z.string().email('Email invalid'),
})

const passwordSchema = z.object({
    currentPassword: z.string().min(1, 'Parola actuală este obligatorie'),
    newPassword: z.string().min(8, 'Parola nouă trebuie să aibă minim 8 caractere'),
    confirmPassword: z.string().min(1, 'Confirmă parola nouă'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Parolele nu coincid',
    path: ['confirmPassword'],
})

// GET /api/settings/profile - Get current user profile
export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const admin = await prisma.admin.findUnique({
            where: { email: session.user.email },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        if (!admin) {
            return NextResponse.json(
                { error: 'Admin nu a fost găsit' },
                { status: 404 }
            )
        }

        return NextResponse.json(admin)
    } catch (error) {
        console.error('Error fetching profile:', error)
        return NextResponse.json(
            { error: 'Failed to fetch profile' },
            { status: 500 }
        )
    }
}

// PUT /api/settings/profile - Update current user profile
export async function PUT(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()

        // Check if this is a password change request
        if (body.currentPassword) {
            const validationResult = passwordSchema.safeParse(body)
            if (!validationResult.success) {
                return NextResponse.json(
                    { error: validationResult.error.issues[0]?.message || 'Date invalide' },
                    { status: 400 }
                )
            }

            const { currentPassword, newPassword } = validationResult.data

            // Get admin with password
            const admin = await prisma.admin.findUnique({
                where: { email: session.user.email },
            })

            if (!admin) {
                return NextResponse.json(
                    { error: 'Admin nu a fost găsit' },
                    { status: 404 }
                )
            }

            // Verify current password
            const isPasswordValid = await compare(currentPassword, admin.password)
            if (!isPasswordValid) {
                return NextResponse.json(
                    { error: 'Parola actuală este incorectă' },
                    { status: 400 }
                )
            }

            // Hash new password and update
            const hashedPassword = await hash(newPassword, 12)
            await prisma.admin.update({
                where: { id: admin.id },
                data: { password: hashedPassword },
            })

            return NextResponse.json({ success: true, message: 'Parola a fost actualizată' })
        }

        // Profile update (name, email)
        const validationResult = profileSchema.safeParse(body)
        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.issues[0]?.message || 'Date invalide' },
                { status: 400 }
            )
        }

        const { name, email } = validationResult.data

        // Check if email is changing and if it's already taken
        if (email !== session.user.email) {
            const existingAdmin = await prisma.admin.findUnique({
                where: { email },
            })

            if (existingAdmin) {
                return NextResponse.json(
                    { error: 'Acest email este deja folosit' },
                    { status: 400 }
                )
            }
        }

        const admin = await prisma.admin.update({
            where: { email: session.user.email },
            data: { name, email },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        return NextResponse.json(admin)
    } catch (error) {
        console.error('Error updating profile:', error)
        return NextResponse.json(
            { error: 'Failed to update profile' },
            { status: 500 }
        )
    }
}
