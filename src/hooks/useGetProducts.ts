// src/hooks/useProductBySlug.ts
import { api } from '@/api/axiosIntance'
import type { PopulatedProduct } from '@/types/api/products'
import { useQuery } from '@tanstack/react-query'

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async (): Promise<PopulatedProduct> => {
      try {
        const response = await api.get(`/products/${slug}`)
        return response.data.data
      } catch (err: any) {
        console.error('🚨 Error en useProductBySlug:', err)
        throw err
      }
    },
    enabled: !!slug, // Solo ejecuta si hay un slug
  })
}