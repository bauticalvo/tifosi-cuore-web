import { Product } from '@/payload-types'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid2({ products }: ProductGridProps) {
  const getDiscountedPrice = (product: Product) => {
    return product.discount ? product.price * (1 - product.discount / 100) : product.price
  }

  const getMainImage = (product: Product) => {
    if (product.images.length === 0) return null
    const firstImage = product.images[0]
    return typeof firstImage === 'string' ? null : firstImage.url
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No se encontraron productos con los filtros seleccionados.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 max-md:grid-rows-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const discountedPrice = getDiscountedPrice(product)
        const mainImage = getMainImage(product)

        return (
          <div
            key={product.id}
            className="bg-white flex md:flex-col rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Imagen del producto */}
            {mainImage && (
              <div className="aspect-square bg-gray-300 w-1/3 md:w-full">
                <img src={mainImage} alt={product.name} className="w-full h-full object-contain" />
              </div>
            )}

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{`${product.season.from}/${product.season.to.toString().slice(2)} ${product.name}`}</h3>

              <div className="mb-3">
                <span className="text-sm text-gray-500 capitalize">{product.category}</span>
                {product.team && typeof product.team !== 'string' && (
                  <span className="text-sm text-gray-500 ml-2">• {product.team.name}</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  {product.discount && (
                    <>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-red-600 font-medium">-{product.discount}%</span>
                    </>
                  )}
                </div>
              </div>

              <button className="bg-primary text-light px-4 py-2 rounded text-sm font-medium hover:bg-primary/90 transition-colors">
                Agregar al Carrito
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
