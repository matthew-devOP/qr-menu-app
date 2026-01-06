import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET /api/categories - Get all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subcategories: true,
        products: true,
      },
      orderBy: {
        order: 'asc',
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// POST /api/categories - Create new category
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, nameEn, slug, description, descriptionEn, image, isActive } = body

    // Validation
    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existing = await prisma.category.findUnique({
      where: { slug },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Category with this slug already exists' },
        { status: 400 }
      )
    }

    // Get venue ID (assuming first venue)
    const venue = await prisma.venue.findFirst()

    if (!venue) {
      return NextResponse.json(
        { error: 'No venue found' },
        { status: 400 }
      )
    }

    // Get max order for new category
    const maxOrder = await prisma.category.findFirst({
      where: { venueId: venue.id },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const category = await prisma.category.create({
      data: {
        name,
        nameEn: nameEn || name,
        slug,
        description,
        descriptionEn: descriptionEn || description,
        image: image || '/images/placeholder-category.jpg',
        isActive: isActive !== undefined ? isActive : true,
        order: (maxOrder?.order || 0) + 1,
        venueId: venue.id,
      },
      include: {
        subcategories: true,
        products: true,
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}
