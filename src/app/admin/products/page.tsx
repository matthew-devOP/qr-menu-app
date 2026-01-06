'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { CreateProductModal } from '@/components/admin/CreateProductModal'
import { EditProductModal } from '@/components/admin/EditProductModal'
import { DeleteProductDialog } from '@/components/admin/DeleteProductDialog'
import { toast } from 'sonner'

interface Product {
  id: string
  name: string
  nameEn: string | null
  description: string | null
  descriptionEn: string | null
  price: number
  oldPrice: number | null
  image: string | null
  categoryId: string
  subcategoryId: string | null
  isAvailable: boolean
  isFeatured: boolean
  allergens: string[]
  category?: { id: string; name: string }
  subcategory?: { id: string; name: string }
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/products')

      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()
      setProducts(data)
      setFilteredProducts(data)
    } catch (error) {
      toast.error('Failed to load products')
      console.error('Error fetching products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = [...products]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (categoryFilter) {
      filtered = filtered.filter((product) => product.categoryId === categoryFilter)
    }

    // Status filter
    if (statusFilter === 'available') {
      filtered = filtered.filter((product) => product.isAvailable)
    } else if (statusFilter === 'unavailable') {
      filtered = filtered.filter((product) => !product.isAvailable)
    }

    setFilteredProducts(filtered)
  }, [searchQuery, categoryFilter, statusFilter, products])

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setIsEditModalOpen(true)
  }

  const handleDelete = (product: Product) => {
    setSelectedProduct(product)
    setIsDeleteDialogOpen(true)
  }

  const handleSuccess = () => {
    fetchProducts()
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-brand-primary">
              Produse
            </h1>
            <p className="text-text-secondary mt-1">
              Gestionează produsele meniului
            </p>
          </div>
        </div>
        <Card className="p-12">
          <div className="text-center text-text-secondary">
            Loading products...
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-brand-primary">
            Produse
          </h1>
          <p className="text-text-secondary mt-1">
            Gestionează produsele meniului ({filteredProducts.length} produse)
          </p>
        </div>
        <Button
          className="gap-2"
          onClick={() => setIsCreateModalOpen(true)}
        >
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-border-medium rounded-lg text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Toate statusurile</option>
            <option value="available">Disponibil</option>
            <option value="unavailable">Indisponibil</option>
          </select>
        </div>
      </Card>

      {/* Products Table */}
      {filteredProducts.length > 0 ? (
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
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-border-light last:border-0 hover:bg-background-secondary/50 transition-colors"
                  >
                    {/* Product Info */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={product.image || '/images/placeholder-product.jpg'}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-brand-primary">
                            {product.name}
                          </div>
                          {product.subcategory && (
                            <div className="text-sm text-text-muted">
                              {product.subcategory.name}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <div className="text-sm text-text-primary">
                        {product.category?.name || 'N/A'}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-brand-primary">
                          {product.price} RON
                        </span>
                        {product.oldPrice && (
                          <span className="text-sm text-text-muted line-through">
                            {product.oldPrice} RON
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={product.isAvailable ? 'default' : 'secondary'}
                          className={
                            product.isAvailable
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }
                        >
                          {product.isAvailable ? 'Disponibil' : 'Indisponibil'}
                        </Badge>
                        {product.isFeatured && (
                          <Badge variant="outline" className="text-xs">
                            ⭐ Recomandat
                          </Badge>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(product)}
                        >
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
      ) : (
        /* Empty State */
        <Card className="p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-brand-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-brand-primary mb-2">
              {searchQuery || categoryFilter || statusFilter
                ? 'Niciun produs găsit'
                : 'Niciun produs'}
            </h3>
            <p className="text-text-secondary mb-6">
              {searchQuery || categoryFilter || statusFilter
                ? 'Încearcă să schimbi filtrele de căutare'
                : 'Începe prin a adăuga primul produs pentru meniul tău'}
            </p>
            {!searchQuery && !categoryFilter && !statusFilter && (
              <Button
                className="gap-2"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus className="w-4 h-4" />
                Adaugă Primul Produs
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Modals */}
      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <EditProductModal
        isOpen={isEditModalOpen}
        product={selectedProduct}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedProduct(null)
        }}
        onSuccess={handleSuccess}
      />

      <DeleteProductDialog
        isOpen={isDeleteDialogOpen}
        product={selectedProduct}
        onClose={() => {
          setIsDeleteDialogOpen(false)
          setSelectedProduct(null)
        }}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
