'use client'

import { useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import { useCallback } from 'react'

import './fields.scss'

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

export const FontWeightField: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField<string>({ path })

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value)
    },
    [setValue],
  )

  return (
    <div className="font-weight-field">
      <label className="font-weight-field__label">
        {field.label || field.name}
      </label>
      <div className="font-weight-field__select-wrapper">
        <select
          className="font-weight-field__select"
          value={value || '400'}
          onChange={handleChange}
        >
          {FONT_WEIGHT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="font-weight-field__arrow">▼</span>
      </div>
      <div 
        className="font-weight-field__preview"
        style={{ fontWeight: value || '400' }}
      >
        The quick brown fox jumps over the lazy dog
      </div>
    </div>
  )
}

export default FontWeightField
