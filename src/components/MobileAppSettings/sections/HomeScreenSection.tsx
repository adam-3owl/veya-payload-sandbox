'use client'

import { useState, useCallback, useMemo } from 'react'
import { GripVertical, Trash2, ChevronDown, ChevronUp, Image, Type, ShoppingBag, Grid3X3, FileText, Gift, Eye, EyeOff, Copy, Plus } from 'lucide-react'
import { useMobileAppSettings } from '../MobileAppSettingsContext'
import { TextInput } from '../fields/TextInput'
import { SelectInput } from '../fields/SelectInput'
import { ImageUpload } from '../fields/ImageUpload'
import { NumberInput } from '../fields/NumberInput'
import { ColorPicker } from '../../shared/fields'
import type { TabType, ContentBlock, FullScreenImageConfig, TextWithCTAConfig, OrderAgainConfig, MenuCategoriesConfig, MenuCategoryItem, BlockType } from '../types'

const blockTypes = [
  { value: 'full-screen-image', label: 'Full Screen Image', icon: Image, customerOnly: false },
  { value: 'text-with-cta', label: 'Text with CTA', icon: Type, customerOnly: false },
  { value: 'order-again', label: 'Order Again', icon: ShoppingBag, customerOnly: true },
  { value: 'menu-categories', label: 'Menu Categories', icon: Grid3X3, customerOnly: false },
  { value: 'image-with-text', label: 'Image with Text Content', icon: FileText, customerOnly: false },
  { value: 'rewards-indicator', label: 'Rewards Indicator', icon: Gift, customerOnly: false },
]

// Font size options from theme
const displayFontSizes = [
  { label: 'Display XXL', value: 'display-xxl' },
  { label: 'Display XL', value: 'display-xl' },
  { label: 'Display Large', value: 'display-lg' },
  { label: 'Display Medium', value: 'display-md' },
  { label: 'Display Small', value: 'display-sm' },
]

const headlineFontSizes = [
  { label: 'Headline XXL', value: 'headline-xxl' },
  { label: 'Headline XL', value: 'headline-xl' },
  { label: 'Headline Large', value: 'headline-lg' },
  { label: 'Headline Medium', value: 'headline-md' },
  { label: 'Headline Small', value: 'headline-sm' },
  { label: 'Headline Extra Small', value: 'headline-xs' },
]

const bodyFontSizes = [
  { label: 'Body XXL', value: 'body-xxl' },
  { label: 'Body XL', value: 'body-xl' },
  { label: 'Body Large', value: 'body-lg' },
  { label: 'Body Medium', value: 'body-md' },
  { label: 'Body Small', value: 'body-sm' },
  { label: 'Body Extra Small', value: 'body-xs' },
]

const fontFamilyOptions = [
  { label: 'Font Family Headline', value: 'font-family-headline' },
  { label: 'Font Family Body', value: 'font-family-body' },
  { label: 'Font Family Accent', value: 'font-family-accent' },
  { label: 'Font Family Action', value: 'font-family-action' },
]

const ctaLayoutOptions = [
  { label: 'Stacked', value: 'stacked' },
  { label: 'Side by Side', value: 'side-by-side' },
]

const navigationRouteOptions = [
  { label: 'Home', value: 'home' },
  { label: 'Locations', value: 'locations' },
  { label: 'Menu', value: 'menu' },
  { label: 'Loyalty', value: 'loyalty' },
  { label: 'Reorder', value: 'reorder' },
  { label: 'Bag', value: 'bag' },
  { label: 'Account', value: 'account' },
  { label: 'Sign In', value: 'sign-in' },
  { label: 'Sign Up', value: 'sign-up' },
]

const ctaDynamicDataTypeOptions = [
  { label: 'Customer / Guest', value: 'customer-guest' },
  { label: 'Location Selected', value: 'location-selected' },
]

const overlayTypeOptions = [
  { label: 'None', value: 'none' },
  { label: 'Solid Color', value: 'solid' },
  { label: 'Gradient', value: 'gradient' },
]

const gradientTypeOptions = [
  { label: 'Linear', value: 'linear' },
  { label: 'Radial', value: 'radial' },
]

const gradientDirectionOptions = [
  { label: 'Top to Bottom', value: 'to-bottom' },
  { label: 'Bottom to Top', value: 'to-top' },
  { label: 'Left to Right', value: 'to-right' },
  { label: 'Right to Left', value: 'to-left' },
  { label: 'Top-Left to Bottom-Right', value: 'to-bottom-right' },
  { label: 'Top-Right to Bottom-Left', value: 'to-bottom-left' },
  { label: 'Bottom-Left to Top-Right', value: 'to-top-right' },
  { label: 'Bottom-Right to Top-Left', value: 'to-top-left' },
]

const menuCategoryLayoutOptions = [
  { label: 'Horizontal Scroll', value: 'horizontal-scroll' },
  { label: '2 Column', value: '2-column' },
  { label: '3 Column', value: '3-column' },
]

// API Category options (will be populated by Veya Ordering API)
const apiCategoryOptions = [
  { label: 'Select a category...', value: '' },
  { label: 'Appetizers', value: 'appetizers' },
  { label: 'Entrees', value: 'entrees' },
  { label: 'Salads', value: 'salads' },
  { label: 'Sandwiches', value: 'sandwiches' },
  { label: 'Burgers', value: 'burgers' },
  { label: 'Pizza', value: 'pizza' },
  { label: 'Pasta', value: 'pasta' },
  { label: 'Seafood', value: 'seafood' },
  { label: 'Sides', value: 'sides' },
  { label: 'Desserts', value: 'desserts' },
  { label: 'Beverages', value: 'beverages' },
  { label: 'Kids Menu', value: 'kids-menu' },
  { label: 'Specials', value: 'specials' },
]


