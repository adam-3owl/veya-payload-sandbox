import type { ComponentType } from 'react'

// ============================================
// Custom field props (escape hatch interface)
// ============================================

export interface CustomFieldProps {
  pathPrefix: string
  getValue: (path: string) => unknown
  updateField: (path: string, value: unknown) => void
}

// ============================================
// Leaf field types
// ============================================

interface UIFieldBase {
  name: string
  label: string
  defaultValue?: unknown
  width?: string
  description?: string
}

export interface UIColorField extends UIFieldBase {
  type: 'color'
  defaultValue?: string
}

export interface UISizeField extends UIFieldBase {
  type: 'size'
  defaultValue?: string
  min?: number
  max?: number
  step?: number
  unit?: string
}

export interface UITextField extends UIFieldBase {
  type: 'text'
  defaultValue?: string
  placeholder?: string
}

export interface UISelectField extends UIFieldBase {
  type: 'select'
  defaultValue?: string
  options: { label: string; value: string }[]
}

export interface UICheckboxField extends UIFieldBase {
  type: 'checkbox'
  defaultValue?: boolean
}

export interface UINumberField extends UIFieldBase {
  type: 'number'
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  unit?: string
}

export interface UIAssetField extends UIFieldBase {
  type: 'asset'
  defaultValue?: string
  collection?: string
}

export interface UIOpacityField extends UIFieldBase {
  type: 'opacity'
  defaultValue?: number
  min?: number
  max?: number
  step?: number
}

export type UILeafField =
  | UIColorField
  | UISizeField
  | UITextField
  | UISelectField
  | UICheckboxField
  | UINumberField
  | UIAssetField
  | UIOpacityField

// ============================================
// Layout / container types
// ============================================

export interface UIRow {
  type: 'row'
  fields: UISchemaNode[]
}

export interface UIGroup {
  type: 'group'
  name: string
  label: string
  fields: UISchemaNode[]
  defaultOpen?: boolean
}

export interface UICollapsible {
  type: 'collapsible'
  label: string
  fields: UISchemaNode[]
  defaultOpen?: boolean
  condition?: (getValue: (path: string) => unknown) => boolean
}

export interface UIConditional {
  type: 'conditional'
  condition: (getValue: (path: string) => unknown) => boolean
  fields: UISchemaNode[]
}

export interface UICustom {
  type: 'custom'
  component: ComponentType<CustomFieldProps>
}

// ============================================
// Union of all node types
// ============================================

export type UISchemaNode =
  | UILeafField
  | UIRow
  | UIGroup
  | UICollapsible
  | UIConditional
  | UICustom

// ============================================
// Section definition
// ============================================

export interface UISectionSchema {
  title: string
  description: string
  pathPrefix: string
  fields: UISchemaNode[]
}
