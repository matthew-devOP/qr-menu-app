'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { slugify } from '@/lib/utils'
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/lib/constants'

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
    categoryId: string
}

interface EditSubcategoryModalProps {
    isOpen: boolean
    subcategory: Subcategory | null
    onClose: () => void
    onSuccess: () => void
    categories: Category[]
}

export function EditSubcategoryModal({
    isOpen,
    subcategory,
    onClose,
    onSuccess,
    categories,
}: EditSubcategoryModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        nameEn: '',
        slug: '',
        description: '',
        categoryId: '',
        image: '',
        isActive: true,
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (subcategory) {
            setFormData({
                name: subcategory.name || '',
                nameEn: subcategory.nameEn || '',
                slug: subcategory.slug || '',
                description: subcategory.description || '',
                categoryId: subcategory.categoryId || '',
                image: subcategory.image || '',
                isActive: subcategory.isActive ?? true,
            })
        }
    }, [subcategory])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!subcategory) return

        setIsSubmitting(true)

        try {
            const response = await fetch(`/api/subcategories/${subcategory.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update subcategory')
            }

            toast.success(SUCCESS_MESSAGES.UPDATED)
            onSuccess()
            onClose()
        } catch (error) {
            toast.error(error instanceof Error ? error.message : ERROR_MESSAGES.GENERIC)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleNameChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            name: value,
            slug: slugify(value),
        }))
    }

    if (!isOpen || !subcategory) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
                {/* Header */}
                <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 bg-white">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Editează Subcategoria
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Category Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Categorie <span className="text-red-500">*</span>
                        </label>
                        <select
                            required
                            value={formData.categoryId}
                            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
                        >
                            <option value="">Selectează categoria</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Name (Romanian) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nume (Română) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
                            placeholder="ex: Sucuri naturale"
                        />
                    </div>

                    {/* Name (English) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nume (Engleză)
                        </label>
                        <input
                            type="text"
                            value={formData.nameEn}
                            onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
                            placeholder="ex: Natural juices"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Slug <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-transparent font-mono text-sm"
                            placeholder="ex: sucuri-naturale"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Descriere
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
                            placeholder="Descriere opțională..."
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            URL Imagine
                        </label>
                        <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {/* Active Status */}
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="isActiveEdit"
                            checked={formData.isActive}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            className="w-4 h-4 text-brand-secondary border-gray-300 rounded focus:ring-brand-secondary"
                        />
                        <label htmlFor="isActiveEdit" className="text-sm font-medium text-gray-700">
                            Activ (vizibil în meniu)
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                        >
                            Anulează
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 text-sm font-medium text-white bg-brand-secondary hover:bg-brand-secondary/90 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Se salvează...' : 'Salvează'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
