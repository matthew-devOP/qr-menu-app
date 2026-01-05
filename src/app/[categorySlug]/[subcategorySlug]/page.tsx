import { notFound } from 'next/navigation'
import { Breadcrumb, ProductCard } from '@/components/menu'
import type { MenuProduct, BreadcrumbItem } from '@/types'

// Mock data - will be replaced with database queries
const mockData: Record<string, Record<string, {
  categoryName: string
  subcategoryName: string
  description?: string
  products: MenuProduct[]
}>> = {
  bar: {
    'bauturi-racoritoare': {
      categoryName: 'BAR',
      subcategoryName: 'Băuturi Răcoritoare',
      description: 'Răcoritoare și sucuri naturale',
      products: [
        {
          id: 'p1',
          name: 'Pepsi',
          slug: 'pepsi',
          description: 'Băutură răcoritoare carbogazoasă 330ml',
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
          description: 'Băutură răcoritoare carbogazoasă 330ml',
          image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800&h=800&fit=crop',
          price: 8,
          oldPrice: 10,
          isAvailable: true,
          isFeatured: true,
          allergens: [],
        },
        {
          id: 'p3',
          name: 'Fanta',
          slug: 'fanta',
          description: 'Băutură răcoritoare cu portocale 330ml',
          image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=800&h=800&fit=crop',
          price: 8,
          isAvailable: true,
          isFeatured: false,
          allergens: [],
        },
        {
          id: 'p7',
          name: 'Sprite',
          slug: 'sprite',
          description: 'Băutură răcoritoare cu lămâie și lime 330ml',
          image: 'https://images.unsplash.com/photo-1625740213416-e8ad332cd65b?w=800&h=800&fit=crop',
          price: 8,
          isAvailable: true,
          isFeatured: false,
          allergens: [],
        },
        {
          id: 'p8',
          name: 'Limonadă Naturală',
          slug: 'limonada-naturala',
          description: 'Limonadă fresh cu lămâie și mentă',
          image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9f?w=800&h=800&fit=crop',
          price: 15,
          isAvailable: true,
          isFeatured: false,
          allergens: [],
        },
      ],
    },
    'bauturi-calde': {
      categoryName: 'BAR',
      subcategoryName: 'Băuturi Calde',
      description: 'Cafea și ceaiuri premium',
      products: [
        {
          id: 'p3',
          name: 'Espresso',
          slug: 'espresso',
          description: 'Cafea espresso intensă din boabe 100% Arabica',
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
          description: 'Cafea cu lapte spumat și cacao',
          image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&h=800&fit=crop',
          price: 15,
          isAvailable: true,
          isFeatured: true,
          allergens: ['lactose'],
        },
        {
          id: 'p9',
          name: 'Latte',
          slug: 'latte',
          description: 'Cafea cu mult lapte spumat',
          image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=800&fit=crop',
          price: 16,
          isAvailable: true,
          isFeatured: false,
          allergens: ['lactose'],
        },
        {
          id: 'p10',
          name: 'Ceai Verde',
          slug: 'ceai-verde',
          description: 'Ceai verde premium cu iasomie',
          image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&h=800&fit=crop',
          price: 10,
          isAvailable: true,
          isFeatured: false,
          allergens: [],
        },
      ],
    },
    'cocktail-uri': {
      categoryName: 'BAR',
      subcategoryName: 'Cocktail-uri',
      description: 'Cocktail-uri clasice și signature',
      products: [
        {
          id: 'p5',
          name: 'Mojito',
          slug: 'mojito',
          description: 'Cocktail cu rom alb, mentă proaspătă, lime și sifon',
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
          description: 'Cocktail tropical cu rom, ananas și cremă de cocos',
          image: 'https://images.unsplash.com/photo-1568330272043-085ad639954e?w=800&h=800&fit=crop',
          price: 32,
          isAvailable: false,
          isFeatured: false,
          allergens: ['lactose'],
        },
        {
          id: 'p11',
          name: 'Margarita',
          slug: 'margarita',
          description: 'Cocktail cu tequila, triple sec și suc de lime',
          image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?w=800&h=800&fit=crop',
          price: 30,
          isAvailable: true,
          isFeatured: true,
          allergens: [],
        },
        {
          id: 'p12',
          name: 'Cosmopolitan',
          slug: 'cosmopolitan',
          description: 'Vodka, triple sec, suc de merișor și lime',
          image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&h=800&fit=crop',
          price: 29,
          isAvailable: true,
          isFeatured: false,
          allergens: [],
        },
        {
          id: 'p13',
          name: 'Aperol Spritz',
          slug: 'aperol-spritz',
          description: 'Aperol, prosecco și apă minerală',
          image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&h=800&fit=crop',
          price: 26,
          isAvailable: true,
          isFeatured: false,
          allergens: ['sulfites'],
        },
        {
          id: 'p14',
          name: 'Long Island Iced Tea',
          slug: 'long-island-iced-tea',
          description: 'Mix de 5 spirtoase, suc de lămâie și cola',
          image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=800&fit=crop',
          price: 35,
          isAvailable: true,
          isFeatured: true,
          allergens: [],
        },
      ],
    },
  },
}

interface SubcategoryPageProps {
  params: Promise<{
    categorySlug: string
    subcategorySlug: string
  }>
}

export async function generateMetadata({ params }: SubcategoryPageProps) {
  const { categorySlug, subcategorySlug } = await params
  const data = mockData[categorySlug]?.[subcategorySlug]

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
  const data = mockData[categorySlug]?.[subcategorySlug]

  if (!data) {
    notFound()
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Acasă', href: '/' },
    { label: data.categoryName, href: `/${categorySlug}` },
    { label: data.subcategoryName, href: `/${categorySlug}/${subcategorySlug}` },
  ]

  const availableProducts = data.products.filter((p) => p.isAvailable)
  const unavailableProducts = data.products.filter((p) => !p.isAvailable)

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
          {/* Available Products */}
          {availableProducts.length > 0 && (
            <div className="mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {availableProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* Unavailable Products */}
          {unavailableProducts.length > 0 && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-display font-semibold text-text-muted">
                  Temporar Indisponibile
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {unavailableProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
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
