'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/lib/constants'

interface Subcategory {
    id: string
    name: string
    _count?: { products: number }
}

interface DeleteSubcategoryDialogProps {
    isOpen: boolean
    subcategory: Subcategory | null
    onClose: () => void
    onSuccess: () => void
}

export function DeleteSubcategoryDialog({
    isOpen,
    subcategory,
    onClose,
    onSuccess,
}: DeleteSubcategoryDialogProps) {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!subcategory) return

        setIsDeleting(true)

        try {
            const response = await fetch(`/api/subcategories/${subcategory.id}`, {
                method: 'DELETE',
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to delete subcategory')
            }

            toast.success(SUCCESS_MESSAGES.DELETED)
            onSuccess()
            onClose()
        } catch (error) {
            toast.error(error instanceof Error ? error.message : ERROR_MESSAGES.GENERIC)
        } finally {
            setIsDeleting(false)
        }
    }

    if (!isOpen || !subcategory) return null

    const hasProducts = (subcategory._count?.products || 0) > 0

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl">
                <div className="p-6">
                    {/* Icon */}
                    <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">
                        Șterge Subcategoria
                    </h3>

                    {/* Description */}
                    <p className="text-center text-gray-600 mb-6">
                        Ești sigur că vrei să ștergi subcategoria{' '}
                        <strong>&quot;{subcategory.name}&quot;</strong>?
                        {hasProducts && (
                            <span className="block mt-2 text-red-600 font-medium">
                                Această subcategorie are {subcategory._count?.products} produse.
                                Șterge sau mută produsele mai întâi.
                            </span>
                        )}
                    </p>

                    {/* Actions */}
                    <div className="flex justify-center space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isDeleting}
                            className="px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 border border-gray-300"
                        >
                            Anulează
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isDeleting || hasProducts}
                            className="px-6 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isDeleting ? 'Se șterge...' : 'Șterge'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
