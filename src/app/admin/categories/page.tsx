import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import Image from 'next/image'

// Mock data - will be replaced with Prisma queries
const mockCategories = [
  {
    id: '1',
    name: 'BAR',
    nameRo: 'BAR',
    slug: 'bar',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop',
    order: 1,
    isActive: true,
    subcategoriesCount: 3,
    productsCount: 15,
  },
  {
    id: '2',
    name: 'MÂNCARE',
    nameRo: 'MÂNCARE',
    slug: 'mancare',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
    order: 2,
    isActive: true,
    subcategoriesCount: 4,
    productsCount: 28,
  },
  {
    id: '3',
    name: 'DESERT',
    nameRo: 'DESERT',
    slug: 'desert',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
    order: 3,
    isActive: true,
    subcategoriesCount: 2,
    productsCount: 12,
  },
]

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-brand-primary">
            Categorii
          </h1>
          <p className="text-text-secondary mt-1">
            Gestionează categoriile meniului
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Categorie Nouă
        </Button>
      </div>

      {/* Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCategories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            {/* Image */}
            <div className="relative aspect-video">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
              />
              {!category.isActive && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="px-3 py-1 bg-white/90 text-brand-primary text-sm font-semibold rounded-lg">
                    Inactiv
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-brand-primary text-lg">
                    {category.name}
                  </h3>
                  <p className="text-sm text-text-muted">/{category.slug}</p>
                </div>
                <span className="px-2 py-1 bg-brand-secondary/10 text-brand-secondary text-xs font-medium rounded">
                  #{category.order}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary">
                <span>{category.subcategoriesCount} subcategorii</span>
                <span>•</span>
                <span>{category.productsCount} produse</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-2">
                  <Eye className="w-4 h-4" />
                  Vezi
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-2">
                  <Edit className="w-4 h-4" />
                  Editează
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 text-state-error" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State (when no categories) */}
      {mockCategories.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-brand-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-brand-primary mb-2">
              Nicio categorie
            </h3>
            <p className="text-text-secondary mb-6">
              Începe prin a adăuga prima categorie pentru meniul tău
            </p>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Adaugă Prima Categorie
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
