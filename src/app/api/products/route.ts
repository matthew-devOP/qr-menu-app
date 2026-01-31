import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { productSchema } from '@/lib/validations/product'
import { z } from 'zod'
import { slugify } from '@/lib/utils'

// GET /api/products - Get all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    const subcategoryId = searchParams.get('subcategoryId')
    const isAvailable = searchParams.get('isAvailable')

    const where: any = {}

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (subcategoryId) {
      where.subcategoryId = subcategoryId
    }

    if (isAvailable !== null && isAvailable !== undefined) {
      where.isAvailable = isAvailable === 'true'
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        subcategory: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/products - Create new product
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Zod Validation
    let validatedData;
    try {
      validatedData = productSchema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Validation failed', details: error.issues },
          { status: 400 }
        )
      }
      throw error;
    }

    // Category and Subcategory verification remains
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
    } = validatedData

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 400 }
      )
    }

    // Verify subcategory exists if provided
    if (subcategoryId) {
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

    const product = await prisma.product.create({
      data: {
        name,
        nameRo: name, // Default
        nameEn: nameEn || name,
        slug: slugify(name), // Generate slug
        description,
        descriptionRo: description, // Default
        descriptionEn: descriptionEn || description,
        price,
        oldPrice: oldPrice || null,
        image: image || '/images/placeholder-product.jpg',
        allergens: allergens || [],
        nutritionInfo: nutrition || {},
        categoryId,
        subcategoryId: subcategoryId || null,
        isAvailable: isAvailable !== undefined ? isAvailable : true,
        isFeatured: isFeatured !== undefined ? isFeatured : false,
      },
      include: {
        category: true,
        subcategory: true,
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
