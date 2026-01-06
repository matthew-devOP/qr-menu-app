'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { QRCodeDisplay } from '@/components/qr/QRCodeDisplay'

interface CreateQRCodeModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function CreateQRCodeModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateQRCodeModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    url: '',
    isActive: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Generate preview URL
  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : 'http://localhost:3000'

  const previewUrl = formData.url ||
    (formData.location
      ? `${baseUrl}?qr=${formData.location.toLowerCase().replace(/\s+/g, '-')}`
      : baseUrl)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/qr-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create QR code')
      }

      toast.success('QR code created successfully!')
      onSuccess()
      onClose()
      // Reset form
      setFormData({
        name: '',
        location: '',
        url: '',
        isActive: true,
      })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create QR code')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 z-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create New QR Code
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="e.g., Masa 1, Bar Counter, Terasa"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="e.g., Sala principală, Terasa, Bar"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              This will be used to identify where the QR code is placed
            </p>
          </div>

          {/* Custom URL (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Custom URL (Optional)
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="https://your-domain.com"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Leave empty to auto-generate URL with location tracking
            </p>
          </div>

          {/* Active Status */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Active (track scans)
            </label>
          </div>

          {/* QR Code Preview */}
          {(formData.name || formData.location) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Preview
              </label>
              <QRCodeDisplay
                url={previewUrl}
                size={200}
                downloadFileName={formData.name || 'qr-code'}
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create QR Code'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
