import { CategoryCard } from '@/components/menu'
import type { MenuCategory } from '@/types'

// Mock data - will be replaced with database queries
const mockCategories: MenuCategory[] = [
  {
    id: '1',
    name: 'BAR',
    slug: 'bar',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop',
    subcategoriesCount: 3,
    productsCount: 15,
  },
  {
    id: '2',
    name: 'MANCARE',
    slug: 'mancare',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
    subcategoriesCount: 4,
    productsCount: 28,
  },
  {
    id: '3',
    name: 'DESERT',
    slug: 'desert',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop',
    subcategoriesCount: 2,
    productsCount: 12,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-primary">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-primary via-brand-dark to-brand-primary py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 animate-fade-in">
            Bine ai venit la
            <br />
            <span className="text-brand-secondary">INFINITY LOUNGE</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 animate-slide-up">
            Descoperă meniul nostru digital interactiv
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-white font-medium">📱 Scanează codul QR</span>
            </div>
            <div className="px-6 py-3 bg-brand-secondary/20 backdrop-blur-md rounded-full border border-brand-secondary/30">
              <span className="text-white font-medium">🌍 RO / EN</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-primary mb-4">
            Explorează Meniul
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Alege o categorie pentru a descoperi produsele noastre
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {mockCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-background-secondary to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-primary mb-4">
              De ce Meniu Digital?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-brand-secondary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-4xl">🍽️</span>
              </div>
              <h3 className="font-display font-semibold text-xl text-brand-primary mb-3 text-center">
                Navigare Intuitivă
              </h3>
              <p className="text-text-secondary text-center">
                Explorează categorii, subcategorii și produse într-o interfață modernă și ușor de folosit
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-brand-secondary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-4xl">⚡</span>
              </div>
              <h3 className="font-display font-semibold text-xl text-brand-primary mb-3 text-center">
                Actualizări în Timp Real
              </h3>
              <p className="text-text-secondary text-center">
                Prețuri, disponibilitate și produse noi actualizate instantaneu
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-brand-secondary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="font-display font-semibold text-xl text-brand-primary mb-3 text-center">
                Informații Detaliate
              </h3>
              <p className="text-text-secondary text-center">
                Descrieri complete, alergeni, valori nutriționale și imagini de calitate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sprint Progress Indicator */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto p-6 rounded-xl bg-brand-secondary/10 border border-brand-secondary/20">
          <p className="text-sm font-medium text-brand-primary text-center">
            🚀 Sprint 2 - Core Menu Features
          </p>
          <p className="text-xs text-text-secondary mt-2 text-center">
            Status: Menu components created ✅ • Homepage updated ✅
          </p>
        </div>
      </section>
    </div>
  )
}
