'use client'

import { useThemeEditor } from '../ThemeEditorContext'
import { SizeSlider, SelectInput } from '../fields'
import { SectionGroup } from './SectionGroup'
import { CollapsibleGroup } from './CollapsibleGroup'

interface MotionSectionProps {
  sectionId: string
  isOpen: boolean
  onToggle: (sectionId: string) => void
}

export function MotionSection({ sectionId, isOpen, onToggle }: MotionSectionProps) {
  const { getValue, updateField } = useThemeEditor()

  const getString = (path: string): string => (getValue(path) as string) || ''
  const setString = (path: string) => (value: string) => updateField(path, value)

  const easingOptions = [
    { label: 'Standard', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    { label: 'Ease', value: 'ease' },
    { label: 'Ease In Out', value: 'ease-in-out' },
    { label: 'Linear', value: 'linear' },
  ]

  const decelerateOptions = [
    { label: 'Decelerate', value: 'cubic-bezier(0, 0, 0.2, 1)' },
    { label: 'Ease Out', value: 'ease-out' },
  ]

  const accelerateOptions = [
    { label: 'Accelerate', value: 'cubic-bezier(0.4, 0, 1, 1)' },
    { label: 'Ease In', value: 'ease-in' },
  ]

  return (
    <SectionGroup title="Motion" sectionId={sectionId} isOpen={isOpen} onToggle={onToggle}>
      <CollapsibleGroup title="Duration" defaultOpen>
        <SizeSlider
          label="XS"
          value={getString('styles.durationXs')}
          onChange={setString('styles.durationXs')}
          min={0}
          max={200}
          step={10}
          unit="ms"
        />
        <SizeSlider
          label="SM"
          value={getString('styles.durationSm')}
          onChange={setString('styles.durationSm')}
          min={0}
          max={300}
          step={10}
          unit="ms"
        />
        <SizeSlider
          label="MD"
          value={getString('styles.durationMd')}
          onChange={setString('styles.durationMd')}
          min={0}
          max={500}
          step={10}
          unit="ms"
        />
        <SizeSlider
          label="LG"
          value={getString('styles.durationLg')}
          onChange={setString('styles.durationLg')}
          min={0}
          max={800}
          step={10}
          unit="ms"
        />
        <SizeSlider
          label="XL"
          value={getString('styles.durationXl')}
          onChange={setString('styles.durationXl')}
          min={0}
          max={1200}
          step={10}
          unit="ms"
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Easing Curves">
        <SelectInput
          label="Standard"
          value={getString('styles.easingStandard')}
          onChange={setString('styles.easingStandard')}
          options={easingOptions}
        />
        <SelectInput
          label="Decelerate"
          value={getString('styles.easingDecelerate')}
          onChange={setString('styles.easingDecelerate')}
          options={decelerateOptions}
        />
        <SelectInput
          label="Accelerate"
          value={getString('styles.easingAccelerate')}
          onChange={setString('styles.easingAccelerate')}
          options={accelerateOptions}
        />
      </CollapsibleGroup>
    </SectionGroup>
  )
}
