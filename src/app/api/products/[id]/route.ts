import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET /api/products/[id] - Get single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        subcategory: true,
      },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      nameEn,
      description,
      descriptionEn,
      price,
      oldPrice,
      image,
      allergens,
      nutrition,
      categoryId,
      subcategoryId,
      isAvailable,
      isFeatured,
    } = body

    // Check if product exists
    const existing = await prisma.product.findUnique({
      where: { id: params.id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Verify category exists if provided
    if (categoryId && categoryId !== existing.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      })

      if (!category) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 400 }
        )
      }
    }

    // Verify subcategory exists if provided
    if (subcategoryId && subcategoryId !== existing.subcategoryId) {
      const subcategory = await prisma.subcategory.findUnique({
        where: { id: subcategoryId },
      })

      if (!subcategory) {
        return NextResponse.json(
          { error: 'Subcategory not found' },
          { status: 400 }
        )
      }
    }

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: name || existing.name,
        nameEn: nameEn !== undefined ? nameEn : existing.nameEn,
        description: description !== undefined ? description : existing.description,
        descriptionEn: descriptionEn !== undefined ? descriptionEn : existing.descriptionEn,
        price: price !== undefined ? parseFloat(price) : existing.price,
        oldPrice: oldPrice !== undefined ? (oldPrice ? parseFloat(oldPrice) : null) : existing.oldPrice,
        image: image || existing.image,
        allergens: allergens !== undefined ? allergens : existing.allergens,
        nutrition: nutrition !== undefined ? nutrition : existing.nutrition,
        categoryId: categoryId || existing.categoryId,
        subcategoryId: subcategoryId !== undefined ? subcategoryId : existing.subcategoryId,
        isAvailable: isAvailable !== undefined ? isAvailable : existing.isAvailable,
        isFeatured: isFeatured !== undefined ? isFeatured : existing.isFeatured,
      },
      include: {
        category: true,
        subcategory: true,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    await prisma.product.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
