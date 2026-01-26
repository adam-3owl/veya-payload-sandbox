'use client'

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
  return (
    <div className="mas-field">
      <label className="mas-field__label">{label}</label>
      <div className="mas-select__wrapper">
        <select
          className="mas-select__input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="mas-select__arrow">▼</span>
      </div>
    </div>
  )
}
