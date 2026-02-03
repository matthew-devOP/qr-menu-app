'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { FolderTree, Layers, Package, QrCode, Eye, TrendingUp, Star, BarChart3 } from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  counts: {
    categories: number
    subcategories: number
    products: number
    featured: number
    activeProducts: number
    qrCodes: number
    totalScans: number
    weeklyScans: number
  }
  topCategories: Array<{
    id: string
    name: string
    productsCount: number
  }>
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/dashboard/stats')
        if (!response.ok) {
          throw new Error('Failed to fetch stats')
        }
        const data = await response.json()
        setStats(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Eroare la încărcarea datelor')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = stats ? [
    {
      name: 'Categorii',
      value: stats.counts.categories.toString(),
      icon: FolderTree,
      description: 'Categorii active',
    },
    {
      name: 'Subcategorii',
      value: stats.counts.subcategories.toString(),
      icon: Layers,
      description: 'Subcategorii definite',
    },
    {
      name: 'Produse',
      value: stats.counts.products.toString(),
      icon: Package,
      description: `${stats.counts.activeProducts} disponibile`,
    },
    {
      name: 'Produse Populare',
      value: stats.counts.featured.toString(),
      icon: Star,
      description: 'Marcate ca featured',
    },
    {
      name: 'Coduri QR',
      value: stats.counts.qrCodes.toString(),
      icon: QrCode,
      description: 'Coduri generate',
    },
    {
      name: 'Scanări Total',
      value: stats.counts.totalScans.toString(),
      icon: Eye,
      description: `${stats.counts.weeklyScans} în ultima săptămână`,
    },
  ] : []

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-brand-primary">
            Dashboard
          </h1>
          <p className="text-text-secondary mt-1">
            Privire de ansamblu asupra meniului digital
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                  <div className="h-8 w-16 bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-32 bg-gray-200 rounded" />
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-lg" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-brand-primary">
            Dashboard
          </h1>
        </div>
        <Card className="p-6">
          <p className="text-state-error text-center">{error}</p>
        </Card>
      </div>
    )
  }

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-text-secondary mb-1">{stat.name}</p>
                <p className="text-3xl font-bold text-brand-primary">{stat.value}</p>
                <p className="text-xs text-text-muted mt-2">{stat.description}</p>
              </div>
              <div className="w-12 h-12 bg-brand-secondary/10 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-brand-secondary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Top Categories */}
      {stats && stats.topCategories.length > 0 && (
        <div>
          <h2 className="text-xl font-display font-bold text-brand-primary mb-4">
            Top Categorii
          </h2>
          <Card className="p-6">
            <div className="space-y-4">
              {stats.topCategories.map((category, index) => (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-brand-secondary/10 rounded-full flex items-center justify-center text-sm font-bold text-brand-secondary">
                      {index + 1}
                    </span>
                    <span className="font-medium text-brand-primary">{category.name}</span>
                  </div>
                  <span className="text-text-secondary text-sm">
                    {category.productsCount} produse
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-display font-bold text-brand-primary mb-4">
          Acțiuni Rapide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
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
          </Link>

          <Link
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
          </Link>

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white rounded-xl border border-border-light hover:border-brand-secondary hover:shadow-md transition-all"
          >
            <BarChart3 className="w-8 h-8 text-brand-secondary mb-3" />
            <h3 className="font-semibold text-brand-primary mb-1">
              Vezi Meniul Public
            </h3>
            <p className="text-sm text-text-secondary">
              Deschide meniul așa cum îl văd clienții
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
