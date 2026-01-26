'use client'

import { useCallback } from 'react'
import './fields.scss'

interface SelectOption {
  label: string
  value: string
}

interface SelectInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
}

export function SelectInput({ label, value, onChange, options }: SelectInputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  return (
    <div className="field">
      <label className="field__label">{label}</label>
      <select
        className="select__field"
        value={value || ''}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
