import type { GlobalConfig } from 'payload'

export const MobileAppSettings: GlobalConfig = {
  slug: 'mobile-app-settings',
  label: 'Mobile App Settings',
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  admin: {
    group: 'Frontend Experiences',
    hideAPIURL: true,
    components: {
      views: {
        edit: {
          root: {
            Component: '/components/admin/MobileAppSettingsRedirect',
          },
        },
      },
    },
  },
  fields: [
    // Navigation Settings
    {
      type: 'group',
      name: 'navigation',
      label: 'Navigation',
      fields: [
        // Navigation Items (Array for add/remove/reorder)
        {
          name: 'items',
          type: 'array',
          label: 'Navigation Items',
          labels: {
            singular: 'Navigation Item',
            plural: 'Navigation Items',
          },
          admin: {
            description: 'Add, remove, and reorder navigation items. Drag to rearrange.',
            initCollapsed: false,
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Navigation Label',
              required: true,
              admin: {
                placeholder: 'e.g., Home, Menu, Orders',
              },
            },
            {
              name: 'route',
              type: 'select',
              label: 'Navigation Route',
              required: true,
              options: [
                { label: 'Home', value: 'home' },
                { label: 'Locations', value: 'locations' },
                { label: 'Menu', value: 'menu' },
                { label: 'Loyalty', value: 'loyalty' },
                { label: 'Reorder', value: 'reorder' },
                { label: 'Bag', value: 'bag' },
              ],
              admin: {
                description: 'The screen this navigation item links to',
              },
            },
            {
              name: 'inactiveIcon',
              type: 'upload',
              label: 'Inactive Icon',
              relationTo: 'icons',
              admin: {
                description: 'SVG icon shown when this tab is not selected',
              },
            },
            {
              name: 'activeIcon',
              type: 'upload',
              label: 'Active Icon',
              relationTo: 'icons',
              admin: {
                description: 'SVG icon shown when this tab is selected',
              },
            },
          ],
        },
        // Tab Bar Settings
        { name: 'showTabLabels', type: 'checkbox', label: 'Show Tab Labels', defaultValue: true },
        { name: 'hapticFeedback', type: 'checkbox', label: 'Haptic Feedback', defaultValue: true },
        {
          name: 'iosStyle',
          type: 'select',
          label: 'iOS Style',
          defaultValue: 'liquid-glass',
          options: [
            { label: 'Liquid Glass', value: 'liquid-glass' },
            { label: 'Flat', value: 'flat' },
          ],
        },
        {
          name: 'androidStyle',
          type: 'select',
          label: 'Android Style',
          defaultValue: 'flat',
          options: [
            { label: 'Flat', value: 'flat' },
          ],
        },
        {
          name: 'position',
          type: 'select',
          label: 'Position',
          defaultValue: 'fixed',
          options: [
            { label: 'Fixed', value: 'fixed' },
            { label: 'Floating', value: 'floating' },
          ],
        },
        {
          name: 'floatingDropShadow',
          type: 'select',
          label: 'Drop Shadow Style',
          dbName: 'drop_shadow',
          enumName: 'nav_drop_shadow',
          defaultValue: 'elevation2',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Subtle', value: 'elevation1' },
            { label: 'Medium', value: 'elevation2' },
            { label: 'Pronounced', value: 'elevation3' },
            { label: 'Strong', value: 'elevation4' },
            { label: 'Dramatic', value: 'elevation5' },
          ],
          admin: {
            condition: (data) => data?.navigation?.position === 'floating',
          },
        },
        { name: 'backgroundColor', type: 'text', label: 'Background Color', defaultValue: '#ffffff' },
        { name: 'tabInactiveColor', type: 'text', label: 'Navigation Tab Inactive Color', defaultValue: '#6b7280' },
        { name: 'tabActiveColor', type: 'text', label: 'Navigation Tab Active Color', defaultValue: '#000000' },
        { name: 'activeIndicatorColor', type: 'text', label: 'Active Tab Indicator Color', defaultValue: '#000000' },
        // Gestures
        { name: 'swipeNavigation', type: 'checkbox', label: 'Swipe Navigation', defaultValue: true },
        { name: 'pullToRefresh', type: 'checkbox', label: 'Pull to Refresh', defaultValue: true },
      ],
    },
    // Home Screen Settings
    {
      type: 'group',
      name: 'homeScreen',
      label: 'Home Screen',
      fields: [
        // Guest Screen Sections
        {
          name: 'guestSections',
          type: 'array',
          label: 'Guest Screen Sections',
          dbName: 'guest_sections',
          labels: {
            singular: 'Section',
            plural: 'Sections',
          },
          admin: {
            description: 'Content blocks shown to users who are not logged in',
          },
          fields: [
            {
              name: 'blockType',
              type: 'select',
              label: 'Block Type',
              dbName: 'block_type',
              enumName: 'guest_block_type',
              required: true,
              options: [
                { label: 'Full Screen Image', value: 'full-screen-image' },
                { label: 'Text with CTA', value: 'text-with-cta' },
                { label: 'Order Again', value: 'order-again' },
                { label: 'Menu Categories', value: 'menu-categories' },
                { label: 'Image with Text Content', value: 'image-with-text' },
                { label: 'Rewards Indicator', value: 'rewards-indicator' },
              ],
            },
            { name: 'title', type: 'text', label: 'Section Title' },
            { name: 'enabled', type: 'checkbox', label: 'Enabled', defaultValue: true },
            {
              name: 'config',
              type: 'json',
              label: 'Block Configuration',
              admin: {
                hidden: true,
              },
            },
          ],
        },
        // Customer Screen Sections
        {
          name: 'customerSections',
          type: 'array',
          label: 'Customer Screen Sections',
          dbName: 'cust_sections',
          labels: {
            singular: 'Section',
            plural: 'Sections',
          },
          admin: {
            description: 'Content blocks shown to logged-in customers',
          },
          fields: [
            {
              name: 'blockType',
              type: 'select',
              label: 'Block Type',
              dbName: 'block_type',
              enumName: 'cust_block_type',
              required: true,
              options: [
                { label: 'Full Screen Image', value: 'full-screen-image' },
                { label: 'Text with CTA', value: 'text-with-cta' },
                { label: 'Order Again', value: 'order-again' },
                { label: 'Menu Categories', value: 'menu-categories' },
                { label: 'Image with Text Content', value: 'image-with-text' },
                { label: 'Rewards Indicator', value: 'rewards-indicator' },
              ],
            },
            { name: 'title', type: 'text', label: 'Section Title' },
            { name: 'enabled', type: 'checkbox', label: 'Enabled', defaultValue: true },
            {
              name: 'config',
              type: 'json',
              label: 'Block Configuration',
              admin: {
                hidden: true,
              },
            },
          ],
        },
      ],
    },
    // Locations Settings
    {
      type: 'group',
      name: 'locations',
      label: 'Locations',
      fields: [
        // Location Finder
        { name: 'enableLocationServices', type: 'checkbox', label: 'Enable Location Services', defaultValue: true },
        {
          name: 'defaultView',
          type: 'select',
          label: 'Default View',
          defaultValue: 'map',
          options: [
            { label: 'Map View', value: 'map' },
            { label: 'List View', value: 'list' },
          ],
        },
        { name: 'searchRadius', type: 'text', label: 'Search Radius', defaultValue: '25' },
        // Store Details
        { name: 'showHours', type: 'checkbox', label: 'Show Hours', defaultValue: true },
        { name: 'showPhone', type: 'checkbox', label: 'Show Phone', defaultValue: true },
        { name: 'showDirections', type: 'checkbox', label: 'Show Directions', defaultValue: true },
        { name: 'showAmenities', type: 'checkbox', label: 'Show Amenities', defaultValue: true },
        // Map Settings
        {
          name: 'mapProvider',
          type: 'select',
          label: 'Map Provider',
          defaultValue: 'apple',
          options: [
            { label: 'Apple Maps', value: 'apple' },
            { label: 'Google Maps', value: 'google' },
          ],
        },
        { name: 'showTraffic', type: 'checkbox', label: 'Show Traffic', defaultValue: false },
        { name: 'clusterMarkers', type: 'checkbox', label: 'Cluster Markers', defaultValue: true },
      ],
    },
    // Menu Settings
    {
      type: 'group',
      name: 'menu',
      label: 'Menu',
      fields: [
        // Display Options
        {
          name: 'layout',
          type: 'select',
          label: 'Menu Layout',
          defaultValue: 'grid',
          options: [
            { label: 'Grid View', value: 'grid' },
            { label: 'List View', value: 'list' },
            { label: 'Compact', value: 'compact' },
          ],
        },
        { name: 'showImages', type: 'checkbox', label: 'Show Images', defaultValue: true },
        { name: 'showPrices', type: 'checkbox', label: 'Show Prices', defaultValue: true },
        { name: 'showDescriptions', type: 'checkbox', label: 'Show Descriptions', defaultValue: true },
        // Filtering & Search
        { name: 'enableCategoryFilters', type: 'checkbox', label: 'Category Filters', defaultValue: true },
        { name: 'enableDietaryFilters', type: 'checkbox', label: 'Dietary Filters', defaultValue: true },
        { name: 'enableSearch', type: 'checkbox', label: 'Search', defaultValue: true },
        { name: 'enableSort', type: 'checkbox', label: 'Sort Options', defaultValue: true },
        // Product Details
        { name: 'showNutritionInfo', type: 'checkbox', label: 'Nutrition Info', defaultValue: true },
        { name: 'showAllergenInfo', type: 'checkbox', label: 'Allergen Info', defaultValue: true },
        { name: 'enableCustomization', type: 'checkbox', label: 'Customization', defaultValue: true },
        { name: 'enableFavorites', type: 'checkbox', label: 'Add to Favorites', defaultValue: true },
      ],
    },
  ],
}
