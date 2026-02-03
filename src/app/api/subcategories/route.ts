import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { createSubcategorySchema } from '@/lib/validations/subcategory'

// GET /api/subcategories - Get all subcategories (optionally filtered by categoryId)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const categoryId = searchParams.get('categoryId')

        const subcategories = await prisma.subcategory.findMany({
            where: categoryId ? { categoryId } : undefined,
            include: {
                category: {
                    select: { id: true, name: true, slug: true }
                },
                _count: {
                    select: { products: true }
                }
            },
            orderBy: {
                order: 'asc',
            },
        })

        return NextResponse.json(subcategories)
    } catch (error) {
        console.error('Error fetching subcategories:', error)
        return NextResponse.json(
            { error: 'Failed to fetch subcategories' },
            { status: 500 }
        )
    }
}

// POST /api/subcategories - Create new subcategory
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()

        // Validate with Zod
        const validationResult = createSubcategorySchema.safeParse(body)
        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.issues[0]?.message || 'Date invalide' },
                { status: 400 }
            )
        }

        const { name, nameEn, slug, description, categoryId, image, isActive } = validationResult.data

        // Check if category exists
        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        })

        if (!category) {
            return NextResponse.json(
                { error: 'Categoria nu a fost găsită' },
                { status: 400 }
            )
        }

        // Check if slug already exists in this category
        const existing = await prisma.subcategory.findFirst({
            where: {
                categoryId,
                slug,
            },
        })

        if (existing) {
            return NextResponse.json(
                { error: 'O subcategorie cu acest slug există deja în această categorie' },
                { status: 400 }
            )
        }

        // Get max order for new subcategory
        const maxOrder = await prisma.subcategory.findFirst({
            where: { categoryId },
            orderBy: { order: 'desc' },
            select: { order: true },
        })

        const subcategory = await prisma.subcategory.create({
            data: {
                name,
                nameRo: name,
                nameEn: nameEn || name,
                slug,
                description,
                categoryId,
                image: image || '',
                isActive: isActive !== undefined ? isActive : true,
                order: (maxOrder?.order || 0) + 1,
            },
            include: {
                category: {
                    select: { id: true, name: true, slug: true }
                },
            },
        })

        return NextResponse.json(subcategory, { status: 201 })
    } catch (error) {
        console.error('Error creating subcategory:', error)
        return NextResponse.json(
            { error: 'Failed to create subcategory' },
            { status: 500 }
        )
    }
}
