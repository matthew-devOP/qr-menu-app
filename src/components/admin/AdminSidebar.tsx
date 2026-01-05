'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FolderTree,
  Package,
  QrCode,
  Settings,
  LogOut
} from 'lucide-react'
import { signOut } from 'next-auth/react'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Categorii', href: '/admin/categories', icon: FolderTree },
  { name: 'Produse', href: '/admin/products', icon: Package },
  { name: 'Coduri QR', href: '/admin/qr-codes', icon: QrCode },
  { name: 'Setări', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <div className="lg:hidden fixed inset-0 bg-black/50 z-40" aria-hidden="true" />

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border-light lg:block">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border-light">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-secondary rounded-lg flex items-center justify-center">
              <span className="text-brand-primary font-bold text-sm">IL</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-brand-primary text-sm">
                INFINITY LOUNGE
              </h1>
              <p className="text-xs text-text-muted">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-secondary/10 text-brand-primary'
                    : 'text-text-secondary hover:bg-background-secondary hover:text-brand-primary'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-border-light p-4">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-state-error hover:bg-state-error/10 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            Deconectare
          </button>
        </div>
      </div>
    </>
  )
}
