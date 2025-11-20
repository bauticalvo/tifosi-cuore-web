// src/components/Products/ProductFilters.tsx
import React from 'react'
import type { ProductFilters as ProductFiltersType } from '@/types/api/products'
import type { FilterOptions } from '@/hooks/useFilterOptions'

interface ProductFiltersProps {
  filters: ProductFiltersType
  filterOptions: FilterOptions
  onFiltersChange: (filters: ProductFiltersType) => void
  productCount: number
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  filterOptions,
  onFiltersChange,
  productCount
}) => {
  const updateFilter = (key: keyof ProductFiltersType, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const toggleArrayFilter = (key: keyof ProductFiltersType, value: string) => {
    const currentArray = Array.isArray(filters[key]) ? filters[key] as string[] : []
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    
    updateFilter(key, newArray)
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const hasActiveFilters = Object.keys(filters).length > 0

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">FILTROS</h2>
          <p className="text-sm text-gray-500">{productCount} PRODUCTOS</p>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="space-y-6">
        {/* Categoría */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Categoría</h3>
          <div className="space-y-2">
            {filterOptions.categories.map(category => (
              <label key={category.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.category === category.value}
                  onChange={(e) => updateFilter('category', e.target.checked ? category.value : undefined)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{category.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Equipos */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Equipos</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {filterOptions.teams.slice(0, 10).map(team => (
              <label key={team._id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={Array.isArray(filters.team) ? filters.team.includes(team._id) : filters.team === team._id}
                  onChange={() => toggleArrayFilter('team', team._id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{team.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Ligas */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Ligas</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {filterOptions.leagues.slice(0, 10).map(league => (
              <label key={league._id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={Array.isArray(filters.league) ? filters.league.includes(league._id) : filters.league === league._id}
                  onChange={() => toggleArrayFilter('league', league._id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{league.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Países */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Países</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {filterOptions.countries.slice(0, 10).map(country => (
              <label key={country._id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={Array.isArray(filters.country) ? filters.country.includes(country._id) : filters.country === country._id}
                  onChange={() => toggleArrayFilter('country', country._id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{country.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Colores */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
          <div className="flex flex-wrap gap-2">
            {filterOptions.colors.map(color => (
              <button
                key={color._id}
                onClick={() => toggleArrayFilter('color', color._id)}
                className={`w-8 h-8 rounded-full border-2 ${
                  Array.isArray(filters.color) && filters.color.includes(color._id)
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.hex_code }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Tallas */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Talla</h3>
          <div className="flex flex-wrap gap-2">
            {filterOptions.sizes.map(size => (
              <button
                key={size}
                onClick={() => toggleArrayFilter('size', size)}
                className={`px-3 py-1 text-sm border rounded ${
                  Array.isArray(filters.size) && filters.size.includes(size)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {size.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Temporada */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Temporada</h3>
          <div className="space-y-2">
            {filterOptions.seasons.map(season => (
              <label key={season} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.season === season}
                  onChange={(e) => updateFilter('season', e.target.checked ? season : undefined)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{season}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Precio */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Precio</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Mín"
                value={filters.minPrice || ''}
                onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Máx"
                value={filters.maxPrice || ''}
                onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}