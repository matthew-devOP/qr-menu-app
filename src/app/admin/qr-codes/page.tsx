'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Download, Edit, Trash2, Eye } from 'lucide-react'
import { CreateQRCodeModal } from '@/components/admin/CreateQRCodeModal'
import { EditQRCodeModal } from '@/components/admin/EditQRCodeModal'
import { DeleteQRCodeDialog } from '@/components/admin/DeleteQRCodeDialog'
import { QRCodeDisplay } from '@/components/qr/QRCodeDisplay'
import { toast } from 'sonner'

interface QRCode {
  id: string
  name: string
  location: string
  url: string
  scans: number
  isActive: boolean
  lastScannedAt: Date | null
}

export default function AdminQRCodesPage() {
  const [qrCodes, setQrCodes] = useState<QRCode[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedQRCode, setSelectedQRCode] = useState<QRCode | null>(null)
  const [viewQRCode, setViewQRCode] = useState<QRCode | null>(null)

  const fetchQRCodes = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/qr-codes')

      if (!response.ok) {
        throw new Error('Failed to fetch QR codes')
      }

      const data = await response.json()
      setQrCodes(data)
    } catch (error) {
      toast.error('Failed to load QR codes')
      console.error('Error fetching QR codes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQRCodes()
  }, [])

  const handleEdit = (qrCode: QRCode) => {
    setSelectedQRCode(qrCode)
    setIsEditModalOpen(true)
  }

  const handleDelete = (qrCode: QRCode) => {
    setSelectedQRCode(qrCode)
    setIsDeleteDialogOpen(true)
  }

  const handleView = (qrCode: QRCode) => {
    setViewQRCode(qrCode)
  }

  const handleSuccess = () => {
    fetchQRCodes()
  }

  const formatDate = (date: Date | null) => {
    if (!date) return 'Never'
    return new Date(date).toLocaleDateString('ro-RO', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-brand-primary">
              Coduri QR
            </h1>
            <p className="text-text-secondary mt-1">
              Gestionează codurile QR pentru meniu
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto" />
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
            Coduri QR
          </h1>
          <p className="text-text-secondary mt-1">
            Gestionează codurile QR pentru meniu ({qrCodes.length} coduri)
          </p>
        </div>
        <Button
          className="gap-2"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Cod QR Nou
        </Button>
      </div>

      {/* QR Codes Grid */}
      {qrCodes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qrCodes.map((qr) => (
            <Card key={qr.id} className="p-6">
              {/* QR Code Preview */}
              <div className="mb-4">
                <img
                  src={`/api/qr-codes/generate?url=${encodeURIComponent(qr.url)}&size=256`}
                  alt={qr.name}
                  className="w-32 h-32 mx-auto rounded-lg border-2 border-gray-200 dark:border-gray-700"
                />
              </div>

              {/* Info */}
              <div className="text-center mb-4">
                <h3 className="font-semibold text-brand-primary text-lg mb-1">
                  {qr.name}
                </h3>
                <p className="text-sm text-text-muted truncate">
                  {qr.location}
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center gap-6 mb-4 text-sm">
                <div className="text-center">
                  <p className="text-2xl font-bold text-brand-primary">{qr.scans}</p>
                  <p className="text-text-muted text-xs">Scanări</p>
                </div>
                <div className="text-center">
                  <Badge variant={qr.isActive ? 'default' : 'secondary'}>
                    {qr.isActive ? 'Activ' : 'Inactiv'}
                  </Badge>
                </div>
              </div>

              {/* Last Scanned */}
              <p className="text-xs text-center text-text-muted mb-4">
                Ultima scanare: {formatDate(qr.lastScannedAt)}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1"
                  onClick={() => handleView(qr)}
                >
                  <Eye className="w-4 h-4" />
                  Vezi
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1"
                  onClick={() => handleEdit(qr)}
                >
                  <Edit className="w-4 h-4" />
                  Editează
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(qr)}
                >
                  <Trash2 className="w-4 h-4 text-state-error" />
                </Button>
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
              Niciun cod QR
            </h3>
            <p className="text-text-secondary mb-6">
              Începe prin a crea primul cod QR pentru meniul tău
            </p>
            <Button
              className="gap-2"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Crează Primul Cod QR
            </Button>
          </div>
        </Card>
      )}

      {/* View QR Code Modal */}
      {viewQRCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setViewQRCode(null)}>
          <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setViewQRCode(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {viewQRCode.name}
            </h3>
            <QRCodeDisplay
              url={viewQRCode.url}
              size={300}
              downloadFileName={viewQRCode.name}
            />
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateQRCodeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <EditQRCodeModal
        isOpen={isEditModalOpen}
        qrCode={selectedQRCode}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedQRCode(null)
        }}
        onSuccess={handleSuccess}
      />

      <DeleteQRCodeDialog
        isOpen={isDeleteDialogOpen}
        qrCode={selectedQRCode}
        onClose={() => {
          setIsDeleteDialogOpen(false)
          setSelectedQRCode(null)
        }}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
