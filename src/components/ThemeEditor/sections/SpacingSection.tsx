'use client'

import { useThemeEditor } from '../ThemeEditorContext'
import { SizeSlider } from '../fields'
import { SectionGroup } from './SectionGroup'
import { CollapsibleGroup } from './CollapsibleGroup'

interface SpacingSectionProps {
  sectionId: string
  isOpen: boolean
  onToggle: (sectionId: string) => void
}

export function SpacingSection({ sectionId, isOpen, onToggle }: SpacingSectionProps) {
  const { getValue, updateField } = useThemeEditor()

  const getString = (path: string): string => (getValue(path) as string) || ''
  const setString = (path: string) => (value: string) => updateField(path, value)

  const spacingScales = [
    { name: 'tiny', label: 'Tiny', max: 16 },
    { name: 'small', label: 'Small', max: 20 },
    { name: 'medium', label: 'Medium', max: 24 },
    { name: 'large', label: 'Large', max: 32 },
    { name: 'xlarge', label: 'X-Large', max: 40 },
    { name: 'xxlarge', label: 'XX-Large', max: 48 },
    { name: 'jumbo', label: 'Jumbo', max: 56 },
    { name: 'mega', label: 'Mega', max: 64 },
    { name: 'ultra', label: 'Ultra', max: 80 },
    { name: 'giga', label: 'Giga', max: 96 },
    { name: 'titan', label: 'Titan', max: 120 },
    { name: 'colosal', label: 'Colosal', max: 140 },
  ]

  const renderSpacingFields = (basePath: string, includesTiny: boolean = true) => {
    const scales = includesTiny ? spacingScales : spacingScales.filter((s) => s.name !== 'tiny')
    return scales.map((scale) => (
      <SizeSlider
        key={scale.name}
        label={scale.label}
        value={getString(`${basePath}.${scale.name}`)}
        onChange={setString(`${basePath}.${scale.name}`)}
        min={0}
        max={scale.max}
      />
    ))
  }

  return (
    <SectionGroup title="Spacing" sectionId={sectionId} isOpen={isOpen} onToggle={onToggle}>
      <CollapsibleGroup title="Desktop Vertical" defaultOpen>
        {renderSpacingFields('styles.desktopSpacingVertical', true)}
      </CollapsibleGroup>

      <CollapsibleGroup title="Desktop Horizontal">
        {renderSpacingFields('styles.desktopSpacingHorizontal', false)}
      </CollapsibleGroup>

      <CollapsibleGroup title="Mobile Vertical">
        {renderSpacingFields('styles.mobileSpacingVertical', true)}
      </CollapsibleGroup>

      <CollapsibleGroup title="Mobile Horizontal">
        {renderSpacingFields('styles.mobileSpacingHorizontal', false)}
      </CollapsibleGroup>
    </SectionGroup>
  )
}