export function HomeScreenSection() {
  const { getValue, updateField } = useMobileAppSettings()
  const [activeTab, setActiveTab] = useState<TabType>('guest')
  const [expandedItem, setExpandedItem] = useState<number | null>(null)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  // Memoized derived values
  const fieldPath = useMemo(
    () => activeTab === 'guest' ? 'homeScreen.guestSections' : 'homeScreen.customerSections',
    [activeTab]
  )
  const sections = useMemo(
    () => (getValue(fieldPath) as ContentBlock[] | undefined) ?? [],
    [getValue, fieldPath]
  )

  // Memoized callbacks
  const addSection = useCallback((blockType: string) => {
    const blockInfo = blockTypes.find(b => b.value === blockType)
    const newSection: ContentBlock = {
      id: crypto.randomUUID(),
      blockType: blockType as BlockType,
      title: blockInfo?.label || '',
      enabled: true,
    }
    updateField(fieldPath, [...sections, newSection])
    setExpandedItem(sections.length)
  }, [updateField, fieldPath, sections])

  const removeSection = useCallback((index: number) => {
    const newSections = sections.filter((_, i) => i !== index)
    updateField(fieldPath, newSections)
    setExpandedItem(prev => {
      if (prev === index) return null
      if (prev !== null && prev > index) return prev - 1
      return prev
    })
  }, [sections, updateField, fieldPath])

  const updateSection = useCallback((index: number, field: keyof ContentBlock, value: unknown) => {
    const newSections = [...sections]
    newSections[index] = { ...newSections[index], [field]: value }
    updateField(fieldPath, newSections)
  }, [sections, updateField, fieldPath])

  const updateSectionConfig = useCallback((index: number, configPath: string, value: unknown) => {
    const newSections = [...sections]
    const section = { ...newSections[index] }
    const config = { ...(section.config || {}) } as Record<string, unknown>

    // Handle nested paths like 'eyebrow.fontColor' or 'overlay.guest.type'
    const keys = configPath.split('.')
    if (keys.length === 1) {
      config[keys[0]] = value
    } else if (keys.length === 2) {
      const [group, field] = keys
      config[group] = { ...(config[group] as Record<string, unknown> || {}), [field]: value }
    } else if (keys.length === 3) {
      const [group, subgroup, field] = keys
      const groupObj = { ...(config[group] as Record<string, unknown> || {}) }
      groupObj[subgroup] = { ...(groupObj[subgroup] as Record<string, unknown> || {}), [field]: value }
      config[group] = groupObj
    }

    section.config = config as FullScreenImageConfig
    newSections[index] = section
    updateField(fieldPath, newSections)
  }, [sections, updateField, fieldPath])

  const getSectionConfigValue = useCallback((index: number, configPath: string, defaultValue: string): string => {
    const section = sections[index]
    if (!section?.config) return defaultValue

    const keys = configPath.split('.')
    let current: unknown = section.config
    for (const key of keys) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return defaultValue
      }
      current = (current as Record<string, unknown>)[key]
    }
    return (current as string) ?? defaultValue
  }, [sections])

  const getSectionConfigNumber = useCallback((index: number, configPath: string, defaultValue: number): number => {
    const section = sections[index]
    if (!section?.config) return defaultValue

    const keys = configPath.split('.')
    let current: unknown = section.config
    for (const key of keys) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return defaultValue
      }
      current = (current as Record<string, unknown>)[key]
    }
    return typeof current === 'number' ? current : defaultValue
  }, [sections])

  const copyToCustomerTab = useCallback((index: number) => {
    if (activeTab !== 'guest') return

    const guestSection = sections[index]
    if (!guestSection) return

    // Get customer sections
    const customerSections = (getValue('homeScreen.customerSections') as ContentBlock[] | undefined) ?? []

    // Create a copy of the section for customer tab
    const copiedSection: ContentBlock = {
      ...guestSection,
      id: crypto.randomUUID(),
    }

    // Add to customer sections
    updateField('homeScreen.customerSections', [...customerSections, copiedSection])

    alert('Section copied to Customer tab!')
  }, [activeTab, sections, getValue, updateField])

  const moveSection = useCallback((fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= sections.length) return
    const newSections = [...sections]
    const [removed] = newSections.splice(fromIndex, 1)
    newSections.splice(toIndex, 0, removed)
    updateField(fieldPath, newSections)
    setExpandedItem(prev => {
      if (prev === fromIndex) return toIndex
      if (prev === toIndex) return fromIndex
      return prev
    })
  }, [sections, updateField, fieldPath])

  const toggleEnabled = useCallback((index: number) => {
    const newSections = [...sections]
    newSections[index] = { ...newSections[index], enabled: !newSections[index].enabled }
    updateField(fieldPath, newSections)
  }, [sections, updateField, fieldPath])

  const handleDragStart = useCallback((index: number) => {
    setDraggedIndex(index)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault()
    setDraggedIndex(prev => {
      if (prev === null || prev === index) return prev
      moveSection(prev, index)
      return index
    })
  }, [moveSection])

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null)
  }, [])

  const getBlockInfo = useCallback((blockType: string) => {
    return blockTypes.find(b => b.value === blockType)
  }, [])

  // Conveyance settings should only show on the first section (or if there's only one section)
  const shouldShowConveyance = useCallback((index: number) => {
    return index === 0 || sections.length === 1
  }, [sections.length])

  // Get menu categories for a section, initializing with empty array if not set
  const getMenuCategories = useCallback((index: number): MenuCategoryItem[] => {
    const section = sections[index]
    const categories = (section?.config as MenuCategoriesConfig)?.categories
    return categories || []
  }, [sections])

  // Update a specific category in the menu categories array
  const updateMenuCategory = useCallback((sectionIndex: number, categoryIndex: number, field: keyof MenuCategoryItem, value: string) => {
    const categories = [...getMenuCategories(sectionIndex)]
    categories[categoryIndex] = { ...categories[categoryIndex], [field]: value }
    updateSectionConfig(sectionIndex, 'categories', categories)
  }, [getMenuCategories, updateSectionConfig])

  // Add a new menu category
  const addMenuCategory = useCallback((sectionIndex: number) => {
    const categories = [...getMenuCategories(sectionIndex)]
    const newCategory: MenuCategoryItem = {
      id: crypto.randomUUID(),
      titleOverride: '',
      image: '',
    }
    updateSectionConfig(sectionIndex, 'categories', [...categories, newCategory])
  }, [getMenuCategories, updateSectionConfig])

  // Remove a menu category
  const removeMenuCategory = useCallback((sectionIndex: number, categoryIndex: number) => {
    const categories = [...getMenuCategories(sectionIndex)]
    categories.splice(categoryIndex, 1)
    updateSectionConfig(sectionIndex, 'categories', categories)
  }, [getMenuCategories, updateSectionConfig])

  // Move a menu category (reorder)
  const moveMenuCategory = useCallback((sectionIndex: number, fromIndex: number, toIndex: number) => {
    if (toIndex < 0) return
    const categories = [...getMenuCategories(sectionIndex)]
    if (toIndex >= categories.length) return
    const [removed] = categories.splice(fromIndex, 1)
    categories.splice(toIndex, 0, removed)
    updateSectionConfig(sectionIndex, 'categories', categories)
  }, [getMenuCategories, updateSectionConfig])

  return (
    <div className="mas-section">
      <div className="mas-section__header">
        <h2 className="mas-section__title">Home Screen</h2>
        <p className="mas-section__description">
          Build the home screen layout for guest and logged-in customers
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="mas-tabs">
        <button
          type="button"
          className={`mas-tabs__tab ${activeTab === 'guest' ? 'mas-tabs__tab--active' : ''}`}
          onClick={() => { setActiveTab('guest'); setExpandedItem(null); }}
        >
          Guest
        </button>
        <button
          type="button"
          className={`mas-tabs__tab ${activeTab === 'customer' ? 'mas-tabs__tab--active' : ''}`}
          onClick={() => { setActiveTab('customer'); setExpandedItem(null); }}
        >
          Customer
        </button>
      </div>

      {/* Page Builder */}
      <div className="mas-page-builder">
        <div className="mas-page-builder__header">
          <span className="mas-page-builder__title">
            {activeTab === 'guest' ? 'Guest Screen Sections' : 'Customer Screen Sections'}
          </span>
          <span className="mas-page-builder__count">
            {sections.length} {sections.length === 1 ? 'section' : 'sections'}
          </span>
        </div>

        {sections.length === 0 ? (
          <div className="mas-page-builder__empty">
            <p>No sections added yet.</p>
            <p>Add content blocks to build your {activeTab} home screen.</p>
          </div>
        ) : (
          <div className="mas-page-builder__list">
            {sections.map((section, index) => {
              const blockInfo = getBlockInfo(section.blockType)
              const BlockIcon = blockInfo?.icon || FileText

              return (
                <div
                  key={section.id || index}
                  className={`mas-content-block ${draggedIndex === index ? 'mas-content-block--dragging' : ''} ${!section.enabled ? 'mas-content-block--disabled' : ''}`}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="mas-content-block__header">
                    <div className="mas-content-block__drag-handle">
                      <GripVertical size={16} />
                    </div>
                    <div className="mas-content-block__icon">
                      <BlockIcon size={18} />
                    </div>
                    <div
                      className="mas-content-block__summary"
                      onClick={() => setExpandedItem(expandedItem === index ? null : index)}
                    >
                      <span className="mas-content-block__type">
                        {blockInfo?.label || section.blockType}
                      </span>
                      {section.title && section.title !== blockInfo?.label && (
                        <span className="mas-content-block__title">{section.title}</span>
                      )}
                    </div>
                    <div className="mas-content-block__actions">
                      <button
                        type="button"
                        className="mas-content-block__action-btn"
                        onClick={() => toggleEnabled(index)}
                        title={section.enabled ? 'Disable section' : 'Enable section'}
                      >
                        {section.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      {activeTab === 'guest' && (
                        <button
                          type="button"
                          className="mas-content-block__action-btn mas-content-block__action-btn--copy"
                          onClick={() => copyToCustomerTab(index)}
                          title="Copy to Customer Tab"
                        >
                          <Copy size={16} />
                        </button>
                      )}
                      <button
                        type="button"
                        className="mas-content-block__action-btn"
                        onClick={() => moveSection(index, index - 1)}
                        disabled={index === 0}
                        title="Move up"
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button
                        type="button"
                        className="mas-content-block__action-btn"
                        onClick={() => moveSection(index, index + 1)}
                        disabled={index === sections.length - 1}
                        title="Move down"
                      >
                        <ChevronDown size={16} />
                      </button>
                      <button
                        type="button"
                        className="mas-content-block__action-btn mas-content-block__action-btn--danger"
                        onClick={() => removeSection(index)}
                        title="Remove section"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {expandedItem === index && (
                    <div className="mas-content-block__content">
                      <SelectInput
                        label="Block Type"
                        value={section.blockType}
                        onChange={(value) => updateSection(index, 'blockType', value)}
                        options={blockTypes.map(b => ({ label: b.label, value: b.value }))}
                      />
                      <TextInput
                        label="Section Title (Optional)"
                        placeholder="Custom title for this section"
                        value={section.title || ''}
                        onChange={(value) => updateSection(index, 'title', value)}
                      />

                      {/* Full Screen Image Configuration */}
                      {section.blockType === 'full-screen-image' && (
                        <div className="mas-block-config">
                          {/* Background Image */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Background Image</h4>
                            <div className="mas-block-config__fields">
                              {activeTab === 'guest' && (
                                <ImageUpload
                                  label="Guest Background Image"
                                  value={getSectionConfigValue(index, 'backgroundImage.guestImageUrl', '')}
                                  onChange={(value) => updateSectionConfig(index, 'backgroundImage.guestImageUrl', value)}
                                />
                              )}
                              {activeTab === 'customer' && (
                                <ImageUpload
                                  label="Customer Background Image"
                                  value={getSectionConfigValue(index, 'backgroundImage.customerImageUrl', '')}
                                  onChange={(value) => updateSectionConfig(index, 'backgroundImage.customerImageUrl', value)}
                                />
                              )}
                            </div>
                          </div>

                          {/* Image Overlay */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Image Overlay</h4>
                            <div className="mas-block-config__fields">
                              <SelectInput
                                label="Overlay Type"
                                value={getSectionConfigValue(index, `overlay.${activeTab}.type`, 'none')}
                                onChange={(value) => updateSectionConfig(index, `overlay.${activeTab}.type`, value)}
                                options={overlayTypeOptions}
                              />

                              {/* Solid Color Overlay */}
                              {getSectionConfigValue(index, `overlay.${activeTab}.type`, 'none') === 'solid' && (
                                <div className="mas-block-config__conditional">
                                  <ColorPicker
                                    label="Overlay Color"
                                    value={getSectionConfigValue(index, `overlay.${activeTab}.color`, '#000000')}
                                    onChange={(value) => updateSectionConfig(index, `overlay.${activeTab}.color`, value)}
                                  />
                                  <NumberInput
                                    label="Opacity"
                                    value={getSectionConfigNumber(index, `overlay.${activeTab}.opacity`, 50)}
                                    onChange={(value) => updateSectionConfig(index, `overlay.${activeTab}.opacity`, value)}
                                    min={0}
                                    max={100}
                                    step={5}
                                    unit="%"
                                  />
                                </div>
                              )}

                              {/* Gradient Overlay */}
                              {getSectionConfigValue(index, `overlay.${activeTab}.type`, 'none') === 'gradient' && (
                                <div className="mas-block-config__conditional">
                                  <SelectInput
                                    label="Gradient Type"
                                    value={getSectionConfigValue(index, `overlay.${activeTab}.gradientType`, 'linear')}
                                    onChange={(value) => updateSectionConfig(index, `overlay.${activeTab}.gradientType`, value)}
                                    options={gradientTypeOptions}
                                  />
                                  <SelectInput
                                    label="Gradient Direction"
                                    value={getSectionConfigValue(index, `overlay.${activeTab}.gradientDirection`, 'to-bottom')}
                                    onChange={(value) => updateSectionConfig(index, `overlay.${activeTab}.gradientDirection`, value)}
                                    options={gradientDirectionOptions}
                                  />
                                  <div className="mas-block-config__row">
                                    <ColorPicker
                                      label="Start Color"
                                      value={getSectionConfigValue(index, `overlay.${activeTab}.gradientStartColor`, '#000000')}
                                      onChange={(value) => updateSectionConfig(index, `overlay.${activeTab}.gradientStartColor`, value)}
                                    />
                                    <NumberInput
                                      label="Start Opacity"
                                      value={getSectionConfigNumber(index, `overlay.${activeTab}.gradientStartOpacity`, 100)}
                                      onChange={(value) => updateSectionConfig(index, `overlay.${activeTab}.gradientStartOpacity`, value)}
                                      min={0}
                                      max={100}
                                      step={5}
                                      unit="%"
                                    />
                                  </div>
                                  <div className="mas-block-config__row">
                                    <ColorPicker
                                      label="End Color"
                                      value={getSectionConfigValue(index, `overlay.${activeTab}.gradientEndColor`, '#000000')}
                                      onChange={(value) => updateSectionConfig(index, `overlay.${activeTab}.gradientEndColor`, value)}
                                    />
                                    <NumberInput
                                      label="End Opacity"
                                      value={getSectionConfigNumber(index, `overlay.${activeTab}.gradientEndOpacity`, 0)}
                                      onChange={(value) => updateSectionConfig(index, `overlay.${activeTab}.gradientEndOpacity`, value)}
                                      min={0}
                                      max={100}
                                      step={5}
                                      unit="%"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Eyebrow */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Eyebrow</h4>
                            <div className="mas-block-config__fields">
                              {activeTab === 'guest' && (
                                <TextInput
                                  label="Guest Copy"
                                  placeholder="Welcome to Veya"
                                  value={getSectionConfigValue(index, 'eyebrow.guestCopy', 'Welcome to Veya')}
                                  onChange={(value) => updateSectionConfig(index, 'eyebrow.guestCopy', value)}
                                />
                              )}
                              {activeTab === 'customer' && (
                                <TextInput
                                  label="Customer Copy"
                                  placeholder="Welcome back, $FirstName$"
                                  value={getSectionConfigValue(index, 'eyebrow.customerCopy', 'Welcome back, $FirstName$')}
                                  onChange={(value) => updateSectionConfig(index, 'eyebrow.customerCopy', value)}
                                />
                              )}
                              <ColorPicker
                                label="Font Color"
                                value={getSectionConfigValue(index, 'eyebrow.fontColor', '#ffffff')}
                                onChange={(value) => updateSectionConfig(index, 'eyebrow.fontColor', value)}
                              />
                              <SelectInput
                                label="Font Size"
                                value={getSectionConfigValue(index, 'eyebrow.fontSize', 'headline-xs')}
                                onChange={(value) => updateSectionConfig(index, 'eyebrow.fontSize', value)}
                                options={[...headlineFontSizes, ...bodyFontSizes]}
                              />
                              <SelectInput
                                label="Font Family"
                                value={getSectionConfigValue(index, 'eyebrow.fontFamily', 'font-family-headline')}
                                onChange={(value) => updateSectionConfig(index, 'eyebrow.fontFamily', value)}
                                options={fontFamilyOptions}
                              />
                            </div>
                          </div>

                          {/* Headline */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Headline</h4>
                            <div className="mas-block-config__fields">
                              {activeTab === 'guest' && (
                                <TextInput
                                  label="Guest Copy"
                                  placeholder="Turn cravings into favorites."
                                  value={getSectionConfigValue(index, 'headline.guestCopy', 'Turn cravings into favorites.')}
                                  onChange={(value) => updateSectionConfig(index, 'headline.guestCopy', value)}
                                />
                              )}
                              {activeTab === 'customer' && (
                                <TextInput
                                  label="Customer Copy"
                                  placeholder="Your favorites are waiting."
                                  value={getSectionConfigValue(index, 'headline.customerCopy', 'Your favorites are waiting.')}
                                  onChange={(value) => updateSectionConfig(index, 'headline.customerCopy', value)}
                                />
                              )}
                              <ColorPicker
                                label="Font Color"
                                value={getSectionConfigValue(index, 'headline.fontColor', '#ffffff')}
                                onChange={(value) => updateSectionConfig(index, 'headline.fontColor', value)}
                              />
                              <SelectInput
                                label="Font Size"
                                value={getSectionConfigValue(index, 'headline.fontSize', 'display-sm')}
                                onChange={(value) => updateSectionConfig(index, 'headline.fontSize', value)}
                                options={[...displayFontSizes, ...headlineFontSizes]}
                              />
                              <SelectInput
                                label="Font Family"
                                value={getSectionConfigValue(index, 'headline.fontFamily', 'font-family-headline')}
                                onChange={(value) => updateSectionConfig(index, 'headline.fontFamily', value)}
                                options={fontFamilyOptions}
                              />
                            </div>
                          </div>

                          {/* Body */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Body</h4>
                            <div className="mas-block-config__fields">
                              {activeTab === 'guest' && (
                                <TextInput
                                  label="Guest Copy"
                                  placeholder="Log in or sign up to earn rewards..."
                                  value={getSectionConfigValue(index, 'body.guestCopy', 'Log in or sign up to earn rewards, save favorites, and order faster every time.')}
                                  onChange={(value) => updateSectionConfig(index, 'body.guestCopy', value)}
                                />
                              )}
                              {activeTab === 'customer' && (
                                <TextInput
                                  label="Customer Copy"
                                  placeholder="Optional customer body text"
                                  value={getSectionConfigValue(index, 'body.customerCopy', '')}
                                  onChange={(value) => updateSectionConfig(index, 'body.customerCopy', value)}
                                />
                              )}
                            </div>
                          </div>

                          {/* CTA Primary */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">CTA Primary</h4>
                            <div className="mas-block-config__fields">
                              <SelectInput
                                label="Dynamic Data Type"
                                value={getSectionConfigValue(index, 'ctaPrimary.dynamicDataType', 'customer-guest')}
                                onChange={(value) => updateSectionConfig(index, 'ctaPrimary.dynamicDataType', value)}
                                options={ctaDynamicDataTypeOptions}
                              />

                              {/* Customer/Guest Mode Fields */}
                              {getSectionConfigValue(index, 'ctaPrimary.dynamicDataType', 'customer-guest') === 'customer-guest' && (
                                <>
                                  {activeTab === 'guest' && (
                                    <SelectInput
                                      label="Guest Navigation Route"
                                      value={getSectionConfigValue(index, 'ctaPrimary.guestRoute', 'sign-in')}
                                      onChange={(value) => updateSectionConfig(index, 'ctaPrimary.guestRoute', value)}
                                      options={navigationRouteOptions}
                                    />
                                  )}
                                  {activeTab === 'customer' && (
                                    <SelectInput
                                      label="Customer Navigation Route"
                                      value={getSectionConfigValue(index, 'ctaPrimary.customerRoute', 'loyalty')}
                                      onChange={(value) => updateSectionConfig(index, 'ctaPrimary.customerRoute', value)}
                                      options={navigationRouteOptions}
                                    />
                                  )}
                                  <TextInput
                                    label="Location Not Selected Copy"
                                    placeholder="Find Locations"
                                    value={getSectionConfigValue(index, 'ctaPrimary.locationNotSelectedCopy', 'Find Locations')}
                                    onChange={(value) => updateSectionConfig(index, 'ctaPrimary.locationNotSelectedCopy', value)}
                                  />
                                  <TextInput
                                    label="Location Selected Copy"
                                    placeholder="Available Rewards"
                                    value={getSectionConfigValue(index, 'ctaPrimary.locationSelectedCopy', 'Available Rewards')}
                                    onChange={(value) => updateSectionConfig(index, 'ctaPrimary.locationSelectedCopy', value)}
                                  />
                                </>
                              )}

                              {/* Location Selected Mode Fields */}
                              {getSectionConfigValue(index, 'ctaPrimary.dynamicDataType', 'customer-guest') === 'location-selected' && (
                                <>
                                  <SelectInput
                                    label="Location Not Selected Route"
                                    value={getSectionConfigValue(index, 'ctaPrimary.locationNotSelectedRoute', 'locations')}
                                    onChange={(value) => updateSectionConfig(index, 'ctaPrimary.locationNotSelectedRoute', value)}
                                    options={navigationRouteOptions}
                                  />
                                  <SelectInput
                                    label="Location Selected Route"
                                    value={getSectionConfigValue(index, 'ctaPrimary.locationSelectedRoute', 'menu')}
                                    onChange={(value) => updateSectionConfig(index, 'ctaPrimary.locationSelectedRoute', value)}
                                    options={navigationRouteOptions}
                                  />
                                  <TextInput
                                    label="Location Not Selected Copy"
                                    placeholder="Order Now"
                                    value={getSectionConfigValue(index, 'ctaPrimary.locationNotSelectedCopy', 'Order Now')}
                                    onChange={(value) => updateSectionConfig(index, 'ctaPrimary.locationNotSelectedCopy', value)}
                                  />
                                  <TextInput
                                    label="Location Selected Copy"
                                    placeholder="$ConveyanceType$ | $LocationName$ ($MakeTime$)"
                                    value={getSectionConfigValue(index, 'ctaPrimary.locationSelectedCopy', '$ConveyanceType$ | $LocationName$ ($MakeTime$)')}
                                    onChange={(value) => updateSectionConfig(index, 'ctaPrimary.locationSelectedCopy', value)}
                                  />
                                </>
                              )}

                              <ColorPicker
                                label="Background Color"
                                value={getSectionConfigValue(index, 'ctaPrimary.backgroundColor', '#000000')}
                                onChange={(value) => updateSectionConfig(index, 'ctaPrimary.backgroundColor', value)}
                              />
                              <ColorPicker
                                label="Font Color"
                                value={getSectionConfigValue(index, 'ctaPrimary.fontColor', '#ffffff')}
                                onChange={(value) => updateSectionConfig(index, 'ctaPrimary.fontColor', value)}
                              />
                            </div>
                          </div>

                          {/* CTA Secondary */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">CTA Secondary</h4>
                            <div className="mas-block-config__fields">
                              <ColorPicker
                                label="Background Color"
                                value={getSectionConfigValue(index, 'ctaSecondary.backgroundColor', '#ffffff')}
                                onChange={(value) => updateSectionConfig(index, 'ctaSecondary.backgroundColor', value)}
                              />
                              <ColorPicker
                                label="Font Color"
                                value={getSectionConfigValue(index, 'ctaSecondary.fontColor', '#000000')}
                                onChange={(value) => updateSectionConfig(index, 'ctaSecondary.fontColor', value)}
                              />
                            </div>
                          </div>

                          {/* CTA Layout */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">CTA Layout</h4>
                            <div className="mas-block-config__fields">
                              <SelectInput
                                label="Layout"
                                value={getSectionConfigValue(index, 'ctaLayout', 'stacked')}
                                onChange={(value) => updateSectionConfig(index, 'ctaLayout', value)}
                                options={ctaLayoutOptions}
                              />
                            </div>
                          </div>

                          {/* Conveyance, Account Icon, Message Icon - Only shows on first section */}
                          {shouldShowConveyance(index) && (
                            <>
                              <div className="mas-block-config__group">
                                <h4 className="mas-block-config__group-title">Conveyance</h4>
                                <div className="mas-block-config__fields">
                                  <SelectInput
                                    label="Font Family"
                                    value={getSectionConfigValue(index, 'conveyance.fontFamily', 'font-family-body')}
                                    onChange={(value) => updateSectionConfig(index, 'conveyance.fontFamily', value)}
                                    options={fontFamilyOptions}
                                  />
                                  <ColorPicker
                                    label="Font Color"
                                    value={getSectionConfigValue(index, 'conveyance.fontColor', '#ffffff')}
                                    onChange={(value) => updateSectionConfig(index, 'conveyance.fontColor', value)}
                                  />
                                </div>
                              </div>

                              <div className="mas-block-config__group">
                                <h4 className="mas-block-config__group-title">Account Icon</h4>
                                <div className="mas-block-config__fields">
                                  <ColorPicker
                                    label="Background Color"
                                    value={getSectionConfigValue(index, 'accountIcon.backgroundColor', '#000000')}
                                    onChange={(value) => updateSectionConfig(index, 'accountIcon.backgroundColor', value)}
                                  />
                                  <ColorPicker
                                    label="Font Color"
                                    value={getSectionConfigValue(index, 'accountIcon.fontColor', '#ffffff')}
                                    onChange={(value) => updateSectionConfig(index, 'accountIcon.fontColor', value)}
                                  />
                                </div>
                              </div>

                              <div className="mas-block-config__group">
                                <h4 className="mas-block-config__group-title">Message Icon</h4>
                                <div className="mas-block-config__fields">
                                  <ColorPicker
                                    label="Background Color"
                                    value={getSectionConfigValue(index, 'messageIcon.backgroundColor', '#000000')}
                                    onChange={(value) => updateSectionConfig(index, 'messageIcon.backgroundColor', value)}
                                  />
                                  <ColorPicker
                                    label="Font Color"
                                    value={getSectionConfigValue(index, 'messageIcon.fontColor', '#ffffff')}
                                    onChange={(value) => updateSectionConfig(index, 'messageIcon.fontColor', value)}
                                  />
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      {/* Text with CTA Configuration - Same as Full Screen Image but without background image */}
                      {section.blockType === 'text-with-cta' && (
                        <div className="mas-block-config">
                          {/* Background Color */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Background Color</h4>
                            <div className="mas-block-config__fields">
                              {activeTab === 'guest' && (
                                <ColorPicker
                                  label="Guest Background Color"
                                  value={getSectionConfigValue(index, 'backgroundColor.guest', '#0b1f22')}
                                  onChange={(value) => updateSectionConfig(index, 'backgroundColor.guest', value)}
                                />
                              )}
                              {activeTab === 'customer' && (
                                <ColorPicker
                                  label="Customer Background Color"
                                  value={getSectionConfigValue(index, 'backgroundColor.customer', '#0b1f22')}
                                  onChange={(value) => updateSectionConfig(index, 'backgroundColor.customer', value)}
                                />
                              )}
                            </div>
                          </div>

                          {/* Overlay */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Overlay</h4>
                            <div className="mas-block-config__fields">
                              <SelectInput
                                label="Overlay Type"
                                value={getSectionConfigValue(index, `overlay.${activeTab}.type`, 'none')}
                                onChange={(value) => updateSectionConfig(index, `overlay.${activeTab}.type`, value)}
                                options={overlayTypeOptions}
                              />

                              {/* Solid Color Overlay */}
                              {getSectionConfigValue(index, `overlay.${activeTab}.type`, 'none') === 'solid' && (
                                <div className="mas-block-config__conditional">
                                  <ColorPicker
                                    label="Overlay Color"
                                    value={getSectionConfigValue(index, `overlay.${activeTab}.color`, '#000000')}
                                    onChange={(value) => updateSectionConfig(index, `overlay.${activeTab}.color`, value)}
                                  />
                                  <NumberInput
                                    label="Opacity"
                                    value={getSectionConfigNumber(index, `overlay.${activeTab}.opacity`, 50)}
                                    onChange={(value) => updateSectionConfig(index, `overlay.${activeTab}.opacity`, value)}
                                    min={0}
                                    max={100}
                                    step={5}
                                    unit="%"
                                  />
                                </div>
                              )}

                              {/* Gradient Overlay */}
                              {getSectionConfigValue(index, `overlay.${activeTab}.type`, 'none') === 'gradient' && (
                                <div className="mas-block-config__conditional">
                                  <SelectInput
                                    label="Gradient Type"
                                    value={getSectionConfigValue(index, `overlay.${activeTab}.gradientType`, 'linear')}
                                    onChange={(value) => updateSectionConfig(index, `overlay.${activeTab}.gradientType`, value)}
                                    options={gradientTypeOptions}
                                  />
                                  <SelectInput
                                    label="Gradient Direction"
                                    value={getSectionConfigValue(index, `overlay.${activeTab}.gradientDirection`, 'to-bottom')}
                                    onChange={(value) => updateSectionConfig(index, `overlay.${activeTab}.gradientDirection`, value)}
                                    options={gradientDirectionOptions}
                                  />
                                  <div className="mas-block-config__row">
                                    <ColorPicker
                                      label="Start Color"
                                      value={getSectionConfigValue(index, `overlay.${activeTab}.gradientStartColor`, '#000000')}
                                      onChange={(value) => updateSectionConfig(index, `overlay.${activeTab}.gradientStartColor`, value)}
                                    />
                                    <NumberInput
                                      label="Start Opacity"
                                      value={getSectionConfigNumber(index, `overlay.${activeTab}.gradientStartOpacity`, 100)}
                                      onChange={(value) => updateSectionConfig(index, `overlay.${activeTab}.gradientStartOpacity`, value)}
                                      min={0}
                                      max={100}
                                      step={5}
                                      unit="%"
                                    />
                                  </div>
                                  <div className="mas-block-config__row">
                                    <ColorPicker
                                      label="End Color"
                                      value={getSectionConfigValue(index, `overlay.${activeTab}.gradientEndColor`, '#000000')}
                                      onChange={(value) => updateSectionConfig(index, `overlay.${activeTab}.gradientEndColor`, value)}
                                    />
                                    <NumberInput
                                      label="End Opacity"
                                      value={getSectionConfigNumber(index, `overlay.${activeTab}.gradientEndOpacity`, 0)}
                                      onChange={(value) => updateSectionConfig(index, `overlay.${activeTab}.gradientEndOpacity`, value)}
                                      min={0}
                                      max={100}
                                      step={5}
                                      unit="%"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Eyebrow */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Eyebrow</h4>
                            <div className="mas-block-config__fields">
                              {activeTab === 'guest' && (
                                <TextInput
                                  label="Guest Copy"
                                  placeholder="Welcome to Veya"
                                  value={getSectionConfigValue(index, 'eyebrow.guestCopy', '')}
                                  onChange={(value) => updateSectionConfig(index, 'eyebrow.guestCopy', value)}
                                />
                              )}
                              {activeTab === 'customer' && (
                                <TextInput
                                  label="Customer Copy"
                                  placeholder="Welcome back, $FirstName$"
                                  value={getSectionConfigValue(index, 'eyebrow.customerCopy', '')}
                                  onChange={(value) => updateSectionConfig(index, 'eyebrow.customerCopy', value)}
                                />
                              )}
                              <ColorPicker
                                label="Font Color"
                                value={getSectionConfigValue(index, 'eyebrow.fontColor', '#ffffff')}
                                onChange={(value) => updateSectionConfig(index, 'eyebrow.fontColor', value)}
                              />
                              <SelectInput
                                label="Font Size"
                                value={getSectionConfigValue(index, 'eyebrow.fontSize', 'headline-xs')}
                                onChange={(value) => updateSectionConfig(index, 'eyebrow.fontSize', value)}
                                options={[...headlineFontSizes, ...bodyFontSizes]}
                              />
                              <SelectInput
                                label="Font Family"
                                value={getSectionConfigValue(index, 'eyebrow.fontFamily', 'font-family-headline')}
                                onChange={(value) => updateSectionConfig(index, 'eyebrow.fontFamily', value)}
                                options={fontFamilyOptions}
                              />
                            </div>
                          </div>

                          {/* Headline */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Headline</h4>
                            <div className="mas-block-config__fields">
                              {activeTab === 'guest' && (
                                <TextInput
                                  label="Guest Copy"
                                  placeholder="Turn cravings into favorites."
                                  value={getSectionConfigValue(index, 'headline.guestCopy', '')}
                                  onChange={(value) => updateSectionConfig(index, 'headline.guestCopy', value)}
                                />
                              )}
                              {activeTab === 'customer' && (
                                <TextInput
                                  label="Customer Copy"
                                  placeholder="Your favorites are waiting."
                                  value={getSectionConfigValue(index, 'headline.customerCopy', '')}
                                  onChange={(value) => updateSectionConfig(index, 'headline.customerCopy', value)}
                                />
                              )}
                              <ColorPicker
                                label="Font Color"
                                value={getSectionConfigValue(index, 'headline.fontColor', '#ffffff')}
                                onChange={(value) => updateSectionConfig(index, 'headline.fontColor', value)}
                              />
                              <SelectInput
                                label="Font Size"
                                value={getSectionConfigValue(index, 'headline.fontSize', 'display-sm')}
                                onChange={(value) => updateSectionConfig(index, 'headline.fontSize', value)}
                                options={[...displayFontSizes, ...headlineFontSizes]}
                              />
                              <SelectInput
                                label="Font Family"
                                value={getSectionConfigValue(index, 'headline.fontFamily', 'font-family-headline')}
                                onChange={(value) => updateSectionConfig(index, 'headline.fontFamily', value)}
                                options={fontFamilyOptions}
                              />
                            </div>
                          </div>

                          {/* Body */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Body</h4>
                            <div className="mas-block-config__fields">
                              {activeTab === 'guest' && (
                                <TextInput
                                  label="Guest Copy"
                                  placeholder="Log in or sign up to earn rewards..."
                                  value={getSectionConfigValue(index, 'body.guestCopy', '')}
                                  onChange={(value) => updateSectionConfig(index, 'body.guestCopy', value)}
                                />
                              )}
                              {activeTab === 'customer' && (
                                <TextInput
                                  label="Customer Copy"
                                  placeholder="Optional customer body text"
                                  value={getSectionConfigValue(index, 'body.customerCopy', '')}
                                  onChange={(value) => updateSectionConfig(index, 'body.customerCopy', value)}
                                />
                              )}
                            </div>
                          </div>

                          {/* CTA Primary */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">CTA Primary</h4>
                            <div className="mas-block-config__fields">
                              <SelectInput
                                label="Dynamic Data Type"
                                value={getSectionConfigValue(index, 'ctaPrimary.dynamicDataType', 'customer-guest')}
                                onChange={(value) => updateSectionConfig(index, 'ctaPrimary.dynamicDataType', value)}
                                options={ctaDynamicDataTypeOptions}
                              />

                              {/* Customer/Guest Mode Fields */}
                              {getSectionConfigValue(index, 'ctaPrimary.dynamicDataType', 'customer-guest') === 'customer-guest' && (
                                <>
                                  {activeTab === 'guest' && (
                                    <SelectInput
                                      label="Guest Navigation Route"
                                      value={getSectionConfigValue(index, 'ctaPrimary.guestRoute', 'sign-in')}
                                      onChange={(value) => updateSectionConfig(index, 'ctaPrimary.guestRoute', value)}
                                      options={navigationRouteOptions}
                                    />
                                  )}
                                  {activeTab === 'customer' && (
                                    <SelectInput
                                      label="Customer Navigation Route"
                                      value={getSectionConfigValue(index, 'ctaPrimary.customerRoute', 'loyalty')}
                                      onChange={(value) => updateSectionConfig(index, 'ctaPrimary.customerRoute', value)}
                                      options={navigationRouteOptions}
                                    />
                                  )}
                                  <TextInput
                                    label="Location Not Selected Copy"
                                    placeholder="Find Locations"
                                    value={getSectionConfigValue(index, 'ctaPrimary.locationNotSelectedCopy', 'Find Locations')}
                                    onChange={(value) => updateSectionConfig(index, 'ctaPrimary.locationNotSelectedCopy', value)}
                                  />
                                  <TextInput
                                    label="Location Selected Copy"
                                    placeholder="Available Rewards"
                                    value={getSectionConfigValue(index, 'ctaPrimary.locationSelectedCopy', 'Available Rewards')}
                                    onChange={(value) => updateSectionConfig(index, 'ctaPrimary.locationSelectedCopy', value)}
                                  />
                                </>
                              )}

                              {/* Location Selected Mode Fields */}
                              {getSectionConfigValue(index, 'ctaPrimary.dynamicDataType', 'customer-guest') === 'location-selected' && (
                                <>
                                  <SelectInput
                                    label="Location Not Selected Route"
                                    value={getSectionConfigValue(index, 'ctaPrimary.locationNotSelectedRoute', 'locations')}
                                    onChange={(value) => updateSectionConfig(index, 'ctaPrimary.locationNotSelectedRoute', value)}
                                    options={navigationRouteOptions}
                                  />
                                  <SelectInput
                                    label="Location Selected Route"
                                    value={getSectionConfigValue(index, 'ctaPrimary.locationSelectedRoute', 'menu')}
                                    onChange={(value) => updateSectionConfig(index, 'ctaPrimary.locationSelectedRoute', value)}
                                    options={navigationRouteOptions}
                                  />
                                  <TextInput
                                    label="Location Not Selected Copy"
                                    placeholder="Order Now"
                                    value={getSectionConfigValue(index, 'ctaPrimary.locationNotSelectedCopy', 'Order Now')}
                                    onChange={(value) => updateSectionConfig(index, 'ctaPrimary.locationNotSelectedCopy', value)}
                                  />
                                  <TextInput
                                    label="Location Selected Copy"
                                    placeholder="$ConveyanceType$ | $LocationName$ ($MakeTime$)"
                                    value={getSectionConfigValue(index, 'ctaPrimary.locationSelectedCopy', '$ConveyanceType$ | $LocationName$ ($MakeTime$)')}
                                    onChange={(value) => updateSectionConfig(index, 'ctaPrimary.locationSelectedCopy', value)}
                                  />
                                </>
                              )}

                              <ColorPicker
                                label="Background Color"
                                value={getSectionConfigValue(index, 'ctaPrimary.backgroundColor', '#000000')}
                                onChange={(value) => updateSectionConfig(index, 'ctaPrimary.backgroundColor', value)}
                              />
                              <ColorPicker
                                label="Font Color"
                                value={getSectionConfigValue(index, 'ctaPrimary.fontColor', '#ffffff')}
                                onChange={(value) => updateSectionConfig(index, 'ctaPrimary.fontColor', value)}
                              />
                            </div>
                          </div>

                          {/* CTA Secondary */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">CTA Secondary</h4>
                            <div className="mas-block-config__fields">
                              <ColorPicker
                                label="Background Color"
                                value={getSectionConfigValue(index, 'ctaSecondary.backgroundColor', '#ffffff')}
                                onChange={(value) => updateSectionConfig(index, 'ctaSecondary.backgroundColor', value)}
                              />
                              <ColorPicker
                                label="Font Color"
                                value={getSectionConfigValue(index, 'ctaSecondary.fontColor', '#000000')}
                                onChange={(value) => updateSectionConfig(index, 'ctaSecondary.fontColor', value)}
                              />
                            </div>
                          </div>

                          {/* CTA Layout */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">CTA Layout</h4>
                            <div className="mas-block-config__fields">
                              <SelectInput
                                label="Layout"
                                value={getSectionConfigValue(index, 'ctaLayout', 'stacked')}
                                onChange={(value) => updateSectionConfig(index, 'ctaLayout', value)}
                                options={ctaLayoutOptions}
                              />
                            </div>
                          </div>

                          {/* Conveyance, Account Icon, Message Icon - Only shows on first section */}
                          {shouldShowConveyance(index) && (
                            <>
                              <div className="mas-block-config__group">
                                <h4 className="mas-block-config__group-title">Conveyance</h4>
                                <div className="mas-block-config__fields">
                                  <SelectInput
                                    label="Font Family"
                                    value={getSectionConfigValue(index, 'conveyance.fontFamily', 'font-family-body')}
                                    onChange={(value) => updateSectionConfig(index, 'conveyance.fontFamily', value)}
                                    options={fontFamilyOptions}
                                  />
                                  <ColorPicker
                                    label="Font Color"
                                    value={getSectionConfigValue(index, 'conveyance.fontColor', '#ffffff')}
                                    onChange={(value) => updateSectionConfig(index, 'conveyance.fontColor', value)}
                                  />
                                </div>
                              </div>

                              <div className="mas-block-config__group">
                                <h4 className="mas-block-config__group-title">Account Icon</h4>
                                <div className="mas-block-config__fields">
                                  <ColorPicker
                                    label="Background Color"
                                    value={getSectionConfigValue(index, 'accountIcon.backgroundColor', '#000000')}
                                    onChange={(value) => updateSectionConfig(index, 'accountIcon.backgroundColor', value)}
                                  />
                                  <ColorPicker
                                    label="Font Color"
                                    value={getSectionConfigValue(index, 'accountIcon.fontColor', '#ffffff')}
                                    onChange={(value) => updateSectionConfig(index, 'accountIcon.fontColor', value)}
                                  />
                                </div>
                              </div>

                              <div className="mas-block-config__group">
                                <h4 className="mas-block-config__group-title">Message Icon</h4>
                                <div className="mas-block-config__fields">
                                  <ColorPicker
                                    label="Background Color"
                                    value={getSectionConfigValue(index, 'messageIcon.backgroundColor', '#000000')}
                                    onChange={(value) => updateSectionConfig(index, 'messageIcon.backgroundColor', value)}
                                  />
                                  <ColorPicker
                                    label="Font Color"
                                    value={getSectionConfigValue(index, 'messageIcon.fontColor', '#ffffff')}
                                    onChange={(value) => updateSectionConfig(index, 'messageIcon.fontColor', value)}
                                  />
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      {/* Order Again Configuration - Customer Only */}
                      {section.blockType === 'order-again' && (
                        <div className="mas-block-config">
                          {/* Headline */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Headline</h4>
                            <div className="mas-block-config__fields">
                              <ColorPicker
                                label="Font Color"
                                value={getSectionConfigValue(index, 'headline.fontColor', '#0b1f22')}
                                onChange={(value) => updateSectionConfig(index, 'headline.fontColor', value)}
                              />
                              <SelectInput
                                label="Font Size"
                                value={getSectionConfigValue(index, 'headline.fontSize', 'display-sm')}
                                onChange={(value) => updateSectionConfig(index, 'headline.fontSize', value)}
                                options={[...displayFontSizes, ...headlineFontSizes]}
                              />
                              <SelectInput
                                label="Font Family"
                                value={getSectionConfigValue(index, 'headline.fontFamily', 'font-family-headline')}
                                onChange={(value) => updateSectionConfig(index, 'headline.fontFamily', value)}
                                options={fontFamilyOptions}
                              />
                            </div>
                          </div>

                          {/* Background */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Background</h4>
                            <div className="mas-block-config__fields">
                              <ColorPicker
                                label="Background Color"
                                value={getSectionConfigValue(index, 'background.backgroundColor', '#ffffff')}
                                onChange={(value) => updateSectionConfig(index, 'background.backgroundColor', value)}
                              />
                            </div>
                          </div>

                          {/* Menu Card - Title */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Menu Card - Title</h4>
                            <div className="mas-block-config__fields">
                              <ColorPicker
                                label="Font Color"
                                value={getSectionConfigValue(index, 'menuCard.title.fontColor', '#0b1f22')}
                                onChange={(value) => updateSectionConfig(index, 'menuCard.title.fontColor', value)}
                              />
                              <SelectInput
                                label="Font Size"
                                value={getSectionConfigValue(index, 'menuCard.title.fontSize', 'headline-sm')}
                                onChange={(value) => updateSectionConfig(index, 'menuCard.title.fontSize', value)}
                                options={[...headlineFontSizes, ...bodyFontSizes]}
                              />
                              <SelectInput
                                label="Font Family"
                                value={getSectionConfigValue(index, 'menuCard.title.fontFamily', 'font-family-headline')}
                                onChange={(value) => updateSectionConfig(index, 'menuCard.title.fontFamily', value)}
                                options={fontFamilyOptions}
                              />
                            </div>
                          </div>

                          {/* Menu Card - Sub Copy */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Menu Card - Sub Copy</h4>
                            <div className="mas-block-config__fields">
                              <ColorPicker
                                label="Font Color"
                                value={getSectionConfigValue(index, 'menuCard.subCopy.fontColor', '#0b1f22')}
                                onChange={(value) => updateSectionConfig(index, 'menuCard.subCopy.fontColor', value)}
                              />
                              <SelectInput
                                label="Font Size"
                                value={getSectionConfigValue(index, 'menuCard.subCopy.fontSize', 'body-xs')}
                                onChange={(value) => updateSectionConfig(index, 'menuCard.subCopy.fontSize', value)}
                                options={bodyFontSizes}
                              />
                              <SelectInput
                                label="Font Family"
                                value={getSectionConfigValue(index, 'menuCard.subCopy.fontFamily', 'font-family-headline')}
                                onChange={(value) => updateSectionConfig(index, 'menuCard.subCopy.fontFamily', value)}
                                options={fontFamilyOptions}
                              />
                            </div>
                          </div>

                          {/* Menu Card - Background */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Menu Card - Background</h4>
                            <div className="mas-block-config__fields">
                              <ColorPicker
                                label="Background Color"
                                value={getSectionConfigValue(index, 'menuCard.background.backgroundColor', '#f9f8f4')}
                                onChange={(value) => updateSectionConfig(index, 'menuCard.background.backgroundColor', value)}
                              />
                            </div>
                          </div>

                          {/* Menu Card - Tag */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Menu Card - Tag</h4>
                            <div className="mas-block-config__fields">
                              <ColorPicker
                                label="Background Color"
                                value={getSectionConfigValue(index, 'menuCard.tag.backgroundColor', '#2fddd0')}
                                onChange={(value) => updateSectionConfig(index, 'menuCard.tag.backgroundColor', value)}
                              />
                              <ColorPicker
                                label="Font Color"
                                value={getSectionConfigValue(index, 'menuCard.tag.fontColor', '#0b1f22')}
                                onChange={(value) => updateSectionConfig(index, 'menuCard.tag.fontColor', value)}
                              />
                            </div>
                          </div>

                          {/* Additional Items - Icon */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Additional Items - Icon</h4>
                            <div className="mas-block-config__fields">
                              <ImageUpload
                                label="Icon (SVG)"
                                value={getSectionConfigValue(index, 'additionalItems.icon', '')}
                                onChange={(value) => updateSectionConfig(index, 'additionalItems.icon', value)}
                              />
                            </div>
                          </div>

                          {/* Additional Items - Text */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Additional Items - Text</h4>
                            <div className="mas-block-config__fields">
                              <TextInput
                                label="Copy"
                                placeholder="Looking for something else?"
                                value={getSectionConfigValue(index, 'additionalItems.text.copy', 'Looking for something else?')}
                                onChange={(value) => updateSectionConfig(index, 'additionalItems.text.copy', value)}
                              />
                              <ColorPicker
                                label="Font Color"
                                value={getSectionConfigValue(index, 'additionalItems.text.fontColor', '#0b1f22')}
                                onChange={(value) => updateSectionConfig(index, 'additionalItems.text.fontColor', value)}
                              />
                              <SelectInput
                                label="Font Size"
                                value={getSectionConfigValue(index, 'additionalItems.text.fontSize', 'headline-xs')}
                                onChange={(value) => updateSectionConfig(index, 'additionalItems.text.fontSize', value)}
                                options={[...headlineFontSizes, ...bodyFontSizes]}
                              />
                              <SelectInput
                                label="Font Family"
                                value={getSectionConfigValue(index, 'additionalItems.text.fontFamily', 'font-family-headline')}
                                onChange={(value) => updateSectionConfig(index, 'additionalItems.text.fontFamily', value)}
                                options={fontFamilyOptions}
                              />
                            </div>
                          </div>

                          {/* Additional Items - Button */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Additional Items - Button</h4>
                            <div className="mas-block-config__fields">
                              <ColorPicker
                                label="Background Color"
                                value={getSectionConfigValue(index, 'additionalItems.button.backgroundColor', '#0b1f22')}
                                onChange={(value) => updateSectionConfig(index, 'additionalItems.button.backgroundColor', value)}
                              />
                              <ColorPicker
                                label="Font Color"
                                value={getSectionConfigValue(index, 'additionalItems.button.fontColor', '#ffffff')}
                                onChange={(value) => updateSectionConfig(index, 'additionalItems.button.fontColor', value)}
                              />
                            </div>
                          </div>

                          {/* Conveyance, Account Icon, Message Icon - Only shows on first section */}
                          {shouldShowConveyance(index) && (
                            <>
                              <div className="mas-block-config__group">
                                <h4 className="mas-block-config__group-title">Conveyance</h4>
                                <div className="mas-block-config__fields">
                                  <SelectInput
                                    label="Font Family"
                                    value={getSectionConfigValue(index, 'conveyance.fontFamily', 'font-family-body')}
                                    onChange={(value) => updateSectionConfig(index, 'conveyance.fontFamily', value)}
                                    options={fontFamilyOptions}
                                  />
                                  <ColorPicker
                                    label="Font Color"
                                    value={getSectionConfigValue(index, 'conveyance.fontColor', '#0b1f22')}
                                    onChange={(value) => updateSectionConfig(index, 'conveyance.fontColor', value)}
                                  />
                                </div>
                              </div>

                              <div className="mas-block-config__group">
                                <h4 className="mas-block-config__group-title">Account Icon</h4>
                                <div className="mas-block-config__fields">
                                  <ColorPicker
                                    label="Background Color"
                                    value={getSectionConfigValue(index, 'accountIcon.backgroundColor', '#0b1f22')}
                                    onChange={(value) => updateSectionConfig(index, 'accountIcon.backgroundColor', value)}
                                  />
                                  <ColorPicker
                                    label="Font Color"
                                    value={getSectionConfigValue(index, 'accountIcon.fontColor', '#ffffff')}
                                    onChange={(value) => updateSectionConfig(index, 'accountIcon.fontColor', value)}
                                  />
                                </div>
                              </div>

                              <div className="mas-block-config__group">
                                <h4 className="mas-block-config__group-title">Message Icon</h4>
                                <div className="mas-block-config__fields">
                                  <ColorPicker
                                    label="Background Color"
                                    value={getSectionConfigValue(index, 'messageIcon.backgroundColor', '#0b1f22')}
                                    onChange={(value) => updateSectionConfig(index, 'messageIcon.backgroundColor', value)}
                                  />
                                  <ColorPicker
                                    label="Font Color"
                                    value={getSectionConfigValue(index, 'messageIcon.fontColor', '#ffffff')}
                                    onChange={(value) => updateSectionConfig(index, 'messageIcon.fontColor', value)}
                                  />
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      {/* Menu Categories Configuration */}
                      {section.blockType === 'menu-categories' && (
                        <div className="mas-block-config">
                          {/* Headline */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Headline</h4>
                            <div className="mas-block-config__fields">
                              <TextInput
                                label="Copy"
                                placeholder="Menu Categories"
                                value={getSectionConfigValue(index, 'headline.copy', 'Menu Categories')}
                                onChange={(value) => updateSectionConfig(index, 'headline.copy', value)}
                              />
                              <ColorPicker
                                label="Font Color"
                                value={getSectionConfigValue(index, 'headline.fontColor', '#0b1f22')}
                                onChange={(value) => updateSectionConfig(index, 'headline.fontColor', value)}
                              />
                              <SelectInput
                                label="Font Size"
                                value={getSectionConfigValue(index, 'headline.fontSize', 'display-sm')}
                                onChange={(value) => updateSectionConfig(index, 'headline.fontSize', value)}
                                options={[...displayFontSizes, ...headlineFontSizes]}
                              />
                              <SelectInput
                                label="Font Family"
                                value={getSectionConfigValue(index, 'headline.fontFamily', 'font-family-headline')}
                                onChange={(value) => updateSectionConfig(index, 'headline.fontFamily', value)}
                                options={fontFamilyOptions}
                              />
                            </div>
                          </div>

                          {/* Menu Categories List */}
                          <div className="mas-block-config__group">
                            <div className="mas-block-config__group-header">
                              <h4 className="mas-block-config__group-title">Menu Categories</h4>
                              <button
                                type="button"
                                className="mas-block-config__add-btn"
                                onClick={() => addMenuCategory(index)}
                                title="Add Category"
                              >
                                <Plus size={14} />
                                <span>Add Category</span>
                              </button>
                            </div>
                            <p className="mas-block-config__description">
                              Categories will be populated from the Veya Ordering API. Override titles and images below.
                            </p>
                            <div className="mas-block-config__categories">
                              {getMenuCategories(index).map((category, catIndex) => {
                                const categories = getMenuCategories(index)
                                const isFirst = catIndex === 0
                                const isLast = catIndex === categories.length - 1
                                const selectedCategoryLabel = apiCategoryOptions.find(opt => opt.value === category.apiCategoryId)?.label || 'Not mapped'
                                const isExpanded = expandedCategory === `${index}-${catIndex}`

                                return (
                                  <div key={category.id || catIndex} className={`mas-category-card ${isExpanded ? 'mas-category-card--expanded' : ''}`}>
                                    <div className="mas-category-card__header">
                                      <button
                                        type="button"
                                        className="mas-category-card__drag"
                                        title="Drag to reorder"
                                      >
                                        <GripVertical size={14} />
                                      </button>
                                      <button
                                        type="button"
                                        className="mas-category-card__summary"
                                        onClick={() => setExpandedCategory(isExpanded ? null : `${index}-${catIndex}`)}
                                      >
                                        <span className="mas-category-card__name">
                                          {category.titleOverride || selectedCategoryLabel}
                                        </span>
                                        {category.titleOverride && (
                                          <span className="mas-category-card__mapping">{selectedCategoryLabel}</span>
                                        )}
                                        <ChevronDown size={14} className={`mas-category-card__chevron ${isExpanded ? 'mas-category-card__chevron--open' : ''}`} />
                                      </button>
                                      <div className="mas-category-card__actions">
                                        <button
                                          type="button"
                                          className="mas-category-card__action"
                                          onClick={() => moveMenuCategory(index, catIndex, catIndex - 1)}
                                          disabled={isFirst}
                                          title="Move Up"
                                        >
                                          <ChevronUp size={14} />
                                        </button>
                                        <button
                                          type="button"
                                          className="mas-category-card__action"
                                          onClick={() => moveMenuCategory(index, catIndex, catIndex + 1)}
                                          disabled={isLast}
                                          title="Move Down"
                                        >
                                          <ChevronDown size={14} />
                                        </button>
                                        <button
                                          type="button"
                                          className="mas-category-card__action mas-category-card__action--danger"
                                          onClick={() => removeMenuCategory(index, catIndex)}
                                          title="Remove Category"
                                        >
                                          <Trash2 size={14} />
                                        </button>
                                      </div>
                                    </div>
                                    {isExpanded && (
                                      <div className="mas-category-card__content">
                                        <div className="mas-category-card__row">
                                          <SelectInput
                                            label="API Category"
                                            value={category.apiCategoryId || ''}
                                            onChange={(value) => updateMenuCategory(index, catIndex, 'apiCategoryId', value)}
                                            options={apiCategoryOptions}
                                          />
                                          <TextInput
                                            label="Title Override"
                                            placeholder="Custom display name"
                                            value={category.titleOverride || ''}
                                            onChange={(value) => updateMenuCategory(index, catIndex, 'titleOverride', value)}
                                          />
                                        </div>
                                        <ImageUpload
                                          label="Category Image"
                                          value={category.image || ''}
                                          onChange={(value) => updateMenuCategory(index, catIndex, 'image', value)}
                                        />
                                      </div>
                                    )}
                                  </div>
                                )
                              })}
                              {getMenuCategories(index).length === 0 && (
                                <div className="mas-block-config__empty">
                                  No categories added. Click &quot;Add Category&quot; to create one.
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Layout */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Layout</h4>
                            <div className="mas-block-config__fields">
                              <SelectInput
                                label="Layout Style"
                                value={getSectionConfigValue(index, 'layout', 'horizontal-scroll')}
                                onChange={(value) => updateSectionConfig(index, 'layout', value)}
                                options={menuCategoryLayoutOptions}
                              />
                            </div>
                          </div>

                          {/* Menu Card - Title */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Menu Card - Title</h4>
                            <div className="mas-block-config__fields">
                              <ColorPicker
                                label="Font Color"
                                value={getSectionConfigValue(index, 'menuCard.title.fontColor', '#0b1f22')}
                                onChange={(value) => updateSectionConfig(index, 'menuCard.title.fontColor', value)}
                              />
                              <SelectInput
                                label="Font Size"
                                value={getSectionConfigValue(index, 'menuCard.title.fontSize', 'headline-sm')}
                                onChange={(value) => updateSectionConfig(index, 'menuCard.title.fontSize', value)}
                                options={[...headlineFontSizes, ...bodyFontSizes]}
                              />
                              <SelectInput
                                label="Font Family"
                                value={getSectionConfigValue(index, 'menuCard.title.fontFamily', 'font-family-headline')}
                                onChange={(value) => updateSectionConfig(index, 'menuCard.title.fontFamily', value)}
                                options={fontFamilyOptions}
                              />
                            </div>
                          </div>

                          {/* Menu Card - Background */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Menu Card - Background</h4>
                            <div className="mas-block-config__fields">
                              <ColorPicker
                                label="Background Color"
                                value={getSectionConfigValue(index, 'menuCard.background.backgroundColor', '#f9f8f4')}
                                onChange={(value) => updateSectionConfig(index, 'menuCard.background.backgroundColor', value)}
                              />
                            </div>
                          </div>

                          {/* Section Background */}
                          <div className="mas-block-config__group">
                            <h4 className="mas-block-config__group-title">Section Background</h4>
                            <div className="mas-block-config__fields">
                              <ColorPicker
                                label="Background Color"
                                value={getSectionConfigValue(index, 'sectionBackground.backgroundColor', '#ffffff')}
                                onChange={(value) => updateSectionConfig(index, 'sectionBackground.backgroundColor', value)}
                              />
                            </div>
                          </div>

                          {/* Conveyance, Account Icon, Message Icon - Only shows on first section */}
                          {shouldShowConveyance(index) && (
                            <>
                              <div className="mas-block-config__group">
                                <h4 className="mas-block-config__group-title">Conveyance</h4>
                                <div className="mas-block-config__fields">
                                  <SelectInput
                                    label="Font Family"
                                    value={getSectionConfigValue(index, 'conveyance.fontFamily', 'font-family-body')}
                                    onChange={(value) => updateSectionConfig(index, 'conveyance.fontFamily', value)}
                                    options={fontFamilyOptions}
                                  />
                                  <ColorPicker
                                    label="Font Color"
                                    value={getSectionConfigValue(index, 'conveyance.fontColor', '#0b1f22')}
                                    onChange={(value) => updateSectionConfig(index, 'conveyance.fontColor', value)}
                                  />
                                </div>
                              </div>

                              <div className="mas-block-config__group">
                                <h4 className="mas-block-config__group-title">Account Icon</h4>
                                <div className="mas-block-config__fields">
                                  <ColorPicker
                                    label="Background Color"
                                    value={getSectionConfigValue(index, 'accountIcon.backgroundColor', '#0b1f22')}
                                    onChange={(value) => updateSectionConfig(index, 'accountIcon.backgroundColor', value)}
                                  />
                                  <ColorPicker
                                    label="Font Color"
                                    value={getSectionConfigValue(index, 'accountIcon.fontColor', '#ffffff')}
                                    onChange={(value) => updateSectionConfig(index, 'accountIcon.fontColor', value)}
                                  />
                                </div>
                              </div>

                              <div className="mas-block-config__group">
                                <h4 className="mas-block-config__group-title">Message Icon</h4>
                                <div className="mas-block-config__fields">
                                  <ColorPicker
                                    label="Background Color"
                                    value={getSectionConfigValue(index, 'messageIcon.backgroundColor', '#0b1f22')}
                                    onChange={(value) => updateSectionConfig(index, 'messageIcon.backgroundColor', value)}
                                  />
                                  <ColorPicker
                                    label="Font Color"
                                    value={getSectionConfigValue(index, 'messageIcon.fontColor', '#ffffff')}
                                    onChange={(value) => updateSectionConfig(index, 'messageIcon.fontColor', value)}
                                  />
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Add Section Dropdown */}
        <div className="mas-page-builder__add">
          <span className="mas-page-builder__add-label">Add Section:</span>
          <div className="mas-page-builder__add-buttons">
            {blockTypes
              .filter((block) => !block.customerOnly || activeTab === 'customer')
              .map((block) => {
                const BlockIcon = block.icon
                return (
                  <button
                    key={block.value}
                    type="button"
                    className="mas-page-builder__add-btn"
                    onClick={() => addSection(block.value)}
                    title={block.label}
                  >
                    <BlockIcon size={16} />
                    <span>{block.label}</span>
                  </button>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
