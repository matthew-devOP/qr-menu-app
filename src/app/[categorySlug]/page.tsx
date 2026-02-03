import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { Breadcrumb, CategoryCard, ProductGrid } from '@/components/menu'
import type { MenuCategory, MenuProduct, BreadcrumbItem } from '@/types'

// Force dynamic rendering for database queries
export const dynamic = 'force-dynamic'

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string
  }>
}

async function getCategoryWithData(slug: string) {
  const category = await prisma.category.findFirst({
    where: {
      slug,
      isActive: true
    },
    include: {
      subcategories: {
        where: { isActive: true },
        orderBy: { order: 'asc' },
        include: {
          _count: { select: { products: true } }
        }
      },
      products: {
        where: { isAvailable: true },
        orderBy: [
          { isFeatured: 'desc' },
          { order: 'asc' }
        ],
        take: 12 // Limit products shown on category page
      }
    }
  })

  if (!category) return null

  // Transform subcategories to MenuCategory format
  const subcategories: MenuCategory[] = category.subcategories.map((sub: typeof category.subcategories[number]) => ({
    id: sub.id,
    name: sub.name,
    slug: sub.slug,
    image: sub.image || undefined,
    subcategoriesCount: 0,
    productsCount: sub._count.products
  }))

  // Transform products to MenuProduct format
  const products: MenuProduct[] = category.products.map((prod: typeof category.products[number]) => ({
    id: prod.id,
    name: prod.name,
    slug: prod.slug,
    description: prod.description || undefined,
    image: prod.image || undefined,
    price: Number(prod.price),
    oldPrice: prod.oldPrice ? Number(prod.oldPrice) : undefined,
    isAvailable: prod.isAvailable,
    isFeatured: prod.isFeatured,
    allergens: prod.allergens
  }))

  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description || undefined,
    subcategories,
    products
  }
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { categorySlug } = await params
  const category = await getCategoryWithData(categorySlug)

  if (!category) {
    return {
      title: 'Categorie negăsită',
    }
  }

  return {
    title: `${category.name} - INFINITY LOUNGE`,
    description: category.description || `Explorează ${category.name}`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params
  const category = await getCategoryWithData(categorySlug)

  if (!category) {
    notFound()
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Acasă', href: '/' },
    { label: category.name, href: `/${categorySlug}` },
  ]

  const hasSubcategories = category.subcategories.length > 0
  const hasProducts = category.products.length > 0

  return (
    <div className="min-h-screen bg-background-primary pb-16">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Category Header */}
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-primary mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
        </div>
      </div>

      {/* Subcategories Section */}
      {hasSubcategories && (
        <section className="container mx-auto px-4 mb-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-primary mb-2">
              Subcategorii
            </h2>
            <p className="text-text-secondary">
              Selectează o subcategorie pentru a vedea produsele
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {category.subcategories.map((subcategory) => (
              <CategoryCard
                key={subcategory.id}
                category={{
                  ...subcategory,
                  // Override href to include parent category
                  slug: `${categorySlug}/${subcategory.slug}`,
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* Products Section */}
      {hasProducts && (
        <section className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-primary mb-2">
              {hasSubcategories ? 'Produse Populare' : 'Produse'}
            </h2>
            <p className="text-text-secondary">
              {hasSubcategories
                ? 'Cele mai populare produse din această categorie'
                : 'Toate produsele din această categorie'}
            </p>
          </div>

          <ProductGrid products={category.products} showUnavailable={!hasSubcategories} />
        </section>
      )}

      {/* Empty State */}
      {!hasSubcategories && !hasProducts && (
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-6">🍽️</div>
            <h3 className="text-2xl font-display font-bold text-brand-primary mb-4">
              În curând
            </h3>
            <p className="text-text-secondary">
              Produsele din această categorie vor fi adăugate în curând.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

