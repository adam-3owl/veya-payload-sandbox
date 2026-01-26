'use client'

import { Paintbrush, Settings } from 'lucide-react'
import type { ParentSection } from './index'

interface NavItem {
  id: ParentSection
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { id: 'styles', label: 'Styles', icon: <Paintbrush size={20} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
]

interface IconNavigationProps {
  activeSection: ParentSection
  onSectionChange: (section: ParentSection) => void
}

export function IconNavigation({ activeSection, onSectionChange }: IconNavigationProps) {
  return (
    <nav className="theme-editor__nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`theme-editor__nav-item ${activeSection === item.id ? 'theme-editor__nav-item--active' : ''}`}
          onClick={() => onSectionChange(item.id)}
        >
          {item.icon}
          <span className="theme-editor__nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
