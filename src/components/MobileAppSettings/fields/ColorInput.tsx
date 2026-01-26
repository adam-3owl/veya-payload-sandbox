'use client'

import { useState, useRef, useEffect } from 'react'

interface ColorInputProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export function ColorInput({ label, value, onChange }: ColorInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="mas-field" ref={containerRef}>
      <label className="mas-field__label">{label}</label>
      <div className="mas-color-input">
        <button
          type="button"
          className="mas-color-input__swatch"
          style={{ backgroundColor: value }}
          onClick={() => setIsOpen(!isOpen)}
        />
        <input
          type="text"
          className="mas-color-input__text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
        />
        {isOpen && (
          <div className="mas-color-input__popup">
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="mas-color-input__picker"
            />
          </div>
        )}
      </div>
    </div>
  )
}
