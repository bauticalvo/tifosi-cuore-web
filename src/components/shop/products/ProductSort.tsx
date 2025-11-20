import React from 'react'

interface ProductSortProps {
  sort: string
  onSortChange: (sort: string) => void
}

export const ProductSort: React.FC<ProductSortProps> = ({ sort, onSortChange }) => {
  const sortOptions = [
    { value: 'newest', label: 'Más recientes' },
    { value: 'price-low', label: 'Precio: Menor a mayor' },
    { value: 'price-high', label: 'Precio: Mayor a menor' },
    { value: 'name', label: 'Nombre A-Z' },
    { value: 'discount', label: 'Mayor descuento' }
  ]

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-700">Ordenar por:</span>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}