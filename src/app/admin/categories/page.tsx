'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import Image from 'next/image'
import { CreateCategoryModal } from '@/components/admin/CreateCategoryModal'
import { EditCategoryModal } from '@/components/admin/EditCategoryModal'
import { DeleteCategoryDialog } from '@/components/admin/DeleteCategoryDialog'
import { toast } from 'sonner'

interface Category {
  id: string
  name: string
  nameEn: string | null
  slug: string
  description: string | null
  descriptionEn: string | null
  image: string | null
  isActive: boolean
  order: number
  subcategories: any[]
  products: any[]
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/categories')

      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }

      const data = await response.json()
      setCategories(data)
    } catch (error) {
      toast.error('Failed to load categories')
      console.error('Error fetching categories:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleEdit = (category: Category) => {
    setSelectedCategory(category)
    setIsEditModalOpen(true)
  }

  const handleDelete = (category: Category) => {
    setSelectedCategory(category)
    setIsDeleteDialogOpen(true)
  }

  const handleSuccess = () => {
    fetchCategories()
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-brand-primary">
              Categorii
            </h1>
            <p className="text-text-secondary mt-1">
              Gestionează categoriile meniului
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden animate-pulse">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

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
        <Button
          className="gap-2"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Categorie Nouă
        </Button>
      </div>

      {/* Categories List */}
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="overflow-hidden">
              {/* Image */}
              <div className="relative aspect-video">
                <Image
                  src={category.image || '/images/placeholder-category.jpg'}
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
                  <span>{category.subcategories?.length || 0} subcategorii</span>
                  <span>•</span>
                  <span>{category.products?.length || 0} produse</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => window.open(`/${category.slug}`, '_blank')}
                  >
                    <Eye className="w-4 h-4" />
                    Vezi
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => handleEdit(category)}
                  >
                    <Edit className="w-4 h-4" />
                    Editează
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(category)}
                  >
                    <Trash2 className="w-4 h-4 text-state-error" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
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
            <Button
              className="gap-2"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Adaugă Prima Categorie
            </Button>
          </div>
        </Card>
      )}

      {/* Modals */}
      <CreateCategoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <EditCategoryModal
        isOpen={isEditModalOpen}
        category={selectedCategory}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedCategory(null)
        }}
        onSuccess={handleSuccess}
      />

      <DeleteCategoryDialog
        isOpen={isDeleteDialogOpen}
        category={selectedCategory}
        onClose={() => {
          setIsDeleteDialogOpen(false)
          setSelectedCategory(null)
        }}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
