// src/hooks/useProducts.ts
import { api } from '@/api/axiosIntance'
import { useQuery } from '@tanstack/react-query'

export const useProducts = (filters?: Record<string, string | number>) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      try {
        const params = new URLSearchParams(filters as Record<string, string>);
        const response = await api.get(`/products?${params.toString()}`);
        return response.data.data;
      } catch (err: any) {
        console.error('🚨 Error en useProducts:', err);
        throw err;
      }
    },
  })
}
