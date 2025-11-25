// src/pages/Products/Products.tsx
import React, { useState } from 'react'
import { Link } from 'react-router'
import type { ProductFilters as ProductFiltersType } from '@/types/api/products'
import { useFilterOptions } from '@/hooks/useFilterOptions'
import { useFilteredProducts } from '@/hooks/useFilteredProducts'
import { ProductSort } from './ProductSort'
import { ProductFilters } from './ProductFilters'
import { ProductGrid } from './ProductGrid'

export const ProductsPage: React.FC = () => {
  const [filters, setFilters] = useState<ProductFiltersType>({})
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  const { data: filterOptions, isLoading: optionsLoading } = useFilterOptions()
  const { data: productsData, isLoading: productsLoading } = useFilteredProducts({
    filters,
    sort,
    page,
    limit: 12
  })

  const products = productsData?.data || []
  const productCount = productsData?.pagination?.total || 0
  const pagination = productsData?.pagination

  // Función para cambiar de página
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Resetear página cuando cambian los filtros
  React.useEffect(() => {
    setPage(1)
  }, [filters, sort])

  return (
    <div className="min-h-screen  mt-[11vh] lg:px-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-text-surface mb-6">
          <Link to="/" className="hover:text-primary">Inicio</Link>
          <span>/</span>
          <span className="underline font-medium">Productos</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-text-surface">{productCount} PRODUCTOS</p>
            <div className="flex items-center gap-4">
              {/* <ProductSort sort={sort} onSortChange={setSort} /> */}
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden px-4 py-2 border border-background rounded text-sm font-medium text-primary hover:bg-gray-50"
              >
                Filtros
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filtros - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            {filterOptions && (
              <ProductFilters
                filters={filters}
                filterOptions={filterOptions}
                onFiltersChange={setFilters}
                productCount={productCount}
              />
            )}
          </div>

          {/* Filtros Móvil */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden mt-[11vh]">
              <div className="absolute inset-0 bg-black/50 " onClick={() => setShowFilters(false)} />
              <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto">
                {filterOptions && (
                  <ProductFilters
                    filters={filters}
                    filterOptions={filterOptions}
                    onFiltersChange={setFilters}
                    productCount={productCount}
                  />
                )}
              </div>
            </div>
          )}

          {/* Grid de productos */}
          <div className="flex-1">
            <ProductGrid 
              products={products} 
              isLoading={productsLoading || optionsLoading}
            />
            
            {/* Paginación corregida */}
            {pagination && pagination.pages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex gap-2">
                  {/* Botón anterior */}
                  {page > 1 && (
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      className="px-4 py-2 border bg-background border-background rounded text-sm font-medium text-primary hover:bg-gray-50"
                    >
                      Anterior
                    </button>
                  )}

                  {/* Números de página */}
                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                    let pageNum
                    if (pagination.pages <= 5) {
                      pageNum = i + 1
                    } else if (page <= 3) {
                      pageNum = i + 1
                    } else if (page >= pagination.pages - 2) {
                      pageNum = pagination.pages - 4 + i
                    } else {
                      pageNum = page - 2 + i
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1 border rounded text-sm ${
                          page === pageNum
                            ? 'border-primary bg-background text-primary'
                            : 'border-background bg-background/80 text-primary hover:bg-background'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}

                  {/* Botón siguiente */}
                  {page < pagination.pages && (
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      className="px-4 py-2 bg-background border border-background rounded text-sm font-medium text-primary hover:bg-tertiary"
                    >
                      Siguiente
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}