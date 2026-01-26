'use client'

import { useState, useCallback } from 'react'
import type { ParentSection } from './index'
import { ColorsSection } from './sections/ColorsSection'
import { TypographySection } from './sections/TypographySection'
import { SpacingSection } from './sections/SpacingSection'
import { EffectsSection } from './sections/EffectsSection'
import { MotionSection } from './sections/MotionSection'
import { LayoutSection } from './sections/LayoutSection'
import { SettingsSection } from './sections/SettingsSection'

interface ContentPanelProps {
  activeSection: ParentSection
}

export function ContentPanel({ activeSection }: ContentPanelProps) {
  const [openSection, setOpenSection] = useState<string | null>('colors')

  const handleToggle = useCallback((sectionId: string) => {
    setOpenSection((current) => (current === sectionId ? null : sectionId))
  }, [])

  if (activeSection === 'settings') {
    return (
      <div className="theme-editor__content">
        <SettingsSection
          sectionId="settings"
          isOpen={openSection === 'settings'}
          onToggle={handleToggle}
        />
      </div>
    )
  }

  // Styles section - show all style sections as accordion
  return (
    <div className="theme-editor__content">
      <div className="theme-editor__styles-list">
        <ColorsSection
          sectionId="colors"
          isOpen={openSection === 'colors'}
          onToggle={handleToggle}
        />
        <TypographySection
          sectionId="typography"
          isOpen={openSection === 'typography'}
          onToggle={handleToggle}
        />
        <SpacingSection
          sectionId="spacing"
          isOpen={openSection === 'spacing'}
          onToggle={handleToggle}
        />
        <EffectsSection
          sectionId="effects"
          isOpen={openSection === 'effects'}
          onToggle={handleToggle}
        />
        <MotionSection
          sectionId="motion"
          isOpen={openSection === 'motion'}
          onToggle={handleToggle}
        />
        <LayoutSection
          sectionId="layout"
          isOpen={openSection === 'layout'}
          onToggle={handleToggle}
        />
      </div>
    </div>
  )
}
