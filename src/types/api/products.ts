// Tipos para productos
export interface Product {
  id: string
  name: string
  price: number
  description: string
  category: ProductCategory
  images: string[]
  inStock: boolean
  createdAt: string
  updatedAt: string
}

export type ProductCategory = 'electronics' | 'clothing' | 'books' | 'home'

export interface ProductFilters {
  category?: ProductCategory
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
}

export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  limit: number
}