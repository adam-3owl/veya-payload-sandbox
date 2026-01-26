'use client'

import { useThemeEditor } from '../ThemeEditorContext'
import { ColorPicker } from '../fields'
import { SectionGroup } from './SectionGroup'
import { CollapsibleGroup } from './CollapsibleGroup'

interface ColorsSectionProps {
  sectionId: string
  isOpen: boolean
  onToggle: (sectionId: string) => void
}

export function ColorsSection({ sectionId, isOpen, onToggle }: ColorsSectionProps) {
  const { getValue, updateField } = useThemeEditor()

  const getColor = (path: string): string => (getValue(path) as string) || '#000000'
  const setColor = (path: string) => (value: string) => updateField(path, value)

  return (
    <SectionGroup title="Colors" sectionId={sectionId} isOpen={isOpen} onToggle={onToggle}>
      <CollapsibleGroup title="Brand" defaultOpen>
        <ColorPicker
          label="Primary Light"
          value={getColor('styles.brandPrimaryLight')}
          onChange={setColor('styles.brandPrimaryLight')}
        />
        <ColorPicker
          label="Primary Light 400"
          value={getColor('styles.brandPrimaryLight400')}
          onChange={setColor('styles.brandPrimaryLight400')}
        />
        <ColorPicker
          label="Primary Light 200"
          value={getColor('styles.brandPrimaryLight200')}
          onChange={setColor('styles.brandPrimaryLight200')}
        />
        <ColorPicker
          label="Primary Light 50"
          value={getColor('styles.brandPrimaryLight50')}
          onChange={setColor('styles.brandPrimaryLight50')}
        />
        <ColorPicker
          label="Primary Dark"
          value={getColor('styles.brandPrimaryDark')}
          onChange={setColor('styles.brandPrimaryDark')}
        />
        <ColorPicker
          label="Primary Dark 400"
          value={getColor('styles.brandPrimaryDark400')}
          onChange={setColor('styles.brandPrimaryDark400')}
        />
        <ColorPicker
          label="Primary Dark 200"
          value={getColor('styles.brandPrimaryDark200')}
          onChange={setColor('styles.brandPrimaryDark200')}
        />
        <ColorPicker
          label="Primary Dark 50"
          value={getColor('styles.brandPrimaryDark50')}
          onChange={setColor('styles.brandPrimaryDark50')}
        />
        <ColorPicker
          label="Secondary 1"
          value={getColor('styles.brandSecondarySlot1')}
          onChange={setColor('styles.brandSecondarySlot1')}
        />
        <ColorPicker
          label="Secondary 2"
          value={getColor('styles.brandSecondarySlot2')}
          onChange={setColor('styles.brandSecondarySlot2')}
        />
        <ColorPicker
          label="Secondary 3"
          value={getColor('styles.brandSecondarySlot3')}
          onChange={setColor('styles.brandSecondarySlot3')}
        />
        <ColorPicker
          label="Secondary 4"
          value={getColor('styles.brandSecondarySlot4')}
          onChange={setColor('styles.brandSecondarySlot4')}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Surfaces">
        <ColorPicker
          label="Light"
          value={getColor('styles.surfaceLight')}
          onChange={setColor('styles.surfaceLight')}
        />
        <ColorPicker
          label="Stripe"
          value={getColor('styles.surfaceStripe')}
          onChange={setColor('styles.surfaceStripe')}
        />
        <ColorPicker
          label="Dark"
          value={getColor('styles.surfaceDark')}
          onChange={setColor('styles.surfaceDark')}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Text">
        <ColorPicker
          label="Dark"
          value={getColor('styles.textDark')}
          onChange={setColor('styles.textDark')}
        />
        <ColorPicker
          label="Medium"
          value={getColor('styles.textMedium')}
          onChange={setColor('styles.textMedium')}
        />
        <ColorPicker
          label="Light"
          value={getColor('styles.textLight')}
          onChange={setColor('styles.textLight')}
        />
        <ColorPicker
          label="Accent"
          value={getColor('styles.textAccent')}
          onChange={setColor('styles.textAccent')}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Borders">
        <ColorPicker
          label="Light"
          value={getColor('styles.borderLight')}
          onChange={setColor('styles.borderLight')}
        />
        <ColorPicker
          label="Dark"
          value={getColor('styles.borderDark')}
          onChange={setColor('styles.borderDark')}
        />
        <ColorPicker
          label="Extra Light"
          value={getColor('styles.borderExtraLight')}
          onChange={setColor('styles.borderExtraLight')}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Utility">
        <ColorPicker
          label="Warning"
          value={getColor('styles.utilityWarning')}
          onChange={setColor('styles.utilityWarning')}
        />
        <ColorPicker
          label="Positive"
          value={getColor('styles.utilityPositive')}
          onChange={setColor('styles.utilityPositive')}
        />
        <ColorPicker
          label="Failure"
          value={getColor('styles.utilityFailure')}
          onChange={setColor('styles.utilityFailure')}
        />
        <ColorPicker
          label="Focus"
          value={getColor('styles.utilityFocus')}
          onChange={setColor('styles.utilityFocus')}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Form Fields">
        <ColorPicker
          label="Border Inactive"
          value={getColor('styles.fieldBorderInactive')}
          onChange={setColor('styles.fieldBorderInactive')}
        />
        <ColorPicker
          label="Border Active"
          value={getColor('styles.fieldBorderActive')}
          onChange={setColor('styles.fieldBorderActive')}
        />
        <ColorPicker
          label="Error"
          value={getColor('styles.fieldError')}
          onChange={setColor('styles.fieldError')}
        />
        <ColorPicker
          label="Placeholder"
          value={getColor('styles.fieldPlaceholder')}
          onChange={setColor('styles.fieldPlaceholder')}
        />
        <ColorPicker
          label="Input"
          value={getColor('styles.fieldInput')}
          onChange={setColor('styles.fieldInput')}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Primary Actions">
        <ColorPicker
          label="BG Active"
          value={getColor('styles.actionPrimary.bgActive')}
          onChange={setColor('styles.actionPrimary.bgActive')}
        />
        <ColorPicker
          label="BG Inactive"
          value={getColor('styles.actionPrimary.bgInactive')}
          onChange={setColor('styles.actionPrimary.bgInactive')}
        />
        <ColorPicker
          label="BG Hover"
          value={getColor('styles.actionPrimary.bgHover')}
          onChange={setColor('styles.actionPrimary.bgHover')}
        />
        <ColorPicker
          label="BG Pressed"
          value={getColor('styles.actionPrimary.bgPressed')}
          onChange={setColor('styles.actionPrimary.bgPressed')}
        />
        <ColorPicker
          label="Surface Active"
          value={getColor('styles.actionPrimary.surfaceActive')}
          onChange={setColor('styles.actionPrimary.surfaceActive')}
        />
        <ColorPicker
          label="Surface Inactive"
          value={getColor('styles.actionPrimary.surfaceInactive')}
          onChange={setColor('styles.actionPrimary.surfaceInactive')}
        />
        <ColorPicker
          label="Surface Hover"
          value={getColor('styles.actionPrimary.surfaceHover')}
          onChange={setColor('styles.actionPrimary.surfaceHover')}
        />
        <ColorPicker
          label="Surface Pressed"
          value={getColor('styles.actionPrimary.surfacePressed')}
          onChange={setColor('styles.actionPrimary.surfacePressed')}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Secondary Actions">
        <ColorPicker
          label="BG Active"
          value={getColor('styles.actionSecondary.bgActive')}
          onChange={setColor('styles.actionSecondary.bgActive')}
        />
        <ColorPicker
          label="BG Inactive"
          value={getColor('styles.actionSecondary.bgInactive')}
          onChange={setColor('styles.actionSecondary.bgInactive')}
        />
        <ColorPicker
          label="BG Hover"
          value={getColor('styles.actionSecondary.bgHover')}
          onChange={setColor('styles.actionSecondary.bgHover')}
        />
        <ColorPicker
          label="BG Pressed"
          value={getColor('styles.actionSecondary.bgPressed')}
          onChange={setColor('styles.actionSecondary.bgPressed')}
        />
        <ColorPicker
          label="Surface Active"
          value={getColor('styles.actionSecondary.surfaceActive')}
          onChange={setColor('styles.actionSecondary.surfaceActive')}
        />
        <ColorPicker
          label="Surface Inactive"
          value={getColor('styles.actionSecondary.surfaceInactive')}
          onChange={setColor('styles.actionSecondary.surfaceInactive')}
        />
        <ColorPicker
          label="Surface Hover"
          value={getColor('styles.actionSecondary.surfaceHover')}
          onChange={setColor('styles.actionSecondary.surfaceHover')}
        />
        <ColorPicker
          label="Surface Pressed"
          value={getColor('styles.actionSecondary.surfacePressed')}
          onChange={setColor('styles.actionSecondary.surfacePressed')}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Text Actions">
        <ColorPicker
          label="Surface Active"
          value={getColor('styles.actionText.surfaceActive')}
          onChange={setColor('styles.actionText.surfaceActive')}
        />
        <ColorPicker
          label="Surface Inactive"
          value={getColor('styles.actionText.surfaceInactive')}
          onChange={setColor('styles.actionText.surfaceInactive')}
        />
        <ColorPicker
          label="Surface Hover"
          value={getColor('styles.actionText.surfaceHover')}
          onChange={setColor('styles.actionText.surfaceHover')}
        />
        <ColorPicker
          label="Surface Pressed"
          value={getColor('styles.actionText.surfacePressed')}
          onChange={setColor('styles.actionText.surfacePressed')}
        />
      </CollapsibleGroup>
    </SectionGroup>
  )
}
