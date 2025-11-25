// src/components/RelatedProducts/RelatedProducts.tsx (versión extendida)
import React from 'react'
import { Link } from 'react-router'
import { useRelatedProducts } from '@/hooks/useRelatedProducts'
import type { Product } from '@/types/api/products'


interface RelatedProductsProps {
  product: {
    _id: string
    team?: any
    league?: any
    country?: any
    category: string
    tags?: string[]
  }
  title?: string
  limit?: number
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ 
  product, 
  title = "Productos relacionados",
  limit = 4
}) => {
  // Primero intentamos con filtros específicos
  const { data: relatedProducts, isLoading, error } = useRelatedProducts({
    team: product.team?._id || product.team,
    league: product.league?._id || product.league,
    category: product.category,
    exclude: product._id,
    limit: limit + 3 // Pedir más por si hay que filtrar
  })

  // Si no hay suficientes productos relacionados, buscamos productos de la misma categoría
  const { data: fallbackProducts } = useRelatedProducts({
    category: product.category,
    exclude: product._id,
    limit: limit
  })

  const getDiscountedPrice = (product: Product) => {
    if (product.discount && product.discount > 0) {
      return product.price * (1 - product.discount / 100)
    }
    return product.price
  }

  const getCategoryName = (category: string) => {
    const categories = {
      camiseta: 'Camiseta',
      short: 'Short',
      buzo: 'Buzo'
    }
    return categories[category as keyof typeof categories] || category
  }

  // Determinar qué productos mostrar
  const productsToShow = React.useMemo(() => {
    if (relatedProducts && relatedProducts.length >= limit) {
      return relatedProducts.slice(0, limit)
    }
    
    if (fallbackProducts && fallbackProducts.length > 0) {
      // Combinar y eliminar duplicados
      const allProducts = [...(relatedProducts || []), ...fallbackProducts]
      const uniqueProducts = allProducts.filter((product, index, self) => 
        index === self.findIndex(p => p._id === product._id)
      )
      return uniqueProducts.slice(0, limit)
    }
    
    return relatedProducts || []
  }, [relatedProducts, fallbackProducts, limit])

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="mt-16 border-t pt-8">
        <h2 className="text-2xl font-bold text-light mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg aspect-[3/4] mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  // No mostrar si no hay productos
  if (!productsToShow || productsToShow.length === 0) {
    return null
  }

  return (
    <section className="mt-16 border-t pt-8">
      <h2 className="text-2xl font-bold text-light mb-6">{title}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {productsToShow.map((relatedProduct) => {
          // Asegurar que no sea el mismo producto
          if (relatedProduct._id === product._id) {
            return null
          }

          const discountedPrice = getDiscountedPrice(relatedProduct)
          const hasDiscount = relatedProduct.discount && relatedProduct.discount > 0
          const imageUrl = relatedProduct.images && relatedProduct.images.length > 0 
            ? (relatedProduct.images[0] as any).secure_url || (relatedProduct.images[0] as any).url
            : null

          return (
            <div key={relatedProduct._id} className="group">
              <Link 
                to={`/products/${relatedProduct.slug}`}
                className="block"
              >
                <div className="bg-background/80 rounded-lg aspect-[3/3] p-2 overflow-hidden mb-3 relative">
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt={relatedProduct.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span>Sin imagen</span>
                    </div>
                  )}
                  
                  {/* Badge de descuento */}
                  {hasDiscount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{relatedProduct.discount}%
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  {/* Equipo */}
                  {relatedProduct.team && (
                    <p className="text-sm text-tertiary font-medium">
                      {(relatedProduct.team as any).name || relatedProduct.team}
                    </p>
                  )}
                  
                  {/* Nombre del producto */}
                  <h3 className="font-semibold text-light line-clamp-2 group-hover:text-tertiary transition-colors">
                    {relatedProduct.name}
                  </h3>
                  
                  {/* Temporada */}
                  <p className="text-xs text-tertiary-alt">
                    Temporada {relatedProduct.season.from}-{relatedProduct.season.to}
                  </p>
                  
                  {/* Precio */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-light">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    {hasDiscount && (
                      <span className="text-sm text-tertiary-alt line-through">
                        ${relatedProduct.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}