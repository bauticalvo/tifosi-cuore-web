'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FilterState } from './ShopClient'
import FilterSelect from '../Custom/FilterSelect'
import { FiltersDrawer } from '../Custom/FilterDrawer'
import { Color, Team, League, Country, Product } from '@/payload-types'

interface ProductFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  products: Product[]
  colors: Color[]
  teams: Team[]
  leagues: League[]
  countries: Country[]
  loading?: boolean
}

export default function ProductFilters({
  filters,
  onFiltersChange,
  products,
  colors,
  teams,
  leagues,
  countries,
  loading = false,
}: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<FilterState>(filters)
  const [hasChanges, setHasChanges] = useState(false)

  const categories = ['camiseta', 'short', 'buzo']
  const sizes = ['xs', 's', 'm', 'l', 'xl']

  /** 🔁 Actualiza filtros locales SIN navegar inmediatamente */
  const toggleFilter = (key: keyof FilterState, value: string) => {
    if (loading) return // Prevenir cambios mientras carga

    const current = activeFilters[key] as string[]
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]

    const newFilters = { ...activeFilters, [key]: updated }
    setActiveFilters(newFilters)
    setHasChanges(true)
  }

  /** 🔗 Aplicar filtros y navegar - SOLO cuando el usuario decide */
  const applyFilters = () => {
    if (loading) return

    onFiltersChange(activeFilters) // ← Usar la prop que viene del padre
    setHasChanges(false)
    setOpen(false) // Cerrar drawer en mobile
  }

  /** 🧹 Limpia filtros y URL */
  const clearFilters = () => {
    if (loading) return

    const cleared: FilterState = {
      category: [],
      season: [],
      size: [],
      color: [],
      league: [],
      country: [],
      team: [],
    }
    setActiveFilters(cleared)
    setHasChanges(true)
    onFiltersChange(cleared) // ← Aplicar inmediatamente al limpiar
  }

  /** 🎨 Renderiza todos los filtros */
  const renderFilters = () => (
    <div className="space-y-5">
      <FilterSelect
        label="Categoría"
        options={categories.map((c) => ({ label: c, value: c }))}
        selected={activeFilters.category}
        onChange={(v) => toggleFilter('category', v)}
        disabled={loading}
      />

      <FilterSelect
        label="Temporada"
        options={[
          { label: '2023-2024', value: '2023-2024' },
          { label: '2024-2025', value: '2024-2025' },
        ]}
        selected={activeFilters.season}
        onChange={(v) => toggleFilter('season', v)}
        disabled={loading}
      />

      <FilterSelect
        label="Talle"
        options={sizes.map((s) => ({ label: s.toUpperCase(), value: s }))}
        selected={activeFilters.size}
        onChange={(v) => toggleFilter('size', v)}
        disabled={loading}
      />

      <FilterSelect
        label="Color"
        options={colors.map((c) => ({ label: c.name, value: c.id }))}
        selected={activeFilters.color}
        onChange={(v) => toggleFilter('color', v)}
        disabled={loading}
      />

      <FilterSelect
        label="Liga"
        options={leagues.map((l) => ({ label: l.name, value: l.id }))}
        selected={activeFilters.league}
        onChange={(v) => toggleFilter('league', v)}
        disabled={loading}
      />

      <FilterSelect
        label="País"
        options={countries.map((c) => ({ label: c.name, value: c.id }))}
        selected={activeFilters.country}
        onChange={(v) => toggleFilter('country', v)}
        disabled={loading}
      />

      <FilterSelect
        label="Equipo"
        options={teams.map((t) => ({ label: t.name, value: t.id }))}
        selected={activeFilters.team}
        onChange={(v) => toggleFilter('team', v)}
        disabled={loading}
      />

      {/* Botones de acción */}
      <div className="flex flex-col space-y-3 mt-6">
        <button
          onClick={applyFilters}
          disabled={!hasChanges || loading}
          className={`w-full py-2 rounded-md font-semibold transition ${
            hasChanges && !loading
              ? 'bg-primary text-white hover:bg-primary/90'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {loading ? 'Aplicando...' : 'Aplicar Filtros'}
        </button>

        <button
          onClick={clearFilters}
          disabled={loading}
          className="w-full bg-gray-100 text-gray-800 py-2 rounded-md font-semibold hover:bg-gray-200 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Botón Mobile */}
      <div className="sm:hidden mb-4">
        <button
          onClick={() => setOpen(true)}
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded-md shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Cargando...' : 'Filtrar productos'}
        </button>
      </div>

      {/* Filtros Desktop */}
      <div className="hidden sm:block w-64 p-4 bg-white rounded-lg shadow-sm h-fit">
        {renderFilters()}
      </div>

      {/* Drawer Mobile */}
      <FiltersDrawer open={open} onClose={() => setOpen(false)}>
        <div className="p-4">{renderFilters()}</div>
      </FiltersDrawer>
    </>
  )
}
