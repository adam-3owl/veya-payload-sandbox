import type { CollectionSlug, Field } from 'payload'

// Component paths for custom field UI
const ColorPicker = '/components/fields/ColorPickerField'
const SizeSlider = '/components/fields/SizeSliderField'

/**
 * Creates a color field with the ColorPicker custom component.
 */
export const colorField = (
  name: string,
  label: string,
  defaultValue: string,
  width = '50%',
): Field => ({
  name,
  type: 'text',
  label,
  defaultValue,
  admin: {
    width,
    components: {
      Field: ColorPicker,
    },
  },
})

/**
 * Creates a size/spacing field with the SizeSlider custom component.
 */
export const sizeField = (
  name: string,
  label: string,
  defaultValue: string,
  options: { min?: number; max?: number; step?: number; unit?: string; width?: string } = {},
): Field => ({
  name,
  type: 'text',
  label,
  defaultValue,
  admin: {
    width: options.width || '50%',
    components: {
      Field: SizeSlider,
    },
    custom: {
      min: options.min ?? 0,
      max: options.max ?? 100,
      step: options.step ?? 1,
      unit: options.unit ?? 'px',
    },
  },
})

/**
 * Creates an upload field pointing to an asset collection (icons or media).
 */
export const assetField = (
  name: string,
  label: string,
  collection: CollectionSlug = 'icons',
  description?: string,
): Field => ({
  name,
  type: 'upload',
  label,
  relationTo: collection,
  ...(description ? { admin: { description } } : {}),
})

/**
 * Creates a typography group with fontFamily, lineHeight, fontSize, and color fields.
 */
export const typographyGroup = (
  name: string,
  label: string,
  defaults: {
    fontFamily?: string
    lineHeight?: string
    fontSize?: string
    color?: string
  } = {},
): Field => ({
  type: 'group',
  name,
  label,
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'fontFamily',
          type: 'text',
          label: 'Font Family',
          defaultValue: defaults.fontFamily ?? 'System Default',
          admin: { width: '50%' },
        },
        sizeField('lineHeight', 'Line Height', defaults.lineHeight ?? '140%', {
          min: 100,
          max: 200,
          step: 5,
          unit: '%',
        }),
      ],
    },
    {
      type: 'row',
      fields: [
        sizeField('fontSize', 'Font Size', defaults.fontSize ?? '14px', {
          min: 8,
          max: 48,
        }),
        colorField('color', 'Color', defaults.color ?? '#000000'),
      ],
    },
  ],
})

/**
 * Creates fields for underline-tab styling: active/inactive underline + text colors.
 * Returns an array of 4 color fields arranged in 2 rows.
 */
export const underlineTabsFields = (
  prefix: string,
  defaults: {
    activeUnderlineColor?: string
    activeTextColor?: string
    inactiveUnderlineColor?: string
    inactiveTextColor?: string
  } = {},
): Field[] => [
  {
    type: 'row',
    fields: [
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
    ],
  },
  {
    type: 'row',
    fields: [
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
    ],
  },
]

/**
 * Creates an icon group with bgColor, asset upload, and iconColor fields.
 */
export const iconGroup = (
  name: string,
  label: string,
  defaults: { bgColor?: string; iconColor?: string } = {},
  collection: CollectionSlug = 'icons',
): Field => ({
  type: 'group',
  name,
  label,
  fields: [
    {
      type: 'row',
      fields: [
        colorField('bgColor', 'Background Color', defaults.bgColor ?? '#ffffff'),
        colorField('iconColor', 'Icon Color', defaults.iconColor ?? '#000000'),
      ],
    },
    assetField('asset', `${label} Asset`, collection),
  ],
})

/**
 * Creates CTA styling fields: bgColor, textColor, borderColor, borderWidth.
 * Returns an array of fields arranged in rows.
 */
export const ctaFields = (
  prefix: string,
  defaults: {
    bgColor?: string
    textColor?: string
    borderColor?: string
    borderWidth?: string
  } = {},
): Field[] => [
  {
    type: 'row',
    fields: [
      colorField(`${prefix}BgColor`, 'Background Color', defaults.bgColor ?? '#000000'),
      colorField(`${prefix}TextColor`, 'Text Color', defaults.textColor ?? '#ffffff'),
    ],
  },
  {
    type: 'row',
    fields: [
      colorField(`${prefix}BorderColor`, 'Border Color', defaults.borderColor ?? '#000000'),
      sizeField(`${prefix}BorderWidth`, 'Border Width', defaults.borderWidth ?? '1px', {
        min: 0,
        max: 10,
        step: 0.5,
      }),
    ],
  },
]
