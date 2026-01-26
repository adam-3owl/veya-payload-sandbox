'use client'

import { useThemeEditor } from '../ThemeEditorContext'
import { SizeSlider } from '../fields'
import { SectionGroup } from './SectionGroup'
import { CollapsibleGroup } from './CollapsibleGroup'

interface LayoutSectionProps {
  sectionId: string
  isOpen: boolean
  onToggle: (sectionId: string) => void
}

export function LayoutSection({ sectionId, isOpen, onToggle }: LayoutSectionProps) {
  const { getValue, updateField } = useThemeEditor()

  const getString = (path: string): string => (getValue(path) as string) || ''
  const setString = (path: string) => (value: string) => updateField(path, value)

  return (
    <SectionGroup title="Layout" sectionId={sectionId} isOpen={isOpen} onToggle={onToggle}>
      <CollapsibleGroup title="Breakpoints" defaultOpen>
        <SizeSlider
          label="Small"
          value={getString('styles.breakpointSmall')}
          onChange={setString('styles.breakpointSmall')}
          min={320}
          max={768}
        />
        <SizeSlider
          label="Medium"
          value={getString('styles.breakpointMedium')}
          onChange={setString('styles.breakpointMedium')}
          min={600}
          max={1024}
        />
        <SizeSlider
          label="Large"
          value={getString('styles.breakpointLarge')}
          onChange={setString('styles.breakpointLarge')}
          min={1024}
          max={2560}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Container Widths">
        <SizeSlider
          label="Small"
          value={getString('styles.containerSmall')}
          onChange={setString('styles.containerSmall')}
          min={600}
          max={1200}
        />
        <SizeSlider
          label="Large"
          value={getString('styles.containerLarge')}
          onChange={setString('styles.containerLarge')}
          min={900}
          max={1800}
        />
      </CollapsibleGroup>
    </SectionGroup>
  )
}
