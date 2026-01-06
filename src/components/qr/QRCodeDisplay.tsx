'use client'

import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface QRCodeDisplayProps {
  url: string
  size?: number
  downloadFileName?: string
}

export function QRCodeDisplay({
  url,
  size = 256,
  downloadFileName = 'qr-code',
}: QRCodeDisplayProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('')

  useEffect(() => {
    // Generate QR code image URL
    const qrUrl = `/api/qr-codes/generate?url=${encodeURIComponent(url)}&size=${size}`
    setQrDataUrl(qrUrl)
  }, [url, size])

  const handleDownload = async (format: 'png' | 'svg') => {
    try {
      const downloadUrl = `/api/qr-codes/generate?url=${encodeURIComponent(url)}&format=${format}&size=1024`
      const response = await fetch(downloadUrl)
      const blob = await response.blob()

      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `${downloadFileName}.${format}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
    } catch (error) {
      console.error('Error downloading QR code:', error)
    }
  }

  return (
    <div className="space-y-4">
      {/* QR Code Preview */}
      <div className="flex justify-center p-8 bg-white dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
        {qrDataUrl ? (
          <img
            src={qrDataUrl}
            alt="QR Code"
            width={size}
            height={size}
            className="rounded-lg"
          />
        ) : (
          <div
            className="bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"
            style={{ width: size, height: size }}
          />
        )}
      </div>

      {/* URL Display */}
      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 break-all">
          {url}
        </p>
      </div>

      {/* Download Buttons */}
      <div className="flex justify-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDownload('png')}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Download PNG
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDownload('svg')}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Download SVG
        </Button>
      </div>
    </div>
  )
}
