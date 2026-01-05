import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { MenuCategory } from '@/types'

interface CategoryCardProps {
  category: MenuCategory
  className?: string
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link
      href={`/${category.slug}`}
      className={cn(
        'group relative overflow-hidden rounded-xl',
        'transition-all duration-300 ease-out',
        'hover:scale-[1.02] hover:shadow-xl',
        'focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-background-secondary">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          priority={false}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 drop-shadow-lg">
            {category.name}
          </h3>

          {category.description && (
            <p className="text-sm text-white/90 line-clamp-2 mb-3 drop-shadow">
              {category.description}
            </p>
          )}

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-white/80">
            {category.subcategoriesCount > 0 && (
              <span className="flex items-center gap-1">
                <span className="font-medium">{category.subcategoriesCount}</span>
                <span>subcategorii</span>
              </span>
            )}
            {category.productsCount > 0 && (
              <span className="flex items-center gap-1">
                <span className="font-medium">{category.productsCount}</span>
                <span>produse</span>
              </span>
            )}
          </div>

          {/* Hover Indicator */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-brand-secondary/90 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-brand-primary"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

/**
 * Skeleton Loader pentru CategoryCard
 */
export function CategoryCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-xl', className)}>
      <div className="relative aspect-[16/9] w-full bg-background-secondary animate-pulse">
        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
          <div className="h-8 w-3/4 bg-white/20 rounded mb-2" />
          <div className="h-4 w-full bg-white/10 rounded mb-1" />
          <div className="h-4 w-2/3 bg-white/10 rounded mb-3" />
          <div className="flex gap-4">
            <div className="h-3 w-20 bg-white/10 rounded" />
            <div className="h-3 w-20 bg-white/10 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
