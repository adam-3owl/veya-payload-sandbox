import type { UISectionSchema } from '../types'
import { checkboxField, selectField, collapsible } from '../builders'

export const menuSchema: UISectionSchema = {
  title: 'Menu',
  description: 'Configure the menu browsing experience',
  pathPrefix: 'menu',
  fields: [
    collapsible('Display Options', [
      selectField('layout', 'Menu Layout', [
        { label: 'Grid View', value: 'grid' },
        { label: 'List View', value: 'list' },
        { label: 'Compact', value: 'compact' },
      ], 'grid'),
      checkboxField('showImages', 'Show Images', true, 'Display product images in menu'),
      checkboxField('showPrices', 'Show Prices', true, 'Display prices in menu listings'),
      checkboxField('showDescriptions', 'Show Descriptions', true, 'Display item descriptions in listings'),
    ], { defaultOpen: true }),

    collapsible('Filtering & Search', [
      checkboxField('enableCategoryFilters', 'Category Filters', true, 'Allow filtering by category'),
      checkboxField('enableDietaryFilters', 'Dietary Filters', true, 'Allow filtering by dietary preferences'),
      checkboxField('enableSearch', 'Search', true, 'Enable menu search'),
      checkboxField('enableSort', 'Sort Options', true, 'Allow sorting menu items'),
    ]),

    collapsible('Product Details', [
      checkboxField('showNutritionInfo', 'Nutrition Info', true, 'Show nutritional information'),
      checkboxField('showAllergenInfo', 'Allergen Info', true, 'Display allergen warnings'),
      checkboxField('enableCustomization', 'Customization', true, 'Allow item customization'),
      checkboxField('enableFavorites', 'Add to Favorites', true, 'Allow saving items to favorites'),
    ]),
  ],
}
