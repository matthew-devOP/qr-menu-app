'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { APP_NAME } from '@/lib/constants'

interface HeaderProps {
  venueName?: string
  logo?: string
  showBack?: boolean
  transparent?: boolean
}

export function Header({
  venueName = APP_NAME,
  logo,
  showBack = false,
  transparent = false,
}: HeaderProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isHomePage = pathname === '/'

  // Handle scroll for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-300',
        isScrolled || !transparent
          ? 'bg-white/90 backdrop-blur-md border-border-light shadow-sm'
          : 'bg-transparent border-transparent',
        transparent && !isScrolled && 'text-white'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left: Logo/Home or Back Button */}
          <div className="flex items-center gap-4">
            {showBack && !isHomePage ? (
              <Link
                href="/"
                className="flex items-center gap-2 text-sm font-medium hover:text-brand-secondary transition-colors"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Acasă</span>
              </Link>
            ) : (
              <Link href="/" className="flex items-center gap-3">
                {logo ? (
                  <img
                    src={logo}
                    alt={venueName}
                    className="h-10 md:h-12 w-auto object-contain"
                  />
                ) : (
                  <div className="flex flex-col">
                    <span className="text-xl md:text-2xl font-display font-bold text-brand-primary">
                      {venueName}
                    </span>
                    <span className="text-xs text-text-secondary hidden md:block">
                      Meniu Digital
                    </span>
                  </div>
                )}
              </Link>
            )}
          </div>

          {/* Center: Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={cn(
                'text-sm font-medium transition-colors hover:text-brand-secondary',
                pathname === '/'
                  ? 'text-brand-secondary'
                  : 'text-text-secondary'
              )}
            >
              Acasă
            </Link>
            <Link
              href="/#categories"
              className="text-sm font-medium text-text-secondary transition-colors hover:text-brand-secondary"
            >
              Categorii
            </Link>
          </nav>

          {/* Right: Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Language Switcher (Desktop) */}
            <div className="hidden md:flex items-center gap-2 text-sm">
              <button
                className={cn(
                  'px-2 py-1 rounded transition-colors',
                  'font-medium',
                  'text-brand-primary bg-brand-secondary/20'
                )}
              >
                RO
              </button>
              <button
                className={cn(
                  'px-2 py-1 rounded transition-colors',
                  'text-text-muted hover:text-brand-primary'
                )}
                disabled
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-background-secondary rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border-light">
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === '/'
                    ? 'bg-brand-secondary/20 text-brand-primary'
                    : 'text-text-secondary hover:bg-background-secondary'
                )}
              >
                Acasă
              </Link>
              <Link
                href="/#categories"
                className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-background-secondary transition-colors"
              >
                Categorii
              </Link>

              {/* Language Switcher (Mobile) */}
              <div className="px-4 py-2 flex items-center gap-2">
                <span className="text-xs text-text-muted">Limbă:</span>
                <button
                  className="px-3 py-1 rounded bg-brand-secondary/20 text-brand-primary text-sm font-medium"
                >
                  RO
                </button>
                <button
                  className="px-3 py-1 rounded text-text-muted text-sm"
                  disabled
                >
                  EN
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
