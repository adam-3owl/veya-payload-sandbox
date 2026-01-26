'use client'

interface ToggleSwitchProps {
  label: string
  description?: string
  checked: boolean
  onChange: (value: boolean) => void
}

export function ToggleSwitch({ label, description, checked, onChange }: ToggleSwitchProps) {
  return (
    <div className="mas-toggle">
      <div className="mas-toggle__info">
        <span className="mas-toggle__label">{label}</span>
        {description && (
          <span className="mas-toggle__description">{description}</span>
        )}
      </div>
      <button
        type="button"
        className={`mas-toggle__switch ${checked ? 'mas-toggle__switch--active' : ''}`}
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
      >
        <span className="mas-toggle__knob" />
      </button>
    </div>
  )
}
