'use client'

import { useField } from '@payloadcms/ui'
import type { NumberFieldClientComponent } from 'payload'
import { useCallback, useState, useEffect } from 'react'
import { clamp } from '@/utils/valueParser'

import './fields.scss'

export const OpacitySliderField: NumberFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField<number>({ path })
  const [numValue, setNumValue] = useState(value ?? 100)

  useEffect(() => {
    setNumValue(value ?? 100)
  }, [value])

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newNum = parseInt(e.target.value, 10)
      setNumValue(newNum)
      setValue(newNum)
    },
    [setValue],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newNum = parseInt(e.target.value, 10) || 0
      const clamped = clamp(newNum, 0, 100)
      setNumValue(clamped)
      setValue(clamped)
    },
    [setValue],
  )

  return (
    <div className="opacity-slider-field">
      <label className="opacity-slider-field__label">
        {field.label || field.name}
      </label>
      <div className="opacity-slider-field__controls">
        <div 
          className="opacity-slider-field__preview"
          style={{ opacity: numValue / 100 }}
        />
        <input
          type="range"
          className="opacity-slider-field__slider"
          min={0}
          max={100}
          step={1}
          value={numValue}
          onChange={handleSliderChange}
          style={{
            background: `linear-gradient(to right, var(--theme-elevation-500) 0%, var(--theme-elevation-500) ${numValue}%, var(--theme-elevation-150) ${numValue}%, var(--theme-elevation-150) 100%)`,
          }}
        />
        <div className="opacity-slider-field__value-wrapper">
          <input
            type="number"
            className="opacity-slider-field__input"
            min={0}
            max={100}
            value={numValue}
            onChange={handleInputChange}
          />
          <span className="opacity-slider-field__unit">%</span>
        </div>
      </div>
    </div>
  )
}

export default OpacitySliderField
