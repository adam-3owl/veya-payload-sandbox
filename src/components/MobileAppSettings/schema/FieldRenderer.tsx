'use client'

import type { UILeafField } from './types'
import { ColorPicker } from '../../shared/fields/ColorPicker'
import { SizeSlider } from '../../shared/fields/SizeSlider'
import { OpacitySlider } from '../../shared/fields/OpacitySlider'
import { ToggleSwitch } from '../fields/ToggleSwitch'
import { TextInput } from '../fields/TextInput'
import { SelectInput } from '../fields/SelectInput'
import { NumberInput } from '../fields/NumberInput'
import { ImageUpload } from '../fields/ImageUpload'

interface FieldRendererProps {
  field: UILeafField
  value: unknown
  onChange: (value: unknown) => void
}

export function FieldRenderer({ field, value, onChange }: FieldRendererProps) {
  switch (field.type) {
    case 'color':
      return (
        <ColorPicker
          label={field.label}
          value={(value as string) ?? field.defaultValue ?? '#000000'}
          onChange={onChange}
        />
      )

    case 'size':
      return (
        <SizeSlider
          label={field.label}
          value={(value as string) ?? field.defaultValue ?? '0px'}
          onChange={onChange}
          min={field.min}
          max={field.max}
          step={field.step}
          unit={field.unit}
        />
      )

    case 'text':
      return (
        <TextInput
          label={field.label}
          value={(value as string) ?? field.defaultValue ?? ''}
          onChange={onChange}
          placeholder={field.placeholder}
        />
      )

    case 'select':
      return (
        <SelectInput
          label={field.label}
          value={(value as string) ?? field.defaultValue ?? ''}
          onChange={onChange}
          options={field.options}
        />
      )

    case 'checkbox':
      return (
        <ToggleSwitch
          label={field.label}
          description={field.description}
          checked={(value as boolean) ?? field.defaultValue ?? false}
          onChange={onChange}
        />
      )

    case 'number':
      return (
        <NumberInput
          label={field.label}
          value={(value as number) ?? field.defaultValue ?? 0}
          onChange={onChange}
          min={field.min}
          max={field.max}
          step={field.step}
          unit={field.unit}
        />
      )

    case 'asset':
      return (
        <ImageUpload
          label={field.label}
          value={(value as string) ?? field.defaultValue ?? ''}
          onChange={onChange}
        />
      )

    case 'opacity':
      return (
        <OpacitySlider
          label={field.label}
          value={(value as number) ?? field.defaultValue ?? 100}
          onChange={onChange}
          min={field.min}
          max={field.max}
          step={field.step}
        />
      )

    default:
      return null
  }
}
