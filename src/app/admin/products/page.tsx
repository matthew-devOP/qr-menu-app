import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

// Mock data - will be replaced with Prisma queries
const mockProducts = [
  {
    id: 'p1',
    name: 'Mojito',
    category: 'BAR',
    subcategory: 'Cocktail-uri',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop',
    price: 28,
    oldPrice: null,
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: 'p2',
    name: 'Cappuccino',
    category: 'BAR',
    subcategory: 'Băuturi Calde',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop',
    price: 15,
    oldPrice: null,
    isAvailable: true,
    isFeatured: false,
  },
  {
    id: 'p3',
    name: 'Piña Colada',
    category: 'BAR',
    subcategory: 'Cocktail-uri',
    image: 'https://images.unsplash.com/photo-1568330272043-085ad639954e?w=200&h=200&fit=crop',
    price: 32,
    oldPrice: 35,
    isAvailable: false,
    isFeatured: false,
  },
]

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-brand-primary">
            Produse
          </h1>
          <p className="text-text-secondary mt-1">
            Gestionează produsele meniului
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Produs Nou
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input
              placeholder="Caută produse..."
              className="pl-10"
            />
          </div>
          <select className="px-4 py-2 border border-border-medium rounded-lg text-sm">
            <option>Toate categoriile</option>
            <option>BAR</option>
            <option>MÂNCARE</option>
            <option>DESERT</option>
          </select>
          <select className="px-4 py-2 border border-border-medium rounded-lg text-sm">
            <option>Toate statusurile</option>
            <option>Disponibil</option>
            <option>Indisponibil</option>
          </select>
        </div>
      </Card>

      {/* Products Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border-light">
              <tr className="text-left text-sm text-text-secondary">
                <th className="p-4 font-medium">Produs</th>
                <th className="p-4 font-medium">Categorie</th>
                <th className="p-4 font-medium">Preț</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((product) => (
                <tr key={product.id} className="border-b border-border-light last:border-0">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-brand-primary">{product.name}</p>
                        {product.isFeatured && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            ⭐ Popular
                          </Badge>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <p className="font-medium text-brand-primary">{product.category}</p>
                      <p className="text-text-muted">{product.subcategory}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <p className="font-medium text-brand-primary">{product.price} RON</p>
                      {product.oldPrice && (
                        <p className="text-text-muted line-through">{product.oldPrice} RON</p>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant={product.isAvailable ? 'default' : 'outline'}>
                      {product.isAvailable ? 'Disponibil' : 'Indisponibil'}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4 text-state-error" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination - Placeholder */}
      <div className="flex items-center justify-between text-sm text-text-secondary">
        <p>Afișare 1-3 din 3 produse</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outline" size="sm" disabled>
            Următor
          </Button>
        </div>
      </div>
    </div>
  )
}
