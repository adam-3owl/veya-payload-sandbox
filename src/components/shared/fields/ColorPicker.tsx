'use client'

import { useCallback, useState, useEffect, useRef, useMemo } from 'react'
import { hexToHsl, hslToHex, isValidHex, PRESET_COLORS } from '@/utils/colorConversion'
import './ColorPicker.scss'

interface ColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value || '#000000')
  const [hsl, setHsl] = useState(() => hexToHsl(value || '#000000'))
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 })
  const pickerRef = useRef<HTMLDivElement>(null)
  const swatchRef = useRef<HTMLButtonElement>(null)
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

  const handleHueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newHue = parseFloat(e.target.value)
      const newHsl = { ...hsl, h: newHue }
      setHsl(newHsl)
      const newHex = hslToHex(newHsl.h, newHsl.s, newHsl.l)
      setInputValue(newHex)
      onChange(newHex)
    },
    [hsl, onChange]
  )

  const handleSaturationLightness = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
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
      onChange(newHex)
    },
    [hsl, onChange]
  )

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
      if (isValidHex(newValue)) {
        onChange(newValue)
        setHsl(hexToHsl(newValue))
      }
    },
    [onChange]
  )

  const handleTextBlur = useCallback(() => {
    if (isValidHex(inputValue)) {
      onChange(inputValue)
    }
  }, [inputValue, onChange])

  // Memoized preset colors
  const presetColors = useMemo(() => PRESET_COLORS, [])

  const handleSwatchClick = useCallback(() => {
    if (!isOpen && swatchRef.current) {
      const rect = swatchRef.current.getBoundingClientRect()
      setPopupPosition({
        top: rect.bottom + 4,
        left: rect.left,
      })
    }
    setIsOpen(!isOpen)
  }, [isOpen])

  return (
    <div className="color-picker" ref={pickerRef}>
      <label className="color-picker__label">{label}</label>
      <div className="color-picker__wrapper">
        <button
          ref={swatchRef}
          type="button"
          className="color-picker__swatch"
          onClick={handleSwatchClick}
          style={{ backgroundColor: inputValue }}
          aria-label="Open color picker"
        />
        <input
          type="text"
          className="color-picker__input"
          value={inputValue}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          placeholder="#000000"
        />
      </div>

      {isOpen && (
        <div
          className="color-picker__popup"
          style={{
            position: 'fixed',
            top: popupPosition.top,
            left: popupPosition.left,
          }}
        >
          <div
            ref={saturationRef}
            className="color-picker__saturation"
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
                onChange(newHex)
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
              className="color-picker__cursor"
              style={{
                left: `${hsl.s}%`,
                top: `${100 - hsl.l}%`,
              }}
            />
          </div>

          <input
            type="range"
            min="0"
            max="360"
            value={hsl.h}
            onChange={handleHueChange}
            className="color-picker__hue"
          />

          <div className="color-picker__presets">
            {presetColors.map((color) => (
              <button
                key={color}
                type="button"
                className="color-picker__preset"
                style={{ backgroundColor: color }}
                onClick={() => {
                  setInputValue(color)
                  onChange(color)
                  setHsl(hexToHsl(color))
                }}
                aria-label={`Select ${color}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
