'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Edit, Trash2, Eye, Filter } from 'lucide-react'
import Image from 'next/image'
import { CreateSubcategoryModal } from '@/components/admin/CreateSubcategoryModal'
import { EditSubcategoryModal } from '@/components/admin/EditSubcategoryModal'
import { DeleteSubcategoryDialog } from '@/components/admin/DeleteSubcategoryDialog'
import { toast } from 'sonner'

interface Category {
    id: string
    name: string
    slug: string
}

interface Subcategory {
    id: string
    name: string
    nameEn: string | null
    slug: string
    description: string | null
    image: string | null
    isActive: boolean
    order: number
    categoryId: string
    category: Category
    _count?: { products: number }
}

export default function AdminSubcategoriesPage() {
    const [subcategories, setSubcategories] = useState<Subcategory[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null)

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories')
            if (response.ok) {
                const data = await response.json()
                setCategories(data)
            }
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
    }

    const fetchSubcategories = async () => {
        try {
            setIsLoading(true)
            const url = selectedCategoryId
                ? `/api/subcategories?categoryId=${selectedCategoryId}`
                : '/api/subcategories'
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error('Failed to fetch subcategories')
            }

            const data = await response.json()
            setSubcategories(data)
        } catch (error) {
            toast.error('Eroare la încărcarea subcategoriilor')
            console.error('Error fetching subcategories:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        fetchSubcategories()
    }, [selectedCategoryId])

    const handleEdit = (subcategory: Subcategory) => {
        setSelectedSubcategory(subcategory)
        setIsEditModalOpen(true)
    }

    const handleDelete = (subcategory: Subcategory) => {
        setSelectedSubcategory(subcategory)
        setIsDeleteDialogOpen(true)
    }

    const handleSuccess = () => {
        fetchSubcategories()
    }

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-brand-primary">
                            Subcategorii
                        </h1>
                        <p className="text-text-secondary mt-1">
                            Gestionează subcategoriile meniului
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
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-brand-primary">
                        Subcategorii
                    </h1>
                    <p className="text-text-secondary mt-1">
                        Gestionează subcategoriile meniului
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    {/* Category Filter */}
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-text-muted" />
                        <select
                            value={selectedCategoryId}
                            onChange={(e) => setSelectedCategoryId(e.target.value)}
                            className="px-3 py-2 border border-border-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                        >
                            <option value="">Toate categoriile</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Button
                        className="gap-2"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <Plus className="w-4 h-4" />
                        Subcategorie Nouă
                    </Button>
                </div>
            </div>

            {/* Subcategories List */}
            {subcategories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subcategories.map((subcategory) => (
                        <Card key={subcategory.id} className="overflow-hidden">
                            {/* Image */}
                            <div className="relative aspect-video">
                                <Image
                                    src={subcategory.image || '/images/placeholder-category.jpg'}
                                    alt={subcategory.name}
                                    fill
                                    className="object-cover"
                                />
                                {!subcategory.isActive && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <span className="px-3 py-1 bg-white/90 text-brand-primary text-sm font-semibold rounded-lg">
                                            Inactiv
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold text-brand-primary text-lg">
                                            {subcategory.name}
                                        </h3>
                                        <p className="text-sm text-text-muted">/{subcategory.category.slug}/{subcategory.slug}</p>
                                    </div>
                                    <span className="px-2 py-1 bg-brand-secondary/10 text-brand-secondary text-xs font-medium rounded">
                                        #{subcategory.order}
                                    </span>
                                </div>

                                {/* Category Badge */}
                                <div className="mb-3">
                                    <span className="inline-flex items-center px-2 py-1 bg-background-secondary text-text-secondary text-xs font-medium rounded">
                                        {subcategory.category.name}
                                    </span>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary">
                                    <span>{subcategory._count?.products || 0} produse</span>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 gap-2"
                                        onClick={() => window.open(`/${subcategory.category.slug}/${subcategory.slug}`, '_blank')}
                                    >
                                        <Eye className="w-4 h-4" />
                                        Vezi
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 gap-2"
                                        onClick={() => handleEdit(subcategory)}
                                    >
                                        <Edit className="w-4 h-4" />
                                        Editează
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(subcategory)}
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
                            {selectedCategoryId ? 'Nicio subcategorie în această categorie' : 'Nicio subcategorie'}
                        </h3>
                        <p className="text-text-secondary mb-6">
                            {selectedCategoryId
                                ? 'Adaugă o subcategorie pentru această categorie'
                                : 'Începe prin a adăuga prima subcategorie pentru meniul tău'}
                        </p>
                        <Button
                            className="gap-2"
                            onClick={() => setIsCreateModalOpen(true)}
                        >
                            <Plus className="w-4 h-4" />
                            Adaugă Subcategorie
                        </Button>
                    </div>
                </Card>
            )}

            {/* Modals */}
            <CreateSubcategoryModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={handleSuccess}
                categories={categories}
                defaultCategoryId={selectedCategoryId}
            />

            <EditSubcategoryModal
                isOpen={isEditModalOpen}
                subcategory={selectedSubcategory}
                onClose={() => {
                    setIsEditModalOpen(false)
                    setSelectedSubcategory(null)
                }}
                onSuccess={handleSuccess}
                categories={categories}
            />

            <DeleteSubcategoryDialog
                isOpen={isDeleteDialogOpen}
                subcategory={selectedSubcategory}
                onClose={() => {
                    setIsDeleteDialogOpen(false)
                    setSelectedSubcategory(null)
                }}
                onSuccess={handleSuccess}
            />
        </div>
    )
}
