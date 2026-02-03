import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET /api/dashboard/stats - Get dashboard statistics
export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Get counts in parallel
        const [
            categoriesCount,
            subcategoriesCount,
            productsCount,
            featuredCount,
            activeProducts,
            qrCodesCount,
            totalScans,
            recentScans
        ] = await Promise.all([
            prisma.category.count(),
            prisma.subcategory.count(),
            prisma.product.count(),
            prisma.product.count({ where: { isFeatured: true } }),
            prisma.product.count({ where: { isAvailable: true } }),
            prisma.qRCode.count(),
            prisma.qRCode.aggregate({ _sum: { scans: true } }),
            prisma.qRCode.aggregate({
                _sum: { scans: true },
                where: {
                    lastScanned: {
                        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
                    }
                }
            }),
        ])

        // Get top categories by products
        const topCategories = await prisma.category.findMany({
            take: 5,
            include: {
                _count: { select: { products: true } }
            },
            orderBy: {
                products: { _count: 'desc' }
            }
        })

        // Get recent activity (last 5 updated products)
        const recentProducts = await prisma.product.findMany({
            take: 5,
            orderBy: { updatedAt: 'desc' },
            select: {
                id: true,
                name: true,
                updatedAt: true,
                category: { select: { name: true } }
            }
        })

        return NextResponse.json({
            stats: {
                categories: categoriesCount,
                subcategories: subcategoriesCount,
                products: productsCount,
                featured: featuredCount,
                activeProducts,
                qrCodes: qrCodesCount,
                totalScans: totalScans._sum.scans || 0,
                weeklyScans: recentScans._sum.scans || 0,
            },
            topCategories: topCategories.map((cat: typeof topCategories[number]) => ({
                id: cat.id,
                name: cat.name,
                productCount: cat._count.products
            })),
            recentProducts: recentProducts.map((prod: typeof recentProducts[number]) => ({
                id: prod.id,
                name: prod.name,
                category: prod.category.name,
                updatedAt: prod.updatedAt
            }))
        })
    } catch (error) {
        console.error('Error fetching dashboard stats:', error)
        return NextResponse.json(
            { error: 'Failed to fetch dashboard stats' },
            { status: 500 }
        )
    }
}
