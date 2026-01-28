'use client'

import { useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import { useCallback, useState, useEffect, useMemo } from 'react'
import { parseCSSValue } from '@/utils/valueParser'

import './fields.scss'

interface SizeSliderConfig {
  min?: number
  max?: number
  step?: number
  unit?: string
}

export const SizeSliderField: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField<string>({ path })
  
  // Get config from field.admin.custom or use defaults
  const config: SizeSliderConfig = (field.admin as any)?.custom || {}
  const min = config.min ?? 0
  const max = config.max ?? 100
  const step = config.step ?? 1
  const defaultUnit = config.unit ?? 'px'

  const parsed = useMemo(() => parseCSSValue(value || `${min}${defaultUnit}`, defaultUnit), [value, min, defaultUnit])
  const [numValue, setNumValue] = useState(parsed.num)
  const [unit, setUnit] = useState(parsed.unit || defaultUnit)

  useEffect(() => {
    const p = parseCSSValue(value || `${min}${defaultUnit}`, defaultUnit)
    setNumValue(p.num)
    setUnit(p.unit || defaultUnit)
  }, [value, min, defaultUnit])

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newNum = parseFloat(e.target.value)
      setNumValue(newNum)
      setValue(`${newNum}${unit}`)
    },
    [setValue, unit],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newNum = parseFloat(e.target.value) || 0
      setNumValue(newNum)
      setValue(`${newNum}${unit}`)
    },
    [setValue, unit],
  )

  // Calculate percentage for gradient
  const percentage = ((numValue - min) / (max - min)) * 100

  return (
    <div className="size-slider-field">
      <label className="size-slider-field__label">
        {typeof field.label === 'string' ? field.label : field.name}
      </label>
      <div className="size-slider-field__controls">
        <input
          type="range"
          className="size-slider-field__slider"
          min={min}
          max={max}
          step={step}
          value={numValue}
          onChange={handleSliderChange}
          style={{
            background: `linear-gradient(to right, var(--theme-elevation-500) 0%, var(--theme-elevation-500) ${percentage}%, var(--theme-elevation-150) ${percentage}%, var(--theme-elevation-150) 100%)`,
          }}
        />
        <div className="size-slider-field__value-wrapper">
          <input
            type="number"
            className="size-slider-field__input"
            min={min}
            max={max}
            step={step}
            value={numValue}
            onChange={handleInputChange}
          />
          <span className="size-slider-field__unit">{unit}</span>
        </div>
      </div>
    </div>
  )
}

export default SizeSliderField
