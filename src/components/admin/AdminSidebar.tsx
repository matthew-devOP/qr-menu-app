'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FolderTree,
  Layers,
  Package,
  QrCode,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { signOut } from 'next-auth/react'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Categorii', href: '/admin/categories', icon: FolderTree },
  { name: 'Subcategorii', href: '/admin/subcategories', icon: Layers },
  { name: 'Produse', href: '/admin/products', icon: Package },
  { name: 'Coduri QR', href: '/admin/qr-codes', icon: QrCode },
  { name: 'Setări', href: '/admin/settings', icon: Settings },
]

interface AdminSidebarProps {
  isOpen?: boolean
  onToggle?: () => void
}

export function AdminSidebar({ isOpen = false, onToggle }: AdminSidebarProps) {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Use external state if provided, otherwise use internal state
  const isMenuOpen = onToggle ? isOpen : isMobileOpen
  const toggleMenu = onToggle || (() => setIsMobileOpen(!isMobileOpen))

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        toggleMenu()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen, toggleMenu])

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-border-light"
        aria-label={isMenuOpen ? 'Închide meniu' : 'Deschide meniu'}
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile sidebar backdrop */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          aria-hidden="true"
          onClick={toggleMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border-light',
          'transform transition-transform duration-200 ease-in-out',
          'lg:translate-x-0',
          isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
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
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
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
