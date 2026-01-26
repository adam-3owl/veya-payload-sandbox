'use client'

import { useThemeEditor } from '../ThemeEditorContext'
import { SizeSlider, OpacitySlider, TextInput } from '../fields'
import { SectionGroup } from './SectionGroup'
import { CollapsibleGroup } from './CollapsibleGroup'

interface EffectsSectionProps {
  sectionId: string
  isOpen: boolean
  onToggle: (sectionId: string) => void
}

export function EffectsSection({ sectionId, isOpen, onToggle }: EffectsSectionProps) {
  const { getValue, updateField } = useThemeEditor()

  const getString = (path: string): string => (getValue(path) as string) || ''
  const getNumber = (path: string): number => (getValue(path) as number) || 0
  const setString = (path: string) => (value: string) => updateField(path, value)
  const setNumber = (path: string) => (value: number) => updateField(path, value)

  return (
    <SectionGroup title="Effects" sectionId={sectionId} isOpen={isOpen} onToggle={onToggle}>
      <CollapsibleGroup title="Border Radius" defaultOpen>
        <SizeSlider
          label="XX-Small"
          value={getString('styles.radiusXxSmall')}
          onChange={setString('styles.radiusXxSmall')}
          min={0}
          max={8}
        />
        <SizeSlider
          label="Extra Small"
          value={getString('styles.radiusExtraSmall')}
          onChange={setString('styles.radiusExtraSmall')}
          min={0}
          max={16}
        />
        <SizeSlider
          label="Small"
          value={getString('styles.radiusSmall')}
          onChange={setString('styles.radiusSmall')}
          min={0}
          max={24}
        />
        <SizeSlider
          label="Medium"
          value={getString('styles.radiusMedium')}
          onChange={setString('styles.radiusMedium')}
          min={0}
          max={32}
        />
        <SizeSlider
          label="Large"
          value={getString('styles.radiusLarge')}
          onChange={setString('styles.radiusLarge')}
          min={0}
          max={48}
        />
        <SizeSlider
          label="Full"
          value={getString('styles.radiusFull')}
          onChange={setString('styles.radiusFull')}
          min={0}
          max={1000}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Elevation (Shadows)">
        <TextInput
          label="Level 0"
          value={getString('styles.elevation0')}
          onChange={setString('styles.elevation0')}
          placeholder="none"
        />
        <TextInput
          label="Level 1"
          value={getString('styles.elevation1')}
          onChange={setString('styles.elevation1')}
          placeholder="0 1px 2px rgba(0,0,0,0.06)"
        />
        <TextInput
          label="Level 2"
          value={getString('styles.elevation2')}
          onChange={setString('styles.elevation2')}
          placeholder="0 2px 4px rgba(0,0,0,0.08)"
        />
        <TextInput
          label="Level 3"
          value={getString('styles.elevation3')}
          onChange={setString('styles.elevation3')}
          placeholder="0 4px 8px rgba(0,0,0,0.12)"
        />
        <TextInput
          label="Level 4"
          value={getString('styles.elevation4')}
          onChange={setString('styles.elevation4')}
          placeholder="0 8px 16px rgba(0,0,0,0.16)"
        />
        <TextInput
          label="Level 5"
          value={getString('styles.elevation5')}
          onChange={setString('styles.elevation5')}
          placeholder="0 12px 24px rgba(0,0,0,0.20)"
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Stroke Width">
        <SizeSlider
          label="Small"
          value={getString('styles.strokeSmall')}
          onChange={setString('styles.strokeSmall')}
          min={0}
          max={4}
          step={0.5}
        />
        <SizeSlider
          label="Medium"
          value={getString('styles.strokeMedium')}
          onChange={setString('styles.strokeMedium')}
          min={0}
          max={6}
          step={0.5}
        />
        <SizeSlider
          label="Large"
          value={getString('styles.strokeLarge')}
          onChange={setString('styles.strokeLarge')}
          min={0}
          max={10}
          step={0.5}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Opacity">
        <OpacitySlider
          label="Disabled"
          value={getNumber('styles.opacityDisabled')}
          onChange={setNumber('styles.opacityDisabled')}
        />
        <OpacitySlider
          label="Overlay"
          value={getNumber('styles.opacityOverlay')}
          onChange={setNumber('styles.opacityOverlay')}
        />
        <OpacitySlider
          label="Hover"
          value={getNumber('styles.opacityHover')}
          onChange={setNumber('styles.opacityHover')}
        />
        <OpacitySlider
          label="Focus"
          value={getNumber('styles.opacityFocus')}
          onChange={setNumber('styles.opacityFocus')}
        />
      </CollapsibleGroup>
    </SectionGroup>
  )
}
