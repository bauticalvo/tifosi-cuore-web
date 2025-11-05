'use client'

import { useState, useEffect } from 'react'
import { Product, Color, Team, League, Country } from '@/payload-types'
import ProductFilters from './ProductFilters'
import ProductGrid2 from './ProductGrid2'
import { useSearchParams, useRouter } from 'next/navigation'

export interface FilterState {
  season: string[]
  size: string[]
  color: string[]
  league: string[]
  country: string[]
  category: string[]
  team: string[]
}

interface ShopClientProps {
  initialProducts: Product[]
  colors: Color[]
  teams: Team[]
  leagues: League[]
  countries: Country[]
}

export default function ShopClient({
  initialProducts,
  colors,
  teams,
  leagues,
  countries,
}: ShopClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    season: [],
    size: [],
    color: [],
    league: [],
    country: [],
    category: [],
    team: [],
  })
  const [sortBy, setSortBy] = useState('newest')

  // Leer filtros iniciales de la URL
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    const teamFromUrl = searchParams.get('team')
    const leagueFromUrl = searchParams.get('league')

    const newFilters: Partial<FilterState> = {}

    if (categoryFromUrl) {
      newFilters.category = [categoryFromUrl]
    }
    if (teamFromUrl) {
      newFilters.team = [teamFromUrl]
    }
    if (leagueFromUrl) {
      newFilters.league = [leagueFromUrl]
    }

    if (Object.keys(newFilters).length > 0) {
      const updatedFilters = { ...filters, ...newFilters }
      setFilters(updatedFilters)
      // Hacer búsqueda con filtros iniciales
      fetchFilteredProducts(updatedFilters, sortBy)
    }
  }, [searchParams])

  // Función para buscar productos en el backend
  const fetchFilteredProducts = async (currentFilters: FilterState, currentSort: string) => {
    setLoading(true)

    try {
      // Construir query parameters
      const params = new URLSearchParams()

      // Agregar filtros a los parámetros
      if (currentFilters.category.length > 0) {
        currentFilters.category.forEach((cat) => params.append('category', cat))
      }
      if (currentFilters.team.length > 0) {
        currentFilters.team.forEach((team) => params.append('team', team))
      }
      if (currentFilters.league.length > 0) {
        currentFilters.league.forEach((league) => params.append('league', league))
      }
      if (currentFilters.color.length > 0) {
        currentFilters.color.forEach((color) => params.append('color', color))
      }
      if (currentFilters.country.length > 0) {
        currentFilters.country.forEach((country) => params.append('country', country))
      }
      if (currentFilters.size.length > 0) {
        currentFilters.size.forEach((size) => params.append('size', size))
      }
      if (currentFilters.season.length > 0) {
        currentFilters.season.forEach((season) => params.append('season', season))
      }

      // Agregar rango de precio

      // Agregar ordenamiento
      params.append('sort', currentSort)

      const response = await fetch(`/api/products?${params.toString()}`)

      if (!response.ok) {
        throw new Error('Error fetching products')
      }

      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Error fetching filtered products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  // Actualizar URL cuando cambien los filtros (opcional, para URLs compartibles)
  const updateURL = (currentFilters: FilterState) => {
    const params = new URLSearchParams()

    if (currentFilters.category.length > 0) {
      params.set('category', currentFilters.category[0])
    }
    if (currentFilters.team.length > 0) {
      params.set('team', currentFilters.team[0])
    }
    if (currentFilters.league.length > 0) {
      params.set('league', currentFilters.league[0])
    }

    const newUrl = params.toString() ? `/products?${params.toString()}` : '/products'
    router.push(newUrl, { scroll: false })
  }

  // Manejar cambios en filtros
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    updateURL(newFilters)
    fetchFilteredProducts(newFilters, sortBy)
  }

  // Manejar cambios en ordenamiento
  const handleSortChange = (newSort: string) => {
    setSortBy(newSort)
    fetchFilteredProducts(filters, newSort)
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-[10vh]">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <nav className="flex text-sm text-gray-500 mb-2">
              <a href="/" className="hover:text-gray-700">
                Inicio
              </a>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Tienda</span>
            </nav>
            <h1 className="text-3xl font-bold text-gray-900">
              {searchParams.get('category')
                ? `${searchParams.get('category')?.charAt(0).toUpperCase()}${searchParams.get('category')?.slice(1)}`
                : 'Todos los productos'}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              {loading ? 'Cargando...' : `${products.length} PRODUCTOS`}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <label htmlFor="sort" className="text-sm text-gray-600">
              Ordenar Por
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
              disabled={loading}
            >
              <option value="">Default</option>
              <option value="newest">Más nuevos</option>
              <option value="price-low">Precio: Menor a Mayor</option>
              <option value="price-high">Precio: Mayor a Menor</option>
              <option value="name">Nombre A-Z</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar de filtros */}
          <div className="w-64 flex-shrink-0">
            <ProductFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              products={products}
              colors={colors}
              teams={teams}
              leagues={leagues}
              countries={countries}
              loading={loading}
            />
          </div>

          {/* Grid de productos */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <ProductGrid2 products={products} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
