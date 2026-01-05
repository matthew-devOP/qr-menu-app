'use client'

import { useState } from 'react'
import { ProductCard, ProductModal } from '@/components/menu'
import type { MenuProduct } from '@/types'

interface ProductGridProps {
  products: MenuProduct[]
  showUnavailable?: boolean
}

export function ProductGrid({ products, showUnavailable = true }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<MenuProduct | null>(null)

  const availableProducts = products.filter((p) => p.isAvailable)
  const unavailableProducts = products.filter((p) => !p.isAvailable)

  return (
    <>
      {/* Available Products */}
      {availableProducts.length > 0 && (
        <div className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {availableProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Unavailable Products */}
      {showUnavailable && unavailableProducts.length > 0 && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-display font-semibold text-text-muted">
              Temporar Indisponibile
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {unavailableProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  )
}
