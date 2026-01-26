'use client'

import { useCallback } from 'react'

interface FontWeightSelectProps {
  label: string
  value: string
  onChange: (value: string) => void
}

const FONT_WEIGHT_OPTIONS = [
  { label: '100 - Thin', value: '100' },
  { label: '200 - Extra Light', value: '200' },
  { label: '300 - Light', value: '300' },
  { label: '400 - Regular', value: '400' },
  { label: '500 - Medium', value: '500' },
  { label: '600 - Semi Bold', value: '600' },
  { label: '700 - Bold', value: '700' },
  { label: '800 - Extra Bold', value: '800' },
  { label: '900 - Black', value: '900' },
]

export function FontWeightSelect({ label, value, onChange }: FontWeightSelectProps) {
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
        <select className="te-select__input" value={value || '400'} onChange={handleChange}>
          {FONT_WEIGHT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="te-select__arrow">▼</span>
      </div>
      <div className="te-select__preview" style={{ fontWeight: value || '400' }}>
        The quick brown fox
      </div>
    </div>
  )
}
