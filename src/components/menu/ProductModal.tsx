'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/utils'
import { ALLERGEN_LABELS } from '@/lib/constants'
import type { MenuProduct } from '@/types'

interface ProductModalProps {
  product: MenuProduct
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const hasDiscount = product.oldPrice !== undefined && product.oldPrice > product.price
  const discountPercent = hasDiscount && product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={cn(
          'relative w-full max-w-2xl max-h-[90vh] overflow-y-auto',
          'bg-white rounded-2xl shadow-2xl',
          'animate-scale-in'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={cn(
            'absolute top-4 right-4 z-10',
            'w-10 h-10 rounded-full',
            'bg-white/90 backdrop-blur-sm shadow-lg',
            'flex items-center justify-center',
            'hover:bg-white transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-brand-secondary'
          )}
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-brand-primary" />
        </button>

        {/* Product Image */}
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-t-2xl"
            priority
          />

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-4 left-4">
              <Badge variant="error" className="text-base px-3 py-1">
                -{discountPercent}%
              </Badge>
            </div>
          )}

          {/* Unavailable Overlay */}
          {!product.isAvailable && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-t-2xl">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Temporar Indisponibil
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Title and Price */}
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-primary mb-2">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-3xl font-bold text-brand-primary">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-text-muted line-through">
                  {formatPrice(product.oldPrice!)}
                </span>
              )}
            </div>

            {/* Quantity */}
            {product.quantity && (
              <p className="text-text-secondary mt-2">{product.quantity}</p>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <div>
              <h3 className="text-lg font-semibold text-brand-primary mb-2">
                Descriere
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Allergens */}
          {product.allergens && product.allergens.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-brand-primary mb-3">
                Alergeni
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.allergens.map((allergen) => (
                  <Badge
                    key={allergen}
                    variant="outline"
                    className="text-sm px-3 py-1"
                  >
                    {ALLERGEN_LABELS[allergen as keyof typeof ALLERGEN_LABELS] || allergen}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Featured Badge */}
          {product.isFeatured && (
            <div className="pt-4 border-t border-border-light">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                ⭐ Produs Recomandat
              </Badge>
            </div>
          )}

          {/* Close Button (Mobile) */}
          <div className="pt-4 md:hidden">
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full"
            >
              Închide
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
