'use client'

import { useCallback } from 'react'

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
    <div className="te-field">
      <label className="te-field__label">{label}</label>
      <div className="te-select__wrapper">
        <select className="te-select__input" value={value || ''} onChange={handleChange}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="te-select__arrow">▼</span>
      </div>
    </div>
  )
}
