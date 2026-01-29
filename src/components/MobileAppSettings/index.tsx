'use client'

import { useState } from 'react'
import { useTheme } from '@payloadcms/ui'
import type { MobileAppSetting } from '@/payload-types'
import { MobileAppSettingsProvider } from './MobileAppSettingsContext'
import { Header } from './Header'
import { TabNavigation } from './TabNavigation'
import { ContentPanel } from './ContentPanel'
import './mobile-app-settings.scss'

export type TabSection = 'navigation' | 'home-screen' | 'locations' | 'menu'

interface MobileAppSettingsClientProps {
  initialData: MobileAppSetting | null
}

export function MobileAppSettingsClient({ initialData }: MobileAppSettingsClientProps) {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState<TabSection>('navigation')

  return (
    <MobileAppSettingsProvider initialData={initialData}>
      <div className="mobile-app-settings" data-theme={theme}>
        <Header />
        <div className="mobile-app-settings__body">
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <ContentPanel activeTab={activeTab} />
        </div>
      </div>
    </MobileAppSettingsProvider>
  )
}
