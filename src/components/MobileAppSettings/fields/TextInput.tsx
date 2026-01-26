'use client'

interface TextInputProps {
  label: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
}

export function TextInput({ label, placeholder, value, onChange }: TextInputProps) {
  return (
    <div className="mas-field">
      <label className="mas-field__label">{label}</label>
      <input
        type="text"
        className="mas-input__field"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
