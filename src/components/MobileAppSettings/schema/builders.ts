import type { ComponentType } from 'react'
import type {
  UIColorField,
  UISizeField,
  UITextField,
  UISelectField,
  UICheckboxField,
  UINumberField,
  UIAssetField,
  UIOpacityField,
  UIRow,
  UIGroup,
  UICollapsible,
  UIConditional,
  UICustom,
  UISchemaNode,
  CustomFieldProps,
} from './types'

// ============================================
// Leaf field builders
// ============================================

export const colorField = (
  name: string,
  label: string,
  defaultValue = '#000000',
  width?: string,
): UIColorField => ({
  type: 'color',
  name,
  label,
  defaultValue,
  ...(width ? { width } : {}),
})

export const sizeField = (
  name: string,
  label: string,
  defaultValue = '0px',
  opts: { min?: number; max?: number; step?: number; unit?: string; width?: string } = {},
): UISizeField => ({
  type: 'size',
  name,
  label,
  defaultValue,
  min: opts.min ?? 0,
  max: opts.max ?? 100,
  step: opts.step ?? 1,
  unit: opts.unit ?? 'px',
  ...(opts.width ? { width: opts.width } : {}),
})

export const textField = (
  name: string,
  label: string,
  defaultValue = '',
  placeholder?: string,
): UITextField => ({
  type: 'text',
  name,
  label,
  defaultValue,
  ...(placeholder ? { placeholder } : {}),
})

export const selectField = (
  name: string,
  label: string,
  options: { label: string; value: string }[],
  defaultValue?: string,
): UISelectField => ({
  type: 'select',
  name,
  label,
  options,
  defaultValue: defaultValue ?? options[0]?.value ?? '',
})

export const checkboxField = (
  name: string,
  label: string,
  defaultValue = false,
  description?: string,
): UICheckboxField => ({
  type: 'checkbox',
  name,
  label,
  defaultValue,
  ...(description ? { description } : {}),
})

export const numberField = (
  name: string,
  label: string,
  defaultValue = 0,
  opts: { min?: number; max?: number; step?: number; unit?: string } = {},
): UINumberField => ({
  type: 'number',
  name,
  label,
  defaultValue,
  min: opts.min ?? 0,
  max: opts.max ?? 100,
  step: opts.step ?? 1,
  ...(opts.unit ? { unit: opts.unit } : {}),
})

export const assetField = (
  name: string,
  label: string,
  collection = 'icons',
  description?: string,
): UIAssetField => ({
  type: 'asset',
  name,
  label,
  collection,
  ...(description ? { description } : {}),
})

export const opacityField = (
  name: string,
  label: string,
  defaultValue = 100,
  opts: { min?: number; max?: number; step?: number } = {},
): UIOpacityField => ({
  type: 'opacity',
  name,
  label,
  defaultValue,
  min: opts.min ?? 0,
  max: opts.max ?? 100,
  step: opts.step ?? 1,
})

// ============================================
// Layout builders
// ============================================

export const row = (...fields: UISchemaNode[]): UIRow => ({
  type: 'row',
  fields,
})

export const group = (
  name: string,
  label: string,
  fields: UISchemaNode[],
  defaultOpen?: boolean,
): UIGroup => ({
  type: 'group',
  name,
  label,
  fields,
  ...(defaultOpen ? { defaultOpen } : {}),
})

export const collapsible = (
  label: string,
  fields: UISchemaNode[],
  opts: {
    defaultOpen?: boolean
    condition?: (getValue: (path: string) => unknown) => boolean
  } = {},
): UICollapsible => ({
  type: 'collapsible',
  label,
  fields,
  ...(opts.defaultOpen ? { defaultOpen: opts.defaultOpen } : {}),
  ...(opts.condition ? { condition: opts.condition } : {}),
})

export const conditional = (
  condition: (getValue: (path: string) => unknown) => boolean,
  fields: UISchemaNode[],
): UIConditional => ({
  type: 'conditional',
  condition,
  fields,
})

export const custom = (
  component: ComponentType<CustomFieldProps>,
): UICustom => ({
  type: 'custom',
  component,
})

// ============================================
// Composite builders (mirror Payload builders)
// ============================================

export const typographyGroup = (
  name: string,
  label: string,
  defaults: {
    fontFamily?: string
    lineHeight?: string
    fontSize?: string
    color?: string
  } = {},
): UIGroup => group(name, label, [
  row(
    textField('fontFamily', 'Font Family', defaults.fontFamily ?? 'System Default'),
    sizeField('lineHeight', 'Line Height', defaults.lineHeight ?? '140%', {
      min: 100, max: 200, step: 5, unit: '%',
    }),
  ),
  row(
    sizeField('fontSize', 'Font Size', defaults.fontSize ?? '14px', {
      min: 8, max: 48,
    }),
    colorField('color', 'Color', defaults.color ?? '#000000'),
  ),
])

export const underlineTabsFields = (
  prefix: string,
  defaults: {
    activeUnderlineColor?: string
    activeTextColor?: string
    inactiveUnderlineColor?: string
    inactiveTextColor?: string
  } = {},
): UIRow[] => [
  row(
    colorField(
      `${prefix}ActiveUnderlineColor`,
      'Active Underline Color',
      defaults.activeUnderlineColor ?? '#000000',
    ),
    colorField(
      `${prefix}ActiveTextColor`,
      'Active Text Color',
      defaults.activeTextColor ?? '#000000',
    ),
  ),
  row(
    colorField(
      `${prefix}InactiveUnderlineColor`,
      'Inactive Underline Color',
      defaults.inactiveUnderlineColor ?? '#cccccc',
    ),
    colorField(
      `${prefix}InactiveTextColor`,
      'Inactive Text Color',
      defaults.inactiveTextColor ?? '#666666',
    ),
  ),
]

export const iconGroup = (
  name: string,
  label: string,
  defaults: { bgColor?: string; iconColor?: string } = {},
  collection = 'icons',
): UIGroup => group(name, label, [
  row(
    colorField('bgColor', 'Background Color', defaults.bgColor ?? '#ffffff'),
    colorField('iconColor', 'Icon Color', defaults.iconColor ?? '#000000'),
  ),
  assetField('asset', `${label} Asset`, collection),
])

export const ctaFields = (
  prefix: string,
  defaults: {
    bgColor?: string
    textColor?: string
    borderColor?: string
    borderWidth?: string
  } = {},
): UIRow[] => [
  row(
    colorField(`${prefix}BgColor`, 'Background Color', defaults.bgColor ?? '#000000'),
    colorField(`${prefix}TextColor`, 'Text Color', defaults.textColor ?? '#ffffff'),
  ),
  row(
    colorField(`${prefix}BorderColor`, 'Border Color', defaults.borderColor ?? '#000000'),
    sizeField(`${prefix}BorderWidth`, 'Border Width', defaults.borderWidth ?? '1px', {
      min: 0, max: 10, step: 0.5,
    }),
  ),
]
