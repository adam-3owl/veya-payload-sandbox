'use client'

import { useState, useCallback } from 'react'
import { useTheme } from '@payloadcms/ui'
import type { ThemeEditor as ThemeEditorType } from '@/payload-types'
import { ThemeEditorProvider } from './ThemeEditorContext'
import { Header } from './Header'
import { IconNavigation } from './IconNavigation'
import { ContentPanel } from './ContentPanel'
import { PreviewPanel } from './PreviewPanel'

export type ParentSection = 'styles' | 'settings'

interface ThemeEditorClientProps {
  initialData: ThemeEditorType | null
}

export function ThemeEditorClient({ initialData }: ThemeEditorClientProps) {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState<ParentSection>('styles')
  const [previewData, setPreviewData] = useState<ThemeEditorType | null>(initialData)

  const handleDataChange = useCallback((data: ThemeEditorType) => {
    setPreviewData(data)
  }, [])

  return (
    <ThemeEditorProvider initialData={initialData} onDataChange={handleDataChange}>
      <div className="theme-editor" data-theme={theme}>
        <Header />
        <div className="theme-editor__body">
          <IconNavigation
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          <ContentPanel activeSection={activeSection} />
          <PreviewPanel themeData={previewData} />
        </div>
      </div>
    </ThemeEditorProvider>
  )
}
