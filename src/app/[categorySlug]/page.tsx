import { notFound } from 'next/navigation'
import { Breadcrumb, CategoryCard, ProductCard } from '@/components/menu'
import type { MenuCategory, MenuProduct, BreadcrumbItem } from '@/types'

// Mock data - will be replaced with database queries
const mockCategories: Record<string, {
  id: string
  name: string
  slug: string
  description?: string
  subcategories: MenuCategory[]
  products: MenuProduct[]
}> = {
  bar: {
    id: '1',
    name: 'BAR',
    slug: 'bar',
    description: 'Răcoritoare, băuturi calde și cocktail-uri',
    subcategories: [
      {
        id: 'sub-1',
        name: 'Băuturi Răcoritoare',
        slug: 'bauturi-racoritoare',
        image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=800&h=600&fit=crop',
        subcategoriesCount: 0,
        productsCount: 5,
      },
      {
        id: 'sub-2',
        name: 'Băuturi Calde',
        slug: 'bauturi-calde',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
        subcategoriesCount: 0,
        productsCount: 4,
      },
      {
        id: 'sub-3',
        name: 'Cocktail-uri',
        slug: 'cocktail-uri',
        image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&h=600&fit=crop',
        subcategoriesCount: 0,
        productsCount: 6,
      },
    ],
    products: [
      {
        id: 'p1',
        name: 'Pepsi',
        slug: 'pepsi',
        description: 'Băutură răcoritoare carbogazoasă',
        image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800&h=800&fit=crop',
        price: 8,
        isAvailable: true,
        isFeatured: false,
        allergens: [],
      },
      {
        id: 'p2',
        name: 'Coca-Cola',
        slug: 'coca-cola',
        description: 'Băutură răcoritoare carbogazoasă',
        image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800&h=800&fit=crop',
        price: 8,
        oldPrice: 10,
        isAvailable: true,
        isFeatured: true,
        allergens: [],
      },
      {
        id: 'p3',
        name: 'Espresso',
        slug: 'espresso',
        description: 'Cafea espresso intensă',
        image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&h=800&fit=crop',
        price: 12,
        isAvailable: true,
        isFeatured: false,
        allergens: [],
      },
      {
        id: 'p4',
        name: 'Cappuccino',
        slug: 'cappuccino',
        description: 'Cafea cu lapte spumat',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&h=800&fit=crop',
        price: 15,
        isAvailable: true,
        isFeatured: false,
        allergens: ['lactose'],
      },
      {
        id: 'p5',
        name: 'Mojito',
        slug: 'mojito',
        description: 'Cocktail cu rom, mentă și lime',
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=800&fit=crop',
        price: 28,
        isAvailable: true,
        isFeatured: true,
        allergens: [],
      },
      {
        id: 'p6',
        name: 'Piña Colada',
        slug: 'pina-colada',
        description: 'Cocktail tropical cu ananas și cocos',
        image: 'https://images.unsplash.com/photo-1568330272043-085ad639954e?w=800&h=800&fit=crop',
        price: 32,
        isAvailable: false,
        isFeatured: false,
        allergens: ['lactose'],
      },
    ],
  },
  mancare: {
    id: '2',
    name: 'MÂNCARE',
    slug: 'mancare',
    description: 'Preparate culinare delicioase',
    subcategories: [
      {
        id: 'sub-4',
        name: 'Aperitive',
        slug: 'aperitive',
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&h=600&fit=crop',
        subcategoriesCount: 0,
        productsCount: 6,
      },
      {
        id: 'sub-5',
        name: 'Fel Principal',
        slug: 'fel-principal',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
        subcategoriesCount: 0,
        productsCount: 12,
      },
    ],
    products: [],
  },
  desert: {
    id: '3',
    name: 'DESERT',
    slug: 'desert',
    description: 'Deserturi și dulciuri',
    subcategories: [
      {
        id: 'sub-6',
        name: 'Prăjituri',
        slug: 'prajituri',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop',
        subcategoriesCount: 0,
        productsCount: 8,
      },
      {
        id: 'sub-7',
        name: 'Înghețată',
        slug: 'inghetata',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop',
        subcategoriesCount: 0,
        productsCount: 6,
      },
    ],
    products: [],
  },
}

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { categorySlug } = await params
  const category = mockCategories[categorySlug]

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
  const category = mockCategories[categorySlug]

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {category.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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
