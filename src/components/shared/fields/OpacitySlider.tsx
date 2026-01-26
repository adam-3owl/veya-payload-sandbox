'use client'

import { useCallback, useState, useEffect } from 'react'
import { clamp } from '@/utils/valueParser'
import './Slider.scss'

interface OpacitySliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  unit?: string
}

export function OpacitySlider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '%',
}: OpacitySliderProps) {
  const [numValue, setNumValue] = useState(value ?? max)

  useEffect(() => {
    setNumValue(value ?? max)
  }, [value, max])

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newNum = parseInt(e.target.value, 10)
      setNumValue(newNum)
      onChange(newNum)
    },
    [onChange]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newNum = parseInt(e.target.value, 10) || 0
      const clamped = clamp(newNum, min, max)
      setNumValue(clamped)
      onChange(clamped)
    },
    [onChange, min, max]
  )

  const percentage = ((numValue - min) / (max - min)) * 100

  return (
    <div className="field">
      <label className="field__label">{label}</label>
      <div className="slider__controls">
        <div
          className="slider__preview"
          style={{ opacity: numValue / 100 }}
        />
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
            value={numValue}
            onChange={handleInputChange}
          />
          <span className="slider__unit">{unit}</span>
        </div>
      </div>
    </div>
  )
}
