'use client'

import { useCallback, useState, useEffect, useMemo } from 'react'
import { parseCSSValue } from '@/utils/valueParser'
import './Slider.scss'

interface SizeSliderProps {
  label: string
  value: string
  onChange: (value: string) => void
  min?: number
  max?: number
  step?: number
  unit?: string
}

export function SizeSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit: defaultUnit = 'px',
}: SizeSliderProps) {
  const parsed = useMemo(() => parseCSSValue(value || `${min}${defaultUnit}`, defaultUnit), [value, min, defaultUnit])
  const [numValue, setNumValue] = useState(parsed.num)
  const unit = parsed.unit || defaultUnit

  useEffect(() => {
    const p = parseCSSValue(value || `${min}${defaultUnit}`, defaultUnit)
    setNumValue(p.num)
  }, [value, min, defaultUnit])

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newNum = parseFloat(e.target.value)
      setNumValue(newNum)
      onChange(`${newNum}${unit}`)
    },
    [onChange, unit]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newNum = parseFloat(e.target.value) || 0
      setNumValue(newNum)
      onChange(`${newNum}${unit}`)
    },
    [onChange, unit]
  )

  const percentage = ((numValue - min) / (max - min)) * 100

  return (
    <div className="field">
      <label className="field__label">{label}</label>
      <div className="slider__controls">
        <input
          type="range"
          className="slider__track"
          min={min}
          max={max}
          step={step}
          value={numValue}
          onChange={handleSliderChange}
          style={{
            background: `linear-gradient(to right, var(--theme-elevation-800) 0%, var(--theme-elevation-800) ${percentage}%, var(--theme-elevation-200) ${percentage}%, var(--theme-elevation-200) 100%)`,
          }}
        />
        <div className="slider__value">
          <input
            type="number"
            className="slider__input"
            min={min}
            max={max}
            step={step}
            value={numValue}
            onChange={handleInputChange}
          />
          <span className="slider__unit">{unit}</span>
        </div>
      </div>
    </div>
  )
}
