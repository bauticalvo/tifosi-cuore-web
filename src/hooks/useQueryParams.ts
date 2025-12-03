// src/hooks/useQueryParams.ts
import { useSearchParams } from 'react-router'
import type { ProductFilters } from '../types/api/shop'

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // Convertir query params a filters
  const getFiltersFromParams = (): ProductFilters => {
    const filters: ProductFilters = {}
    
    // Obtener todos los parámetros
    searchParams.forEach((value, key) => {
      // Manejar arrays (multiples valores para la misma key)
      if (searchParams.getAll(key).length > 1) {
        filters[key] = searchParams.getAll(key)
      } else {
        // Manejar tipos específicos
        switch (key) {
          case 'minPrice':
          case 'maxPrice':
            const numValue = Number(value)
            if (!isNaN(numValue)) {
              filters[key] = numValue
            }
            break
          default:
            filters[key] = value
        }
      }
    })

    return filters
  }

  // Actualizar query params desde filters
  const updateParamsFromFilters = (filters: ProductFilters) => {
    const newSearchParams = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          // Para arrays, agregar cada valor
          value.forEach(item => {
            if (item) newSearchParams.append(key, item.toString())
          })
        } else {
          // Para valores simples
          newSearchParams.set(key, value.toString())
        }
      }
    })
    
    setSearchParams(newSearchParams)
  }

  // Limpiar todos los filtros
  const clearAllParams = () => {
    setSearchParams(new URLSearchParams())
  }

  return {
    filters: getFiltersFromParams(),
    updateParams: updateParamsFromFilters,
    clearParams: clearAllParams,
    searchParams
  }
}