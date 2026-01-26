'use client'

import { useCallback, useState, useEffect } from 'react'
import './fields.scss'

interface NumberInputProps {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  unit?: string
}

export function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
}: NumberInputProps) {
  const [inputValue, setInputValue] = useState(value?.toString() ?? '')

  useEffect(() => {
    setInputValue(value?.toString() ?? '')
  }, [value])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setInputValue(val)

      const num = parseFloat(val)
      if (!isNaN(num)) {
        const clamped = Math.min(max, Math.max(min, num))
        onChange(clamped)
      }
    },
    [onChange, min, max]
  )

  const handleBlur = useCallback(() => {
    const num = parseFloat(inputValue)
    if (isNaN(num)) {
      setInputValue(value?.toString() ?? '')
    } else {
      const clamped = Math.min(max, Math.max(min, num))
      setInputValue(clamped.toString())
      onChange(clamped)
    }
  }, [inputValue, value, onChange, min, max])

  return (
    <div className="field">
      <label className="field__label">{label}</label>
      <div className="number-input">
        <input
          type="number"
          className="number-input__field"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          min={min}
          max={max}
          step={step}
        />
        {unit && <span className="number-input__unit">{unit}</span>}
      </div>
    </div>
  )
}
