'use client'

import { useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { toast } from 'sonner'

interface QRCode {
  id: string
  name: string
}

interface DeleteQRCodeDialogProps {
  isOpen: boolean
  qrCode: QRCode | null
  onClose: () => void
  onSuccess: () => void
}

export function DeleteQRCodeDialog({
  isOpen,
  qrCode,
  onClose,
  onSuccess,
}: DeleteQRCodeDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!qrCode) return

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/qr-codes/${qrCode.id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete QR code')
      }

      toast.success('QR code deleted successfully!')
      onSuccess()
      onClose()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete QR code')
    } finally {
      setIsDeleting(false)
    }
  }

  if (!isOpen || !qrCode) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Delete QR Code</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300">
            Are you sure you want to delete <span className="font-semibold text-gray-900 dark:text-white">{qrCode.name}</span>?
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            This action cannot be undone. All scan statistics for this QR code will be lost.
          </p>
        </div>
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-6 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? 'Deleting...' : 'Delete QR Code'}
          </button>
        </div>
      </div>
    </div>
  )
}
