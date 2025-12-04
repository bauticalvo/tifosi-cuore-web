import { api } from '@/api/axiosIntance'
import type { Team } from '@/types/api/products'
import { useQuery } from '@tanstack/react-query'

export const useGetTeams = () => {
  return useQuery({
    queryKey: ['team'],
    queryFn: async (): Promise<Team> => {
      try {
        const response = await api.get(`/teams`)
        return response.data.data
      } catch (err: any) {
        console.error('🚨 Error en useGetTeams:', err)
        throw err
      }
    },
  })
}