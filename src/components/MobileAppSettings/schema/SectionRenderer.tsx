'use client'

import type { UISectionSchema, UISchemaNode, UILeafField } from './types'
import { useMobileAppSettings } from '../MobileAppSettingsContext'
import { SectionGroup } from '../sections/SectionGroup'
import { FieldRenderer } from './FieldRenderer'

interface SectionRendererProps {
  schema: UISectionSchema
}

export function SectionRenderer({ schema }: SectionRendererProps) {
  const { getValue, updateField } = useMobileAppSettings()

  return (
    <div className="mas-section">
      <div className="mas-section__header">
        <h2 className="mas-section__title">{schema.title}</h2>
        <p className="mas-section__description">{schema.description}</p>
      </div>
      <NodeList nodes={schema.fields} pathPrefix={schema.pathPrefix} getValue={getValue} updateField={updateField} />
    </div>
  )
}

// ============================================
// Internal recursive renderer
// ============================================

interface NodeListProps {
  nodes: UISchemaNode[]
  pathPrefix: string
  getValue: (path: string) => unknown
  updateField: (path: string, value: unknown) => void
}

function NodeList({ nodes, pathPrefix, getValue, updateField }: NodeListProps) {
  return (
    <>
      {nodes.map((node, i) => (
        <NodeRenderer key={i} node={node} pathPrefix={pathPrefix} getValue={getValue} updateField={updateField} />
      ))}
    </>
  )
}

interface NodeRendererProps {
  node: UISchemaNode
  pathPrefix: string
  getValue: (path: string) => unknown
  updateField: (path: string, value: unknown) => void
}

function NodeRenderer({ node, pathPrefix, getValue, updateField }: NodeRendererProps) {
  switch (node.type) {
    // Layout: row — side-by-side fields, no path change
    case 'row':
      return (
        <div className="mas-field-row">
          <NodeList nodes={node.fields} pathPrefix={pathPrefix} getValue={getValue} updateField={updateField} />
        </div>
      )

    // Layout: group — named nested group, appends name to path
    case 'group': {
      const groupPath = `${pathPrefix}.${node.name}`
      return (
        <SectionGroup title={node.label} defaultOpen={node.defaultOpen}>
          <NodeList nodes={node.fields} pathPrefix={groupPath} getValue={getValue} updateField={updateField} />
        </SectionGroup>
      )
    }

    // Layout: collapsible — visual grouping, NO path change, optional condition
    case 'collapsible': {
      if (node.condition && !node.condition(getValue)) {
        return null
      }
      return (
        <SectionGroup title={node.label} defaultOpen={node.defaultOpen}>
          <NodeList nodes={node.fields} pathPrefix={pathPrefix} getValue={getValue} updateField={updateField} />
        </SectionGroup>
      )
    }

    // Layout: conditional — invisible show/hide, NO path change
    case 'conditional': {
      if (!node.condition(getValue)) {
        return null
      }
      return (
        <NodeList nodes={node.fields} pathPrefix={pathPrefix} getValue={getValue} updateField={updateField} />
      )
    }

    // Escape hatch: render a custom component
    case 'custom': {
      const CustomComponent = node.component
      return <CustomComponent pathPrefix={pathPrefix} getValue={getValue} updateField={updateField} />
    }

    // Leaf fields
    default: {
      const field = node as UILeafField
      const fieldPath = `${pathPrefix}.${field.name}`
      return (
        <FieldRenderer
          field={field}
          value={getValue(fieldPath)}
          onChange={(value) => updateField(fieldPath, value)}
        />
      )
    }
  }
}
