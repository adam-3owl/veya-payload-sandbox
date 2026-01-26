'use client'

import { useCallback } from 'react'
import './fields.scss'

interface ToggleSwitchProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function ToggleSwitch({ label, checked, onChange }: ToggleSwitchProps) {
  const handleClick = useCallback(() => {
    onChange(!checked)
  }, [checked, onChange])

  return (
    <div className="toggle">
      <span className="toggle__label">{label}</span>
      <button
        type="button"
        className={`toggle__switch ${checked ? 'toggle__switch--active' : ''}`}
        onClick={handleClick}
        aria-pressed={checked}
      />
    </div>
  )
}
