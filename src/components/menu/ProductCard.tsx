import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/utils'
import type { MenuProduct } from '@/types'

interface ProductCardProps {
  product: MenuProduct
  onClick?: () => void
  className?: string
}

export function ProductCard({ product, onClick, className }: ProductCardProps) {
  const hasDiscount = product.oldPrice !== undefined && product.oldPrice > product.price
  const discountPercent = hasDiscount && product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border border-border-light',
        'bg-white shadow-sm transition-all duration-300',
        'hover:shadow-md hover:border-brand-secondary/30',
        !product.isAvailable && 'opacity-60',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-background-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className={cn(
            'object-cover transition-transform duration-300 group-hover:scale-105',
            !product.isAvailable && 'grayscale'
          )}
        />

        {/* Discount Badge */}
        {hasDiscount && product.isAvailable && (
          <div className="absolute top-2 left-2">
            <Badge variant="error" className="text-xs font-bold">
              -{discountPercent}%
            </Badge>
          </div>
        )}

        {/* Featured Badge */}
        {product.isFeatured && product.isAvailable && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="text-xs font-semibold">
              ⭐ Popular
            </Badge>
          </div>
        )}

        {/* Unavailable Overlay */}
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="px-4 py-2 bg-white/90 text-brand-primary text-sm font-semibold rounded-lg">
              Indisponibil
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name */}
        <h3 className="font-semibold text-brand-primary text-base mb-1 line-clamp-2 group-hover:text-brand-secondary transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-text-secondary line-clamp-2 mb-3">
            {product.description}
          </p>
        )}

        {/* Quantity */}
        {product.quantity && (
          <p className="text-xs text-text-muted mb-3">{product.quantity}</p>
        )}

        {/* Allergens */}
        {product.allergens && product.allergens.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.allergens.slice(0, 3).map((allergen) => (
              <span
                key={allergen}
                className="text-xs px-2 py-0.5 bg-background-secondary text-text-muted rounded-full"
              >
                {allergen}
              </span>
            ))}
            {product.allergens.length > 3 && (
              <span className="text-xs px-2 py-0.5 bg-background-secondary text-text-muted rounded-full">
                +{product.allergens.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-xl font-bold text-brand-secondary">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-text-muted line-through">
              {formatPrice(product.oldPrice!)}
            </span>
          )}
        </div>
      </div>

      {/* Hover Overlay (subtle) */}
      {onClick && product.isAvailable && (
        <div className="absolute inset-0 bg-brand-secondary/0 group-hover:bg-brand-secondary/5 transition-colors pointer-events-none" />
      )}
    </div>
  )
}

/**
 * Skeleton Loader pentru ProductCard
 */
export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border-light bg-white',
        className
      )}
    >
      <div className="aspect-square w-full bg-background-secondary animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 bg-background-secondary rounded animate-pulse" />
        <div className="h-4 w-full bg-background-secondary rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-background-secondary rounded animate-pulse" />
        <div className="h-3 w-1/3 bg-background-secondary rounded animate-pulse" />
        <div className="h-7 w-1/2 bg-background-secondary rounded animate-pulse" />
      </div>
    </div>
  )
}
