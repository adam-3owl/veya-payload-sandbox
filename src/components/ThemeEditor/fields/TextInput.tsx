'use client'

import { useCallback } from 'react'

interface TextInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function TextInput({ label, value, onChange, placeholder }: TextInputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  return (
    <div className="te-field">
      <label className="te-field__label">{label}</label>
      <input
        type="text"
        className="te-input__field"
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  )
}
