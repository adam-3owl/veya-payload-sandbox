'use client'

import { Navigation, Home, MapPin, Menu } from 'lucide-react'
import type { TabSection } from './index'

interface TabNavigationProps {
  activeTab: TabSection
  onTabChange: (tab: TabSection) => void
}

const tabs: { id: TabSection; label: string; icon: typeof Navigation }[] = [
  { id: 'navigation', label: 'Navigation', icon: Navigation },
  { id: 'home-screen', label: 'Home Screen', icon: Home },
  { id: 'locations', label: 'Locations', icon: MapPin },
  { id: 'menu', label: 'Menu', icon: Menu },
]

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="mobile-app-settings__nav">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={`mobile-app-settings__nav-item ${activeTab === id ? 'mobile-app-settings__nav-item--active' : ''}`}
          onClick={() => onTabChange(id)}
          type="button"
        >
          <Icon size={18} />
          <span className="mobile-app-settings__nav-label">{label}</span>
        </button>
      ))}
    </nav>
  )
}
