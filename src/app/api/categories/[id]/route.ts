import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET /api/categories/[id] - Get single category
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        subcategories: true,
        products: true,
      },
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('Error fetching category:', error)
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    )
  }
}

// PUT /api/categories/[id] - Update category
export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, nameEn, slug, description, descriptionEn, image, isActive } = body

    // Check if category exists
    const existing = await prisma.category.findUnique({
      where: { id: params.id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    // Check if slug is taken by another category
    if (slug && slug !== existing.slug) {
      const slugTaken = await prisma.category.findUnique({
        where: {
          venueId_slug: {
            venueId: existing.venueId,
            slug
          }
        },
      })

      if (slugTaken) {
        return NextResponse.json(
          { error: 'Slug already taken by another category' },
          { status: 400 }
        )
      }
    }

    const category = await prisma.category.update({
      where: { id: params.id },
      data: {
        name: name || existing.name,
        nameEn: nameEn || existing.nameEn,
        slug: slug || existing.slug,
        description: description !== undefined ? description : existing.description,
        descriptionEn: descriptionEn !== undefined ? descriptionEn : existing.descriptionEn,
        image: image || existing.image,
        isActive: isActive !== undefined ? isActive : existing.isActive,
      },
      include: {
        subcategories: true,
        products: true,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    )
  }
}

// DELETE /api/categories/[id] - Delete category
export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        subcategories: true,
        products: true,
      },
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    // Check if category has subcategories or products
    if (category.subcategories.length > 0 || category.products.length > 0) {
      return NextResponse.json(
        {
          error: 'Cannot delete category with subcategories or products',
          hasSubcategories: category.subcategories.length > 0,
          hasProducts: category.products.length > 0,
        },
        { status: 400 }
      )
    }

    await prisma.category.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    )
  }
}
