'use client'

import { useCallback, useState, useEffect, useRef } from 'react'

// Convert hex to HSL
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return { h: 0, s: 0, l: 50 }

  let r = parseInt(result[1], 16) / 255
  let g = parseInt(result[2], 16) / 255
  let b = parseInt(result[3], 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

// Convert HSL to hex
function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

interface ColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
}

const presetColors = [
  '#000000',
  '#ffffff',
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#ff00ff',
  '#00ffff',
  '#ff6600',
  '#9900ff',
]

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
    if (/^#[0-9A-Fa-f]{6}$/.test(value || '')) {
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
      if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
        onChange(newValue)
        setHsl(hexToHsl(newValue))
      }
    },
    [onChange]
  )

  const handleTextBlur = useCallback(() => {
    if (/^#[0-9A-Fa-f]{6}$/.test(inputValue)) {
      onChange(inputValue)
    }
  }, [inputValue, onChange])

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
    <div className="te-field" ref={pickerRef}>
      <label className="te-field__label">{label}</label>
      <div className="te-color__wrapper">
        <button
          ref={swatchRef}
          type="button"
          className="te-color__swatch"
          onClick={handleSwatchClick}
          style={{ backgroundColor: inputValue }}
          aria-label="Open color picker"
        />
        <input
          type="text"
          className="te-color__input"
          value={inputValue}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          placeholder="#000000"
        />
      </div>

      {isOpen && (
        <div
          className="te-color__popup"
          style={{
            position: 'fixed',
            top: popupPosition.top,
            left: popupPosition.left,
          }}
        >
          <div
            ref={saturationRef}
            className="te-color__saturation"
            style={{
              background: `
                linear-gradient(to top, #000, transparent),
                linear-gradient(to right, #fff, hsl(${hsl.h}, 100%, 50%))
              `,
            }}
            onClick={handleSaturationLightness}
            onMouseDown={(e) => {
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
              className="te-color__saturation-cursor"
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
            className="te-color__hue"
          />

          <div className="te-color__presets">
            {presetColors.map((color) => (
              <button
                key={color}
                type="button"
                className="te-color__preset"
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
