interface FilterSelectProps {
  label: string
  options: { label: string; value: string }[]
  selected: string[]
  onChange: (value: string) => void
  disabled?: boolean // ← Agregar esta prop
}

export default function FilterSelect({
  label,
  options,
  selected,
  onChange,
  disabled = false,
}: FilterSelectProps) {
  return (
    <div>
      <h3 className="font-semibold text-gray-800 text-sm mb-2">{label}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type="checkbox"
              checked={selected.includes(option.value)}
              onChange={() => onChange(option.value)}
              disabled={disabled} // ← Usar la prop disabled
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
            />
            <span className={`ml-2 text-sm text-gray-600 ${disabled ? 'opacity-50' : ''}`}>
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
