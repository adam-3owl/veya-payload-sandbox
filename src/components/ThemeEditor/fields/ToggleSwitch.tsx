'use client'

interface ToggleSwitchProps {
  label: string
  description?: string
  value: boolean
  onChange: (value: boolean) => void
}

export function ToggleSwitch({ label, description, value, onChange }: ToggleSwitchProps) {
  return (
    <div className="te-toggle">
      <div>
        <div className="te-toggle__label">{label}</div>
        {description && <div className="te-toggle__description">{description}</div>}
      </div>
      <button
        type="button"
        className={`te-toggle__switch ${value ? 'te-toggle__switch--active' : ''}`}
        onClick={() => onChange(!value)}
        aria-pressed={value}
      >
        <span className="te-toggle__knob" />
      </button>
    </div>
  )
}
