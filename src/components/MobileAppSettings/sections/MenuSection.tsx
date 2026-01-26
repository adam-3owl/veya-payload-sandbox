'use client'

import { useMobileAppSettings } from '../MobileAppSettingsContext'
import { SectionGroup } from './SectionGroup'
import { ToggleSwitch } from '../fields/ToggleSwitch'
import { SelectInput } from '../fields/SelectInput'

export function MenuSection() {
  const { getValue, updateField } = useMobileAppSettings()

  return (
    <div className="mas-section">
      <div className="mas-section__header">
        <h2 className="mas-section__title">Menu</h2>
        <p className="mas-section__description">
          Configure the menu browsing experience
        </p>
      </div>

      <SectionGroup title="Display Options" defaultOpen>
        <SelectInput
          label="Menu Layout"
          value={getValue('menu.layout') as string ?? 'grid'}
          onChange={(value) => updateField('menu.layout', value)}
          options={[
            { label: 'Grid View', value: 'grid' },
            { label: 'List View', value: 'list' },
            { label: 'Compact', value: 'compact' },
          ]}
        />
        <ToggleSwitch
          label="Show Images"
          description="Display product images in menu"
          checked={getValue('menu.showImages') as boolean ?? true}
          onChange={(value) => updateField('menu.showImages', value)}
        />
        <ToggleSwitch
          label="Show Prices"
          description="Display prices in menu listings"
          checked={getValue('menu.showPrices') as boolean ?? true}
          onChange={(value) => updateField('menu.showPrices', value)}
        />
        <ToggleSwitch
          label="Show Descriptions"
          description="Display item descriptions in listings"
          checked={getValue('menu.showDescriptions') as boolean ?? true}
          onChange={(value) => updateField('menu.showDescriptions', value)}
        />
      </SectionGroup>

      <SectionGroup title="Filtering & Search">
        <ToggleSwitch
          label="Category Filters"
          description="Allow filtering by category"
          checked={getValue('menu.enableCategoryFilters') as boolean ?? true}
          onChange={(value) => updateField('menu.enableCategoryFilters', value)}
        />
        <ToggleSwitch
          label="Dietary Filters"
          description="Allow filtering by dietary preferences"
          checked={getValue('menu.enableDietaryFilters') as boolean ?? true}
          onChange={(value) => updateField('menu.enableDietaryFilters', value)}
        />
        <ToggleSwitch
          label="Search"
          description="Enable menu search"
          checked={getValue('menu.enableSearch') as boolean ?? true}
          onChange={(value) => updateField('menu.enableSearch', value)}
        />
        <ToggleSwitch
          label="Sort Options"
          description="Allow sorting menu items"
          checked={getValue('menu.enableSort') as boolean ?? true}
          onChange={(value) => updateField('menu.enableSort', value)}
        />
      </SectionGroup>

      <SectionGroup title="Product Details">
        <ToggleSwitch
          label="Nutrition Info"
          description="Show nutritional information"
          checked={getValue('menu.showNutritionInfo') as boolean ?? true}
          onChange={(value) => updateField('menu.showNutritionInfo', value)}
        />
        <ToggleSwitch
          label="Allergen Info"
          description="Display allergen warnings"
          checked={getValue('menu.showAllergenInfo') as boolean ?? true}
          onChange={(value) => updateField('menu.showAllergenInfo', value)}
        />
        <ToggleSwitch
          label="Customization"
          description="Allow item customization"
          checked={getValue('menu.enableCustomization') as boolean ?? true}
          onChange={(value) => updateField('menu.enableCustomization', value)}
        />
        <ToggleSwitch
          label="Add to Favorites"
          description="Allow saving items to favorites"
          checked={getValue('menu.enableFavorites') as boolean ?? true}
          onChange={(value) => updateField('menu.enableFavorites', value)}
        />
      </SectionGroup>
    </div>
  )
}
