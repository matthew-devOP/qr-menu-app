import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'
import { slugify } from '@/lib/utils'

const venueSchema = z.object({
    name: z.string().min(1, 'Numele este obligatoriu').max(100),
    description: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    email: z.string().email('Email invalid').optional().nullable().or(z.literal('')),
    logo: z.string().url('URL logo invalid').optional().nullable().or(z.literal('')),
    theme: z.record(z.string(), z.any()).optional().nullable(),
})

// GET /api/settings/venue - Get venue info
export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const venue = await prisma.venue.findFirst()

        if (!venue) {
            return NextResponse.json(
                { error: 'No venue found' },
                { status: 404 }
            )
        }

        return NextResponse.json(venue)
    } catch (error) {
        console.error('Error fetching venue:', error)
        return NextResponse.json(
            { error: 'Failed to fetch venue' },
            { status: 500 }
        )
    }
}

// PUT /api/settings/venue - Update venue info
export async function PUT(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()

        // Validate with Zod
        const validationResult = venueSchema.safeParse(body)
        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.issues[0]?.message || 'Date invalide' },
                { status: 400 }
            )
        }

        const { name, description, address, phone, email, logo, theme } = validationResult.data

        // Get existing venue
        const existingVenue = await prisma.venue.findFirst()

        if (!existingVenue) {
            // Create venue if it doesn't exist
            const venue = await prisma.venue.create({
                data: {
                    name,
                    slug: slugify(name),
                    description,
                    address,
                    phone,
                    email: email || null,
                    logo: logo || null,
                    theme: theme || {},
                },
            })
            return NextResponse.json(venue, { status: 201 })
        }

        // Update existing venue
        const venue = await prisma.venue.update({
            where: { id: existingVenue.id },
            data: {
                name,
                slug: slugify(name),
                description,
                address,
                phone,
                email: email || null,
                logo: logo || null,
                theme: theme ?? undefined,
            },
        })

        return NextResponse.json(venue)
    } catch (error) {
        console.error('Error updating venue:', error)
        return NextResponse.json(
            { error: 'Failed to update venue' },
            { status: 500 }
        )
    }
}
