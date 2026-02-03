import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { Breadcrumb, ProductGrid } from '@/components/menu'
import type { MenuProduct, BreadcrumbItem } from '@/types'

// Force dynamic rendering for database queries
export const dynamic = 'force-dynamic'

interface SubcategoryPageProps {
  params: Promise<{
    categorySlug: string
    subcategorySlug: string
  }>
}

async function getSubcategoryWithProducts(categorySlug: string, subcategorySlug: string) {
  const subcategory = await prisma.subcategory.findFirst({
    where: {
      slug: subcategorySlug,
      isActive: true,
      category: {
        slug: categorySlug,
        isActive: true
      }
    },
    include: {
      category: {
        select: { id: true, name: true, slug: true }
      },
      products: {
        orderBy: [
          { isFeatured: 'desc' },
          { order: 'asc' }
        ]
      }
    }
  })

  if (!subcategory) return null

  // Transform products to MenuProduct format
  const products: MenuProduct[] = subcategory.products.map((prod: typeof subcategory.products[number]) => ({
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
    categoryName: subcategory.category.name,
    subcategoryName: subcategory.name,
    description: subcategory.description || undefined,
    products
  }
}

export async function generateMetadata({ params }: SubcategoryPageProps) {
  const { categorySlug, subcategorySlug } = await params
  const data = await getSubcategoryWithProducts(categorySlug, subcategorySlug)

  if (!data) {
    return {
      title: 'Subcategorie negăsită',
    }
  }

  return {
    title: `${data.subcategoryName} - ${data.categoryName} - INFINITY LOUNGE`,
    description: data.description || `Explorează ${data.subcategoryName}`,
  }
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { categorySlug, subcategorySlug } = await params
  const data = await getSubcategoryWithProducts(categorySlug, subcategorySlug)

  if (!data) {
    notFound()
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Acasă', href: '/' },
    { label: data.categoryName, href: `/${categorySlug}` },
    { label: data.subcategoryName, href: `/${categorySlug}/${subcategorySlug}` },
  ]

  const availableProducts = data.products.filter((p) => p.isAvailable)

  return (
    <div className="min-h-screen bg-background-primary pb-16">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Subcategory Header */}
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <div className="text-sm font-medium text-brand-secondary mb-2">
            {data.categoryName}
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-primary mb-4">
            {data.subcategoryName}
          </h1>
          {data.description && (
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              {data.description}
            </p>
          )}
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-text-muted">
            <span>{data.products.length} produse</span>
            <span className="w-1 h-1 rounded-full bg-text-muted"></span>
            <span>{availableProducts.length} disponibile</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {data.products.length > 0 ? (
        <section className="container mx-auto px-4">
          <ProductGrid products={data.products} />
        </section>
      ) : (
        // Empty State
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-6">🍽️</div>
            <h3 className="text-2xl font-display font-bold text-brand-primary mb-4">
              În curând
            </h3>
            <p className="text-text-secondary">
              Produsele din această subcategorie vor fi adăugate în curând.
            </p>
          </div>
        </div>
      )}

      {/* Info Banner */}
      <div className="container mx-auto px-4 mt-16">
        <div className="max-w-3xl mx-auto p-6 rounded-xl bg-brand-secondary/10 border border-brand-secondary/20">
          <div className="flex items-start gap-4">
            <div className="text-2xl">ℹ️</div>
            <div className="flex-1">
              <h3 className="font-semibold text-brand-primary mb-2">
                Informații despre alergeni
              </h3>
              <p className="text-sm text-text-secondary">
                Produsele noastre pot conține alergeni. Verificați iconițele de pe
                fiecare produs pentru detalii. Pentru mai multe informații, vă rugăm
                să consultați personalul.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

