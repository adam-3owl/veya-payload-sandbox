'use client'

import { useThemeEditor } from '../ThemeEditorContext'
import { TextInput, FontWeightSelect, SizeSlider } from '../fields'
import { SectionGroup } from './SectionGroup'
import { CollapsibleGroup } from './CollapsibleGroup'

interface TypographySectionProps {
  sectionId: string
  isOpen: boolean
  onToggle: (sectionId: string) => void
}

export function TypographySection({ sectionId, isOpen, onToggle }: TypographySectionProps) {
  const { getValue, updateField } = useThemeEditor()

  const getString = (path: string): string => (getValue(path) as string) || ''
  const setString = (path: string) => (value: string) => updateField(path, value)

  return (
    <SectionGroup title="Typography" sectionId={sectionId} isOpen={isOpen} onToggle={onToggle}>
      <CollapsibleGroup title="Font Families" defaultOpen>
        <TextInput
          label="Heading"
          value={getString('styles.fontFamilyHeading')}
          onChange={setString('styles.fontFamilyHeading')}
        />
        <TextInput
          label="Body"
          value={getString('styles.fontFamilyBody')}
          onChange={setString('styles.fontFamilyBody')}
        />
        <TextInput
          label="Accent"
          value={getString('styles.fontFamilyAccent')}
          onChange={setString('styles.fontFamilyAccent')}
        />
        <TextInput
          label="Action"
          value={getString('styles.fontFamilyAction')}
          onChange={setString('styles.fontFamilyAction')}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Font Weights">
        <FontWeightSelect
          label="Light"
          value={getString('styles.fontWeightLight')}
          onChange={setString('styles.fontWeightLight')}
        />
        <FontWeightSelect
          label="Regular"
          value={getString('styles.fontWeightRegular')}
          onChange={setString('styles.fontWeightRegular')}
        />
        <FontWeightSelect
          label="Medium"
          value={getString('styles.fontWeightMedium')}
          onChange={setString('styles.fontWeightMedium')}
        />
        <FontWeightSelect
          label="Semi Bold"
          value={getString('styles.fontWeightSemiBold')}
          onChange={setString('styles.fontWeightSemiBold')}
        />
        <FontWeightSelect
          label="Bold"
          value={getString('styles.fontWeightBold')}
          onChange={setString('styles.fontWeightBold')}
        />
        <FontWeightSelect
          label="Extra Bold"
          value={getString('styles.fontWeightExtraBold')}
          onChange={setString('styles.fontWeightExtraBold')}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Line Heights">
        <SizeSlider
          label="Small"
          value={getString('styles.lineHeightSmall')}
          onChange={setString('styles.lineHeightSmall')}
          min={100}
          max={200}
          step={5}
          unit="%"
        />
        <SizeSlider
          label="Medium"
          value={getString('styles.lineHeightMedium')}
          onChange={setString('styles.lineHeightMedium')}
          min={100}
          max={200}
          step={5}
          unit="%"
        />
        <SizeSlider
          label="Tall"
          value={getString('styles.lineHeightTall')}
          onChange={setString('styles.lineHeightTall')}
          min={100}
          max={200}
          step={5}
          unit="%"
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Letter Spacing">
        <SizeSlider
          label="Tight"
          value={getString('styles.letterSpacingTight')}
          onChange={setString('styles.letterSpacingTight')}
          min={-5}
          max={5}
          step={0.5}
          unit="px"
        />
        <SizeSlider
          label="Wide"
          value={getString('styles.letterSpacingWide')}
          onChange={setString('styles.letterSpacingWide')}
          min={-5}
          max={5}
          step={0.5}
          unit="px"
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Desktop Display Sizes">
        <SizeSlider
          label="XXL"
          value={getString('styles.desktopFontSizeDisplay.xxl')}
          onChange={setString('styles.desktopFontSizeDisplay.xxl')}
          min={40}
          max={150}
        />
        <SizeSlider
          label="XL"
          value={getString('styles.desktopFontSizeDisplay.xl')}
          onChange={setString('styles.desktopFontSizeDisplay.xl')}
          min={30}
          max={120}
        />
        <SizeSlider
          label="Large"
          value={getString('styles.desktopFontSizeDisplay.lg')}
          onChange={setString('styles.desktopFontSizeDisplay.lg')}
          min={24}
          max={100}
        />
        <SizeSlider
          label="Medium"
          value={getString('styles.desktopFontSizeDisplay.md')}
          onChange={setString('styles.desktopFontSizeDisplay.md')}
          min={20}
          max={80}
        />
        <SizeSlider
          label="Small"
          value={getString('styles.desktopFontSizeDisplay.sm')}
          onChange={setString('styles.desktopFontSizeDisplay.sm')}
          min={16}
          max={60}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Desktop Headline Sizes">
        <SizeSlider
          label="XXL"
          value={getString('styles.desktopFontSizeHeadline.xxl')}
          onChange={setString('styles.desktopFontSizeHeadline.xxl')}
          min={24}
          max={100}
        />
        <SizeSlider
          label="XL"
          value={getString('styles.desktopFontSizeHeadline.xl')}
          onChange={setString('styles.desktopFontSizeHeadline.xl')}
          min={20}
          max={80}
        />
        <SizeSlider
          label="Large"
          value={getString('styles.desktopFontSizeHeadline.lg')}
          onChange={setString('styles.desktopFontSizeHeadline.lg')}
          min={18}
          max={60}
        />
        <SizeSlider
          label="Medium"
          value={getString('styles.desktopFontSizeHeadline.md')}
          onChange={setString('styles.desktopFontSizeHeadline.md')}
          min={14}
          max={50}
        />
        <SizeSlider
          label="Small"
          value={getString('styles.desktopFontSizeHeadline.sm')}
          onChange={setString('styles.desktopFontSizeHeadline.sm')}
          min={12}
          max={40}
        />
        <SizeSlider
          label="XS"
          value={getString('styles.desktopFontSizeHeadline.xs')}
          onChange={setString('styles.desktopFontSizeHeadline.xs')}
          min={10}
          max={30}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Desktop Body Sizes">
        <SizeSlider
          label="XXL"
          value={getString('styles.desktopFontSizeBody.xxl')}
          onChange={setString('styles.desktopFontSizeBody.xxl')}
          min={12}
          max={32}
        />
        <SizeSlider
          label="XL"
          value={getString('styles.desktopFontSizeBody.xl')}
          onChange={setString('styles.desktopFontSizeBody.xl')}
          min={10}
          max={28}
        />
        <SizeSlider
          label="Large"
          value={getString('styles.desktopFontSizeBody.lg')}
          onChange={setString('styles.desktopFontSizeBody.lg')}
          min={10}
          max={24}
        />
        <SizeSlider
          label="Medium"
          value={getString('styles.desktopFontSizeBody.md')}
          onChange={setString('styles.desktopFontSizeBody.md')}
          min={8}
          max={20}
        />
        <SizeSlider
          label="Small"
          value={getString('styles.desktopFontSizeBody.sm')}
          onChange={setString('styles.desktopFontSizeBody.sm')}
          min={8}
          max={18}
        />
        <SizeSlider
          label="XS"
          value={getString('styles.desktopFontSizeBody.xs')}
          onChange={setString('styles.desktopFontSizeBody.xs')}
          min={8}
          max={16}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Mobile Display Sizes">
        <SizeSlider
          label="XXL"
          value={getString('styles.mobileFontSizeDisplay.xxl')}
          onChange={setString('styles.mobileFontSizeDisplay.xxl')}
          min={32}
          max={100}
        />
        <SizeSlider
          label="XL"
          value={getString('styles.mobileFontSizeDisplay.xl')}
          onChange={setString('styles.mobileFontSizeDisplay.xl')}
          min={28}
          max={90}
        />
        <SizeSlider
          label="Large"
          value={getString('styles.mobileFontSizeDisplay.lg')}
          onChange={setString('styles.mobileFontSizeDisplay.lg')}
          min={24}
          max={80}
        />
        <SizeSlider
          label="Medium"
          value={getString('styles.mobileFontSizeDisplay.md')}
          onChange={setString('styles.mobileFontSizeDisplay.md')}
          min={20}
          max={60}
        />
        <SizeSlider
          label="Small"
          value={getString('styles.mobileFontSizeDisplay.sm')}
          onChange={setString('styles.mobileFontSizeDisplay.sm')}
          min={16}
          max={50}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Mobile Headline Sizes">
        <SizeSlider
          label="XXL"
          value={getString('styles.mobileFontSizeHeadline.xxl')}
          onChange={setString('styles.mobileFontSizeHeadline.xxl')}
          min={20}
          max={80}
        />
        <SizeSlider
          label="XL"
          value={getString('styles.mobileFontSizeHeadline.xl')}
          onChange={setString('styles.mobileFontSizeHeadline.xl')}
          min={18}
          max={60}
        />
        <SizeSlider
          label="Large"
          value={getString('styles.mobileFontSizeHeadline.lg')}
          onChange={setString('styles.mobileFontSizeHeadline.lg')}
          min={16}
          max={50}
        />
        <SizeSlider
          label="Medium"
          value={getString('styles.mobileFontSizeHeadline.md')}
          onChange={setString('styles.mobileFontSizeHeadline.md')}
          min={14}
          max={40}
        />
        <SizeSlider
          label="Small"
          value={getString('styles.mobileFontSizeHeadline.sm')}
          onChange={setString('styles.mobileFontSizeHeadline.sm')}
          min={12}
          max={30}
        />
        <SizeSlider
          label="XS"
          value={getString('styles.mobileFontSizeHeadline.xs')}
          onChange={setString('styles.mobileFontSizeHeadline.xs')}
          min={10}
          max={24}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Mobile Body Sizes">
        <SizeSlider
          label="XXL"
          value={getString('styles.mobileFontSizeBody.xxl')}
          onChange={setString('styles.mobileFontSizeBody.xxl')}
          min={10}
          max={28}
        />
        <SizeSlider
          label="XL"
          value={getString('styles.mobileFontSizeBody.xl')}
          onChange={setString('styles.mobileFontSizeBody.xl')}
          min={10}
          max={24}
        />
        <SizeSlider
          label="Large"
          value={getString('styles.mobileFontSizeBody.lg')}
          onChange={setString('styles.mobileFontSizeBody.lg')}
          min={8}
          max={20}
        />
        <SizeSlider
          label="Medium"
          value={getString('styles.mobileFontSizeBody.md')}
          onChange={setString('styles.mobileFontSizeBody.md')}
          min={8}
          max={18}
        />
        <SizeSlider
          label="Small"
          value={getString('styles.mobileFontSizeBody.sm')}
          onChange={setString('styles.mobileFontSizeBody.sm')}
          min={8}
          max={16}
        />
        <SizeSlider
          label="XS"
          value={getString('styles.mobileFontSizeBody.xs')}
          onChange={setString('styles.mobileFontSizeBody.xs')}
          min={8}
          max={14}
        />
      </CollapsibleGroup>
    </SectionGroup>
  )
}
