// src/hooks/useRelatedProducts.ts
import { api } from '@/api/axiosIntance'
import { useQuery } from '@tanstack/react-query'
import type { Product } from '@/types/api/shop'

interface RelatedProductsFilters {
  team?: string
  league?: string
  category?: string
  exclude?: string
  limit?: number
}

export const useRelatedProducts = (filters: RelatedProductsFilters) => {
  return useQuery({
    queryKey: ['related-products', filters],
    queryFn: async (): Promise<Product[]> => {
      try {
        const params = new URLSearchParams()
        
        // Solo agregar filtros si existen
        if (filters.team) params.append('team', filters.team)
        if (filters.league) params.append('league', filters.league)
        if (filters.category) params.append('category', filters.category)
        params.append('limit', (filters.limit || 8).toString()) // Pedir más para filtrar después
        
        const response = await api.get(`/products?${params.toString()}`)
        let products = response.data.data || []
        
        // Filtrar el producto excluido del lado del cliente
        if (filters.exclude) {
          products = products.filter((product: Product) => product._id !== filters.exclude)
        }
        
        // Limitar los resultados después del filtrado
        return products.slice(0, filters.limit || 4)
      } catch (err: any) {
        console.error('🚨 Error en useRelatedProducts:', err)
        throw err
      }
    },
    enabled: true, // Siempre habilitado para que siempre busque productos
  })
}