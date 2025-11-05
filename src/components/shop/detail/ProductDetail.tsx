'use client'

import { useState } from 'react'
import { Product } from '@/payload-types'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)

  // Calcular precio con descuento
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price

  // Obtener imagen principal
  const mainImage =
    product.images?.[0] && typeof product.images[0] !== 'string' ? product.images[0] : null

  // Obtener equipo
  const team = product.team && typeof product.team !== 'string' ? product.team : null
  const league = product.league && typeof product.league !== 'string' ? product.league : null
  const country = product.country && typeof product.country !== 'string' ? product.country : null

  // Talles disponibles
  const availableSizes = product.variants?.map((variant) => variant.size) || []

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona un talle')
      return
    }
    // Aquí iría la lógica para agregar al carrito
    console.log('Agregar al carrito:', { product, size: selectedSize, quantity })
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-[10vh]">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="py-4 text-sm text-gray-500">
            <a href="/" className="hover:text-gray-700">
              Home
            </a>
            <span className="mx-2">/</span>
            <a href="/products" className="hover:text-gray-700">
              Price Drops
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna de Imagen */}
          <div>
            {mainImage && (
              <div className="bg-white rounded-lg overflow-hidden">
                <img
                  src={mainImage.url || ''}
                  alt={mainImage.alt || product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </div>

          {/* Columna de Información */}
          <div className="space-y-6">
            {/* Marca y Equipo */}
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-sm font-medium text-gray-600">Puma</span>
                {team && <span className="text-sm font-medium text-gray-600">{team.name}</span>}
              </div>

              {/* Nombre del Producto */}
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            </div>

            {/* Precio */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discount && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              {product.discount && (
                <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                  Save {product.discount}%
                </span>
              )}
            </div>

            {/* Selector de Talle */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Select Size</h3>
              <div className="flex space-x-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                      selectedSize === size
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {size.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                ADD TO CART
              </button>
            </div>

            {/* Info de Envío */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-sm text-blue-800">
                ORDER NOW and receive from <strong>3rd Nov</strong>
              </p>
            </div>

            {/* Información del Producto */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">INFO & SIZING</h3>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">SKU:</span>
                  <span className="ml-2 text-gray-900">{product.id}</span>
                </div>
                <div>
                  <span className="text-gray-600">Condition:</span>
                  <span className="ml-2 text-gray-900">Brand New</span>
                </div>
                {country && (
                  <div>
                    <span className="text-gray-600">Country:</span>
                    <span className="ml-2 text-gray-900">{country.name}</span>
                  </div>
                )}
                {league && (
                  <div>
                    <span className="text-gray-600">League:</span>
                    <span className="ml-2 text-gray-900">{league.name}</span>
                  </div>
                )}
                {team && (
                  <div>
                    <span className="text-gray-600">Nickname:</span>
                    <span className="ml-2 text-gray-900">The Citizens</span>
                  </div>
                )}
              </div>

              {/* Guía de Talles */}
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Size guide</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">SIZE</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">WIDTH - cm</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">LENGTH - cm</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">XS</td>
                        <td className="border border-gray-300 px-4 py-2">47</td>
                        <td className="border border-gray-300 px-4 py-2">72</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">S</td>
                        <td className="border border-gray-300 px-4 py-2">51</td>
                        <td className="border border-gray-300 px-4 py-2">74</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">L</td>
                        <td className="border border-gray-300 px-4 py-2">59</td>
                        <td className="border border-gray-300 px-4 py-2">76</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">XL</td>
                        <td className="border border-gray-300 px-4 py-2">63</td>
                        <td className="border border-gray-300 px-4 py-2">79</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Selector de Cantidad */}
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Select Quantity</h4>
                <div className="flex items-center space-x-4">
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-gray-300 rounded px-3 py-2"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
