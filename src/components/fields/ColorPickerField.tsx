'use client'

import { useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import { useCallback, useState, useEffect, useRef, useMemo } from 'react'
import { hexToHsl, hslToHex, isValidHex, PRESET_COLORS } from '@/utils/colorConversion'

import './fields.scss'

export const ColorPickerField: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField<string>({ path })
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value || '#000000')
  const [hsl, setHsl] = useState(() => hexToHsl(value || '#000000'))
  const pickerRef = useRef<HTMLDivElement>(null)
  const saturationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setInputValue(value || '#000000')
    if (isValidHex(value || '')) {
      setHsl(hexToHsl(value || '#000000'))
    }
  }, [value])

  // Close picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleHueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newHue = parseFloat(e.target.value)
    const newHsl = { ...hsl, h: newHue }
    setHsl(newHsl)
    const newHex = hslToHex(newHsl.h, newHsl.s, newHsl.l)
    setInputValue(newHex)
    setValue(newHex)
  }, [hsl, setValue])

  const handleSaturationLightness = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!saturationRef.current) return
    const rect = saturationRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    
    const newS = x * 100
    const newL = 100 - y * 100
    const newHsl = { ...hsl, s: newS, l: newL }
    setHsl(newHsl)
    const newHex = hslToHex(newHsl.h, newHsl.s, newHsl.l)
    setInputValue(newHex)
    setValue(newHex)
  }, [hsl, setValue])

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    if (isValidHex(newValue)) {
      setValue(newValue)
      setHsl(hexToHsl(newValue))
    }
  }, [setValue])

  const handleTextBlur = useCallback(() => {
    if (isValidHex(inputValue)) {
      setValue(inputValue)
    }
  }, [inputValue, setValue])

  // Memoized preset colors
  const presetColors = useMemo(() => PRESET_COLORS, [])

  return (
    <div className="color-picker-field" ref={pickerRef}>
      <label className="color-picker-field__label">
        {typeof field.label === 'string' ? field.label : field.name}
      </label>
      <div className="color-picker-field__input-wrapper">
        <button
          type="button"
          className="color-picker-field__swatch-btn"
          onClick={() => setIsOpen(!isOpen)}
          style={{ backgroundColor: inputValue }}
          aria-label="Open color picker"
        />
        <input
          type="text"
          className="color-picker-field__text-input"
          value={inputValue}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          placeholder="#000000"
        />
      </div>

      {isOpen && (
        <div className="color-picker-field__popup">
          {/* Saturation/Lightness picker */}
          <div
            ref={saturationRef}
            className="color-picker-field__saturation"
            style={{
              background: `
                linear-gradient(to top, #000, transparent),
                linear-gradient(to right, #fff, hsl(${hsl.h}, 100%, 50%))
              `,
            }}
            onClick={handleSaturationLightness}
            onMouseDown={(_e) => {
              const handleMove = (moveEvent: MouseEvent) => {
                if (!saturationRef.current) return
                const rect = saturationRef.current.getBoundingClientRect()
                const x = Math.max(0, Math.min(1, (moveEvent.clientX - rect.left) / rect.width))
                const y = Math.max(0, Math.min(1, (moveEvent.clientY - rect.top) / rect.height))
                const newS = x * 100
                setHsl({ h: hsl.h, s: newS, l: 100 - y * 100 })
                const newHex = hslToHex(hsl.h, newS, 100 - y * 100)
                setInputValue(newHex)
                setValue(newHex)
              }
              const handleUp = () => {
                document.removeEventListener('mousemove', handleMove)
                document.removeEventListener('mouseup', handleUp)
              }
              document.addEventListener('mousemove', handleMove)
              document.addEventListener('mouseup', handleUp)
            }}
          >
            <div
              className="color-picker-field__saturation-cursor"
              style={{
                left: `${hsl.s}%`,
                top: `${100 - hsl.l}%`,
              }}
            />
          </div>

          {/* Hue slider */}
          <div className="color-picker-field__hue-wrapper">
            <input
              type="range"
              min="0"
              max="360"
              value={hsl.h}
              onChange={handleHueChange}
              className="color-picker-field__hue-slider"
            />
          </div>

          {/* Preset colors */}
          <div className="color-picker-field__presets">
            {presetColors.map((color) => (
              <button
                key={color}
                type="button"
                className="color-picker-field__preset"
                style={{ backgroundColor: color }}
                onClick={() => {
                  setInputValue(color)
                  setValue(color)
                  setHsl(hexToHsl(color))
                }}
                aria-label={`Select ${color}`}
              />
            ))}
          </div>

          {/* Current color preview */}
          <div className="color-picker-field__preview-row">
            <div
              className="color-picker-field__preview-swatch"
              style={{ backgroundColor: inputValue }}
            />
            <span className="color-picker-field__preview-value">{inputValue}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ColorPickerField
