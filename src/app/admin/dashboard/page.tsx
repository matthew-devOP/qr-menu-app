import { Card } from '@/components/ui/card'
import { FolderTree, Package, Eye, TrendingUp } from 'lucide-react'

// Mock stats - will be replaced with real data
const stats = [
  {
    name: 'Categorii Total',
    value: '8',
    icon: FolderTree,
    change: '+2 luna asta',
    changeType: 'positive' as const,
  },
  {
    name: 'Produse Total',
    value: '145',
    icon: Package,
    change: '+12 luna asta',
    changeType: 'positive' as const,
  },
  {
    name: 'Vizualizări',
    value: '2,345',
    icon: Eye,
    change: '+15% față de luna trecută',
    changeType: 'positive' as const,
  },
  {
    name: 'Produse Populare',
    value: '28',
    icon: TrendingUp,
    change: 'Top sellers',
    changeType: 'neutral' as const,
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-brand-primary">
          Dashboard
        </h1>
        <p className="text-text-secondary mt-1">
          Privire de ansamblu asupra meniului digital
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-text-secondary mb-1">{stat.name}</p>
                <p className="text-3xl font-bold text-brand-primary">{stat.value}</p>
                <p className={`text-xs mt-2 ${
                  stat.changeType === 'positive'
                    ? 'text-state-success'
                    : 'text-text-muted'
                }`}>
                  {stat.change}
                </p>
              </div>
              <div className="w-12 h-12 bg-brand-secondary/10 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-brand-secondary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-display font-bold text-brand-primary mb-4">
          Acțiuni Rapide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/categories"
            className="p-6 bg-white rounded-xl border border-border-light hover:border-brand-secondary hover:shadow-md transition-all"
          >
            <FolderTree className="w-8 h-8 text-brand-secondary mb-3" />
            <h3 className="font-semibold text-brand-primary mb-1">
              Gestionează Categorii
            </h3>
            <p className="text-sm text-text-secondary">
              Adaugă, editează sau șterge categorii
            </p>
          </a>

          <a
            href="/admin/products"
            className="p-6 bg-white rounded-xl border border-border-light hover:border-brand-secondary hover:shadow-md transition-all"
          >
            <Package className="w-8 h-8 text-brand-secondary mb-3" />
            <h3 className="font-semibold text-brand-primary mb-1">
              Gestionează Produse
            </h3>
            <p className="text-sm text-text-secondary">
              Adaugă, editează sau șterge produse
            </p>
          </a>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white rounded-xl border border-border-light hover:border-brand-secondary hover:shadow-md transition-all"
          >
            <Eye className="w-8 h-8 text-brand-secondary mb-3" />
            <h3 className="font-semibold text-brand-primary mb-1">
              Vezi Meniul Public
            </h3>
            <p className="text-sm text-text-secondary">
              Deschide meniul așa cum îl văd clienții
            </p>
          </a>
        </div>
      </div>

      {/* Recent Activity - Placeholder */}
      <div>
        <h2 className="text-xl font-display font-bold text-brand-primary mb-4">
          Activitate Recentă
        </h2>
        <Card className="p-6">
          <div className="text-center py-8 text-text-muted">
            <p>Activitatea recentă va fi afișată aici</p>
            <p className="text-sm mt-2">În curând...</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
