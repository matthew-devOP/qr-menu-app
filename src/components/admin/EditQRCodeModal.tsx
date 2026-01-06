'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { QRCodeDisplay } from '@/components/qr/QRCodeDisplay'

interface QRCode {
  id: string
  name: string
  location: string
  url: string
  isActive: boolean
}

interface EditQRCodeModalProps {
  isOpen: boolean
  qrCode: QRCode | null
  onClose: () => void
  onSuccess: () => void
}

export function EditQRCodeModal({
  isOpen,
  qrCode,
  onClose,
  onSuccess,
}: EditQRCodeModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    url: '',
    isActive: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (qrCode) {
      setFormData({
        name: qrCode.name,
        location: qrCode.location,
        url: qrCode.url,
        isActive: qrCode.isActive,
      })
    }
  }, [qrCode])

  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : 'http://localhost:3000'

  const previewUrl = formData.url ||
    (formData.location
      ? `${baseUrl}?qr=${formData.location.toLowerCase().replace(/\s+/g, '-')}`
      : baseUrl)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!qrCode) return

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/qr-codes/${qrCode.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update QR code')
      }

      toast.success('QR code updated successfully!')
      onSuccess()
      onClose()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update QR code')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen || !qrCode) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 z-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit QR Code</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
            />
          </div>
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Custom URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Preview</label>
            <QRCodeDisplay url={previewUrl} size={200} downloadFileName={formData.name} />
          </div>
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
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
