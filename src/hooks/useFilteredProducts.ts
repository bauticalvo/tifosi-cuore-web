// src/hooks/useFilteredProducts.ts
import { api } from '@/api/axiosIntance'
import { useQuery } from '@tanstack/react-query'
import type { Product, ProductFilters } from '@/types'

interface UseFilteredProductsProps {
  filters: ProductFilters
  sort?: string
  page?: number
  limit?: number
}

export const useFilteredProducts = ({ 
  filters, 
  sort = 'newest', 
  page = 1, 
  limit = 12 
}: UseFilteredProductsProps) => {
  return useQuery({
    queryKey: ['filtered-products', filters, sort, page, limit],
    queryFn: async () => {
      try {
        const params = new URLSearchParams()
        
        // Aplicar filtros
        if (filters.category) params.append('category', filters.category)
        if (filters.team) params.append('team', filters.team)
        if (filters.league) params.append('league', filters.league)
        if (filters.country) params.append('country', filters.country)
        if (filters.color) params.append('color', Array.isArray(filters.color) ? filters.color.join(',') : filters.color)
        if (filters.size) params.append('size', Array.isArray(filters.size) ? filters.size.join(',') : filters.size)
        if (filters.minPrice) params.append('minPrice', filters.minPrice.toString())
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString())
        if (filters.season) params.append('season', filters.season)
        if (filters.is_featured) params.append('is_featured', 'true')
        
        // Ordenamiento corregido
        let sortField = 'created_at'
        let sortOrder = 'desc'
        
        switch (sort) {
          case 'price-low':
            sortField = 'price'
            sortOrder = 'asc'
            break
          case 'price-high':
            sortField = 'price'
            sortOrder = 'desc'
            break
          case 'name':
            sortField = 'name'
            sortOrder = 'asc'
            break
          case 'discount':
            sortField = 'discount'
            sortOrder = 'desc'
            break
          case 'newest':
          default:
            sortField = 'created_at'
            sortOrder = 'desc'
        }
        
        params.append('sort', `${sortField}:${sortOrder}`)
        
        // Paginación corregida
        params.append('page', page.toString())
        params.append('limit', limit.toString())
        
        const response = await api.get(`/products?${params.toString()}`)
        return response.data
      } catch (err: any) {
        console.error('🚨 Error en useFilteredProducts:', err)
        throw err
      }
    },
    keepPreviousData: true
  })
}