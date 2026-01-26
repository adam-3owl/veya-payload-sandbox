'use client'

import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface CollapsibleGroupProps {
  title: string
  defaultOpen?: boolean
  children: ReactNode
}

export function CollapsibleGroup({ title, defaultOpen = false, children }: CollapsibleGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="te-group">
      <button
        type="button"
        className="te-group__header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="te-group__title">{title}</span>
        <ChevronDown
          size={16}
          className={`te-group__icon ${isOpen ? 'te-group__icon--open' : ''}`}
        />
      </button>
      {isOpen && <div className="te-group__content">{children}</div>}
    </div>
  )
}
