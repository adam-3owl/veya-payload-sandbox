'use client'

import { useState, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface SectionGroupProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export function SectionGroup({ title, children, defaultOpen = false }: SectionGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="mas-group">
      <button
        className="mas-group__header"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="mas-group__title">{title}</span>
        <ChevronDown
          size={16}
          className={`mas-group__icon ${isOpen ? 'mas-group__icon--open' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="mas-group__content">
          {children}
        </div>
      )}
    </div>
  )
}
