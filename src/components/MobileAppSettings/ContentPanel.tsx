'use client'

import type { TabSection } from './index'
import { NavigationSection } from './sections/NavigationSection'
import { HomeScreenSection } from './sections/HomeScreenSection'
import { LocationsSection } from './sections/LocationsSection'
import { MenuSection } from './sections/MenuSection'

interface ContentPanelProps {
  activeTab: TabSection
}

export function ContentPanel({ activeTab }: ContentPanelProps) {
  return (
    <div className="mobile-app-settings__content">
      {activeTab === 'navigation' && <NavigationSection />}
      {activeTab === 'home-screen' && <HomeScreenSection />}
      {activeTab === 'locations' && <LocationsSection />}
      {activeTab === 'menu' && <MenuSection />}
    </div>
  )
}
