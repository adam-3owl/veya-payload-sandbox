'use client'

import { useState } from 'react'
import { Plus, GripVertical, Trash2, ChevronDown, ChevronUp, Upload } from 'lucide-react'
import { TextInput } from '../fields/TextInput'
import { SelectInput } from '../fields/SelectInput'
import { getDefaultIcon } from '../icons/navigationIcons'
import type { CustomFieldProps } from '../schema/types'

const routeOptions = [
  { label: 'Home', value: 'home' },
  { label: 'Locations', value: 'locations' },
  { label: 'Menu', value: 'menu' },
  { label: 'Loyalty', value: 'loyalty' },
  { label: 'Reorder', value: 'reorder' },
  { label: 'Bag', value: 'bag' },
]

interface NavItem {
  id?: string
  label: string
  route: string
  inactiveIcon?: string | { id: string; url?: string; filename?: string } | null
  activeIcon?: string | { id: string; url?: string; filename?: string } | null
}

export function NavigationItemsEditor({ pathPrefix, getValue, updateField }: CustomFieldProps) {
  const [expandedItem, setExpandedItem] = useState<number | null>(null)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const itemsPath = `${pathPrefix}.items`
  const items = (getValue(itemsPath) as NavItem[] | undefined) ?? []

  const addItem = () => {
    const newItem: NavItem = {
      id: crypto.randomUUID(),
      label: '',
      route: 'home',
      inactiveIcon: null,
      activeIcon: null,
    }
    updateField(itemsPath, [...items, newItem])
    setExpandedItem(items.length)
  }

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    updateField(itemsPath, newItems)
    if (expandedItem === index) {
      setExpandedItem(null)
    } else if (expandedItem !== null && expandedItem > index) {
      setExpandedItem(expandedItem - 1)
    }
  }

  const updateItem = (index: number, field: keyof NavItem, value: string) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    updateField(itemsPath, newItems)
  }

  const moveItem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= items.length) return
    const newItems = [...items]
    const [removed] = newItems.splice(fromIndex, 1)
    newItems.splice(toIndex, 0, removed)
    updateField(itemsPath, newItems)
    if (expandedItem === fromIndex) {
      setExpandedItem(toIndex)
    } else if (expandedItem === toIndex) {
      setExpandedItem(fromIndex)
    }
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return
    moveItem(draggedIndex, index)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const getIconDisplay = (icon: NavItem['inactiveIcon']) => {
    if (!icon) return null
    if (typeof icon === 'object' && icon.filename) {
      return icon.filename
    }
    return 'Selected'
  }

  const getRouteLabel = (route: string) => {
    const option = routeOptions.find(opt => opt.value === route)
    return option?.label || route
  }

  const hasCustomIcon = (icon: NavItem['inactiveIcon']) => {
    return icon && typeof icon === 'object' && icon.url
  }

  const renderIconPreview = (item: NavItem, iconType: 'inactive' | 'active') => {
    const icon = iconType === 'inactive' ? item.inactiveIcon : item.activeIcon

    if (hasCustomIcon(icon)) {
      const iconObj = icon as { url: string }
      return <img src={iconObj.url} alt={`${iconType} icon`} />
    }

    const DefaultIcon = getDefaultIcon(item.route, iconType)
    if (DefaultIcon) {
      return <DefaultIcon size={24} color="#6b7280" />
    }

    return <Upload size={20} />
  }

  return (
    <div className="mas-group">
      <div className="mas-group__header" style={{ pointerEvents: 'none' }}>
        <span className="mas-group__title">Navigation Items</span>
      </div>
      <div className="mas-group__content">
        <div className="mas-nav-items">
          {items.length === 0 ? (
            <div className="mas-nav-items__empty">
              No navigation items yet. Add your first item below.
            </div>
          ) : (
            <div className="mas-nav-items__list">
              {items.map((item, index) => (
                <div
                  key={item.id || index}
                  className={`mas-nav-item ${draggedIndex === index ? 'mas-nav-item--dragging' : ''}`}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="mas-nav-item__header">
                    <div className="mas-nav-item__drag-handle">
                      <GripVertical size={16} />
                    </div>
                    <div className="mas-nav-item__icon-preview">
                      {renderIconPreview(item, 'inactive')}
                    </div>
                    <div className="mas-nav-item__summary" onClick={() => setExpandedItem(expandedItem === index ? null : index)}>
                      <span className="mas-nav-item__label">
                        {item.label || `Item ${index + 1}`}
                      </span>
                      {item.route && (
                        <span className="mas-nav-item__route">{getRouteLabel(item.route)}</span>
                      )}
                    </div>
                    <div className="mas-nav-item__actions">
                      <button
                        type="button"
                        className="mas-nav-item__action-btn"
                        onClick={() => moveItem(index, index - 1)}
                        disabled={index === 0}
                        title="Move up"
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button
                        type="button"
                        className="mas-nav-item__action-btn"
                        onClick={() => moveItem(index, index + 1)}
                        disabled={index === items.length - 1}
                        title="Move down"
                      >
                        <ChevronDown size={16} />
                      </button>
                      <button
                        type="button"
                        className="mas-nav-item__action-btn mas-nav-item__action-btn--danger"
                        onClick={() => removeItem(index)}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {expandedItem === index && (
                    <div className="mas-nav-item__content">
                      <TextInput
                        label="Navigation Label"
                        placeholder="e.g., Home, Menu, Orders"
                        value={item.label}
                        onChange={(value) => updateItem(index, 'label', value)}
                      />
                      <SelectInput
                        label="Navigation Route"
                        value={item.route}
                        onChange={(value) => updateItem(index, 'route', value)}
                        options={routeOptions}
                      />
                      <div className="mas-nav-item__icons">
                        <div className="mas-field">
                          <label className="mas-field__label">Inactive Icon</label>
                          <div className="mas-icon-upload">
                            <div className="mas-icon-upload__preview">
                              {renderIconPreview(item, 'inactive')}
                            </div>
                            <div className="mas-icon-upload__info">
                              <span className="mas-icon-upload__filename">
                                {getIconDisplay(item.inactiveIcon) || (item.route ? 'Using default' : 'Select a route first')}
                              </span>
                              <span className="mas-icon-upload__hint">
                                {hasCustomIcon(item.inactiveIcon) ? 'Custom icon' : 'Upload SVG to override'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mas-field">
                          <label className="mas-field__label">Active Icon</label>
                          <div className="mas-icon-upload">
                            <div className="mas-icon-upload__preview">
                              {renderIconPreview(item, 'active')}
                            </div>
                            <div className="mas-icon-upload__info">
                              <span className="mas-icon-upload__filename">
                                {getIconDisplay(item.activeIcon) || (item.route ? 'Using default' : 'Select a route first')}
                              </span>
                              <span className="mas-icon-upload__hint">
                                {hasCustomIcon(item.activeIcon) ? 'Custom icon' : 'Upload SVG to override'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            className="mas-nav-items__add-btn"
            onClick={addItem}
          >
            <Plus size={16} />
            Add Navigation Item
          </button>
        </div>
      </div>
    </div>
  )
}
