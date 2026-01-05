import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Download, Edit, Trash2, QrCode as QrIcon } from 'lucide-react'

// Mock data - will be replaced with Prisma queries
const mockQRCodes = [
  {
    id: '1',
    name: 'Table 1',
    tableNumber: '1',
    url: 'http://localhost:3000/infinity-lounge?table=1',
    scans: 45,
    isActive: true,
    lastScanned: '2026-01-05T18:30:00',
  },
  {
    id: '2',
    name: 'Table 2',
    tableNumber: '2',
    url: 'http://localhost:3000/infinity-lounge?table=2',
    scans: 32,
    isActive: true,
    lastScanned: '2026-01-05T17:15:00',
  },
  {
    id: '3',
    name: 'Bar Counter',
    tableNumber: null,
    url: 'http://localhost:3000/infinity-lounge?location=bar',
    scans: 78,
    isActive: true,
    lastScanned: '2026-01-05T19:00:00',
  },
]

export default function AdminQRCodesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-brand-primary">
            Coduri QR
          </h1>
          <p className="text-text-secondary mt-1">
            Gestionează codurile QR pentru meniu
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Cod QR Nou
        </Button>
      </div>

      {/* QR Codes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockQRCodes.map((qr) => (
          <Card key={qr.id} className="p-6">
            {/* QR Code Visual */}
            <div className="w-32 h-32 bg-brand-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <QrIcon className="w-16 h-16 text-brand-secondary" />
            </div>

            {/* Info */}
            <div className="text-center mb-4">
              <h3 className="font-semibold text-brand-primary text-lg mb-1">
                {qr.name}
              </h3>
              {qr.tableNumber && (
                <p className="text-sm text-text-muted">
                  Masă #{qr.tableNumber}
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-4 mb-4 text-sm">
              <div className="text-center">
                <p className="text-2xl font-bold text-brand-primary">{qr.scans}</p>
                <p className="text-xs text-text-muted">Scanări</p>
              </div>
              <div className="text-center">
                <Badge variant={qr.isActive ? 'default' : 'outline'}>
                  {qr.isActive ? 'Activ' : 'Inactiv'}
                </Badge>
              </div>
            </div>

            {/* Last Scanned */}
            <p className="text-xs text-text-muted text-center mb-4">
              Ultima scanare: {new Date(qr.lastScanned).toLocaleString('ro-RO')}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex-1 gap-2">
                <Download className="w-4 h-4" />
                Descarcă
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="w-4 h-4 text-state-error" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="p-6 bg-brand-secondary/5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-brand-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <QrIcon className="w-6 h-6 text-brand-secondary" />
          </div>
          <div>
            <h3 className="font-semibold text-brand-primary mb-2">
              Cum funcționează codurile QR?
            </h3>
            <p className="text-sm text-text-secondary mb-3">
              Generați coduri QR unice pentru fiecare masă sau locație. Când clienții scanează codul,
              sunt redirecționați automat către meniul digital.
            </p>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Creați coduri QR pentru mese, bar, terasă, etc.</li>
              <li>• Descărcați și printați codurile generate</li>
              <li>• Monitorizați scanările în timp real</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
