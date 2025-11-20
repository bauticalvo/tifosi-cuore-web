import React, { useState } from 'react'
import { useParams, Link } from 'react-router'
import { useProductBySlug } from '@/hooks/useGetProducts'
import type { ProductVariant } from '@/types/api/products'
import { ImageModal } from './ImageModal'
import { LoadingSqueleton } from './LoadingSqueleton'
import { RelatedProducts } from './RelatedProducts'

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data: product, isLoading, error } = useProductBySlug(slug || '')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
// Loading state
if (isLoading) {
  return (
    <LoadingSqueleton />
  )
}

  if (error) {
    return (
      <div className="text-red-500 text-center py-8">
        <p>Error: {(error as Error).message}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary"
        >
          Reintentar
        </button>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-8">
        <p>Producto no encontrado</p>
        <Link 
          to="/products" 
          className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary"
        >
          Volver a productos
        </Link>
      </div>
    )
  }

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
    const variant = product.variants.find(v => v.size === size)
    setSelectedVariant(variant || null)
    setQuantity(1)
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla')
      return
    }

    if (selectedVariant && selectedVariant.stock === 0) {
      alert('Esta talla no está disponible')
      return
    }

    console.log('Agregar al carrito:', {
      product: product._id,
      size: selectedSize,
      variant: selectedVariant,
      quantity
    })
  }

  const handleQuantityChange = (newQuantity: number) => {
    const maxQuantity = selectedVariant ? selectedVariant.stock : 1
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity)
    }
  }

  const getDiscountedPrice = () => {
    if (product.discount && product.discount > 0) {
      return product.price * (1 - product.discount / 100)
    }
    return product.price
  }

  const discountedPrice = getDiscountedPrice()
  const hasDiscount = product.discount && product.discount > 0

  const getCategoryName = (category: string) => {
    const categories = {
      camiseta: 'Camiseta',
      short: 'Short',
      buzo: 'Buzo'
    }
    return categories[category as keyof typeof categories] || category
  }

  const getSizeLabel = (size: string) => {
    const sizes = {
      xs: 'XS',
      s: 'S',
      m: 'M',
      l: 'L',
      xl: 'XL'
    }
    return sizes[size as keyof typeof sizes] || size.toUpperCase()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-[10vh]">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-gray-700">Inicio</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-gray-700">Productos</Link>
        <span className="mx-2">/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-gray-700">
          {getCategoryName(product.category)}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imágenes del producto */}
        <div className="space-y-4">
          {/* Imagen principal */}
          <div 
            className="bg-gray-100 rounded-lg aspect-[3/3] flex items-center justify-center overflow-hidden cursor-zoom-in"
            onClick={() => setIsModalOpen(true)}
          >
            {product.images && product.images.length > 0 ? (
              <img 
                src={(product.images[selectedImage] as any).secure_url || (product.images[0] as any).url} 
                alt={product.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-gray-400">Imagen no disponible</span>
            )}
          </div>
          
          {/* Miniaturas */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => {
                const imageUrl = (image as any).secure_url || (image as any).url;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-gray-100 rounded aspect-square overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={imageUrl} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal de imagen - agrega esto al final del componente */}
        {product.images && product.images.length > 0 && (
          <ImageModal
            images={product.images}
            initialIndex={selectedImage}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            productName={product.name}
          />
        )}

        {/* Información del producto */}
        <div className="space-y-6">
          {/* Equipo y Liga */}
          {(product.team || product.league) && (
            <div className="text-sm font-semibold text-gray-600 uppercase">
              {product.team && (product.team as any).name}
              {product.team && product.league && ' • '}
              {product.league && (product.league as any).name}
            </div>
          )}

          {/* Nombre del producto */}
          <h1 className="text-3xl font-bold text-gray-900">
            {product.name}
          </h1>

          {/* Descripción */}
          {product.description && (
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Descripción</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          )}
          {/* Temporada */}
          <div className="text-sm text-gray-600">
            Temporada {product.season.from}-{product.season.to}
          </div>

          {/* Precio */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900">
                ${discountedPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="bg-red-500 text-white px-2 py-1 text-sm rounded">
                    -{product.discount}%
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Colores */}
          {product.color && product.color.length > 0 && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Color
              </label>
              <div className="flex items-center gap-2">
                {product.color.map((colorObj) => {
                  const color = colorObj as any
                  return (
                    <div
                      key={color._id || color}
                      className="w-8 h-8 rounded-full border border-black/20"
                      style={{ 
                        backgroundColor: color.hex_code || '#ccc',
                      }}
                      title={color.name || 'Color'}
                    />
                  )
                })}
              </div>
            </div>
          )}

          {/* Tallas */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Seleccionar Talla
              </label>
              {selectedVariant && (
                <span className="text-sm text-gray-500">
                  {selectedVariant.stock} disponibles
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.size}
                  onClick={() => handleSizeSelect(variant.size)}
                  disabled={variant.stock === 0}
                  className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                    selectedSize === variant.size
                      ? 'border-primary bg-blue-50 text-primary'
                      : variant.stock === 0
                      ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {getSizeLabel(variant.size)}
                </button>
              ))}
            </div>
          </div>

          {/* Cantidad y Botón de compra */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Cantidad</label>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors disabled:text-gray-400"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-2 min-w-12 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors disabled:text-gray-400"
                  disabled={selectedVariant ? quantity >= selectedVariant.stock : false}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || (selectedVariant && selectedVariant.stock === 0)}
              className="w-full bg-primary text-white py-3 px-6 rounded-md font-medium hover:bg-primary disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {!selectedSize 
                ? 'SELECCIONA UNA TALLA' 
                : selectedVariant && selectedVariant.stock === 0
                ? 'SIN STOCK'
                : 'AGREGAR AL CARRITO'
              }
            </button>

            {/* Información de envío */}
            {/* <div className="text-sm text-center">
              ENVÍO GRATIS en compras superiores a $50
            </div> */}
          </div>


          {/* Información adicional */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex gap-8 text-sm">
              <button className="text-gray-600 hover:text-gray-900 font-medium">
                INFO & TALLAS
              </button>
              <button className="text-gray-600 hover:text-gray-900 font-medium">
                ENVÍO
              </button>
              <button className="text-gray-600 hover:text-gray-900 font-medium">
                CUIDADO DEL PRODUCTO
              </button>
            </div>
          </div>
        </div>
      </div>
      {product && (
        <RelatedProducts 
          product={product}
          title="Productos relacionados"
          limit={5}
        />
      )}
    </div>
  )
}