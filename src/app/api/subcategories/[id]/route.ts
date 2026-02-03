import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { updateSubcategorySchema } from '@/lib/validations/subcategory'

interface RouteParams {
    params: Promise<{ id: string }>
}

// GET /api/subcategories/[id] - Get single subcategory
export async function GET(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const { id } = await params

        const subcategory = await prisma.subcategory.findUnique({
            where: { id },
            include: {
                category: {
                    select: { id: true, name: true, slug: true }
                },
                products: true,
            },
        })

        if (!subcategory) {
            return NextResponse.json(
                { error: 'Subcategoria nu a fost găsită' },
                { status: 404 }
            )
        }

        return NextResponse.json(subcategory)
    } catch (error) {
        console.error('Error fetching subcategory:', error)
        return NextResponse.json(
            { error: 'Failed to fetch subcategory' },
            { status: 500 }
        )
    }
}

// PUT /api/subcategories/[id] - Update subcategory
export async function PUT(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { id } = await params
        const body = await request.json()

        // Validate with Zod
        const validationResult = updateSubcategorySchema.safeParse(body)
        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.issues[0]?.message || 'Date invalide' },
                { status: 400 }
            )
        }

        const { name, nameEn, slug, description, categoryId, image, isActive } = validationResult.data

        // Check if subcategory exists
        const existing = await prisma.subcategory.findUnique({
            where: { id },
        })

        if (!existing) {
            return NextResponse.json(
                { error: 'Subcategoria nu a fost găsită' },
                { status: 404 }
            )
        }

        // If slug is changing, check for conflicts
        if (slug && slug !== existing.slug) {
            const slugConflict = await prisma.subcategory.findFirst({
                where: {
                    categoryId: categoryId || existing.categoryId,
                    slug,
                    id: { not: id },
                },
            })

            if (slugConflict) {
                return NextResponse.json(
                    { error: 'O subcategorie cu acest slug există deja în această categorie' },
                    { status: 400 }
                )
            }
        }

        const subcategory = await prisma.subcategory.update({
            where: { id },
            data: {
                name,
                nameRo: name,
                nameEn,
                slug,
                description,
                categoryId,
                image,
                isActive,
            },
            include: {
                category: {
                    select: { id: true, name: true, slug: true }
                },
            },
        })

        return NextResponse.json(subcategory)
    } catch (error) {
        console.error('Error updating subcategory:', error)
        return NextResponse.json(
            { error: 'Failed to update subcategory' },
            { status: 500 }
        )
    }
}

// DELETE /api/subcategories/[id] - Delete subcategory
export async function DELETE(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { id } = await params

        // Check if subcategory exists
        const existing = await prisma.subcategory.findUnique({
            where: { id },
            include: {
                _count: { select: { products: true } }
            }
        })

        if (!existing) {
            return NextResponse.json(
                { error: 'Subcategoria nu a fost găsită' },
                { status: 404 }
            )
        }

        // Check if subcategory has products
        if (existing._count.products > 0) {
            return NextResponse.json(
                { error: `Subcategoria are ${existing._count.products} produse. Ștergeți sau mutați produsele mai întâi.` },
                { status: 400 }
            )
        }

        await prisma.subcategory.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting subcategory:', error)
        return NextResponse.json(
            { error: 'Failed to delete subcategory' },
            { status: 500 }
        )
    }
}
