import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BreadcrumbItem } from '@/types'

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  // Don't show breadcrumb if only home
  if (items.length <= 1) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('py-3 px-4 md:px-0', className)}
    >
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isFirst = index === 0

          return (
            <li key={item.href} className="flex items-center gap-2">
              {/* Link or Text */}
              {isLast ? (
                <span className="font-semibold text-brand-primary flex items-center gap-1.5">
                  {isFirst && <Home className="w-4 h-4" />}
                  <span className="hidden sm:inline">{item.label}</span>
                  {!isFirst && (
                    <span className="sm:hidden text-text-muted">
                      {item.label.length > 20
                        ? item.label.substring(0, 20) + '...'
                        : item.label}
                    </span>
                  )}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className={cn(
                      'text-text-secondary hover:text-brand-secondary transition-colors',
                      'flex items-center gap-1.5'
                    )}
                  >
                    {isFirst && <Home className="w-4 h-4" />}
                    <span className={cn(isFirst ? 'hidden sm:inline' : '')}>
                      {item.label}
                    </span>
                  </Link>

                  {/* Separator */}
                  <ChevronRight className="w-4 h-4 text-text-muted flex-shrink-0" />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/**
 * Mobile Breadcrumb - Collapsed version for mobile
 * Shows only Home > Current Page
 */
export function MobileBreadcrumb({ items, className }: BreadcrumbProps) {
  if (items.length <= 1) return null

  const firstItem = items[0]
  const lastItem = items[items.length - 1]

  // If only 2 items, show normal breadcrumb
  if (items.length === 2) {
    return <Breadcrumb items={items} className={className} />
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('py-3 px-4 md:hidden', className)}
    >
      <ol className="flex items-center gap-2 text-sm">
        <li className="flex items-center gap-2">
          <Link
            href={firstItem.href}
            className="text-text-secondary hover:text-brand-secondary transition-colors flex items-center gap-1.5"
          >
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4 text-text-muted" />
        </li>

        {/* Show ellipsis if more than 2 items */}
        {items.length > 2 && (
          <li className="flex items-center gap-2">
            <span className="text-text-muted">...</span>
            <ChevronRight className="w-4 h-4 text-text-muted" />
          </li>
        )}

        <li>
          <span className="font-semibold text-brand-primary line-clamp-1">
            {lastItem.label}
          </span>
        </li>
      </ol>
    </nav>
  )
}
