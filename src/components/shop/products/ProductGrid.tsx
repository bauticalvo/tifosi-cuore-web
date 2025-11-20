// src/components/Products/ProductGrid.tsx
import React from 'react'
import { Link } from 'react-router'
import type { Product } from '@/types/api/products'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading = false }) => {
  const getDiscountedPrice = (product: Product) => {
    if (product.discount && product.discount > 0) {
      return product.price * (1 - product.discount / 100)
    }
    return product.price
  }

  const getImageUrl = (product: Product) => {
    if (product.images && product.images.length > 0) {
      const image = product.images[0]
      return (image as any).secure_url || (image as any).url
    }
    return null
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg aspect-[3/3] mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const discountedPrice = getDiscountedPrice(product)
        const hasDiscount = product.discount && product.discount > 0
        const imageUrl = getImageUrl(product)

        return (
          <div key={product._id} className="group">
            <Link to={`/products/${product.slug}`} className="block max-md:flex space-x-2">
              <div className="bg-gray-100 max-md:w-2/5 rounded-lg aspect-[3/3] overflow-hidden mb-3 relative p-2">
                {imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span>Sin imagen</span>
                  </div>
                )}
                
                {hasDiscount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{product.discount}%
                  </div>
                )}
              </div>

              <div className="space-y-1 max-md:w-3/5">
                {/* Equipo */}
                {product.team && (
                  <p className="text-sm text-gray-600 font-medium">
                    {(product.team as any).name || product.team}
                  </p>
                )}
                
                {/* Nombre del producto */}
                <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                
                {/* Temporada */}
                <p className="text-xs text-gray-500">
                  Temporada {product.season.from}-{product.season.to}
                </p>
                
                {/* Precio */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}