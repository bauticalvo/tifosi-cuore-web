// src/hooks/useFilterOptions.ts
import { api } from '@/api/axiosIntance'
import { useQuery } from '@tanstack/react-query'

export interface FilterOptions {
  teams: Array<{ _id: string; name: string }>
  leagues: Array<{ _id: string; name: string }>
  countries: Array<{ _id: string; name: string }>
  categories: Array<{ value: string; label: string }>
  colors: Array<{ _id: string; name: string; hex_code?: string }>
  sizes: string[]
  seasons: string[]
}

export const useFilterOptions = () => {
  return useQuery({
    queryKey: ['filter-options'],
    queryFn: async (): Promise<FilterOptions> => {
      try {
        // En una implementación real, estos vendrían de endpoints específicos
        const [teamsRes, leaguesRes, countriesRes] = await Promise.all([
          api.get('/teams'),
          api.get('/leagues'),
          api.get('/countries')
        ])

        return {
          teams: teamsRes.data.data || [],
          leagues: leaguesRes.data.data || [],
          countries: countriesRes.data.data || [],
          categories: [
            { value: 'camiseta', label: 'Camisetas' },
            { value: 'short', label: 'Shorts' },
            { value: 'buzo', label: 'Buzos' },
            { value: 'conjunto', label: 'Conjuntos' }
          ],
          colors: [
            { _id: 'red', name: 'Rojo', hex_code: '#DC2626' },
            { _id: 'blue', name: 'Azul', hex_code: '#2563EB' },
            { _id: 'green', name: 'Verde', hex_code: '#16A34A' },
            { _id: 'black', name: 'Negro', hex_code: '#000000' },
            { _id: 'white', name: 'Blanco', hex_code: '#FFFFFF' }
          ],
          sizes: ['xs', 's', 'm', 'l', 'xl'],
          seasons: ['2024-25', '2023-24', '2022-23', '2021-22']
        }
      } catch (err: any) {
        console.error('🚨 Error en useFilterOptions:', err)
        throw err
      }
    }
  })
}