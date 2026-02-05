import type { GlobalConfig } from 'payload'
import {
  colorField,
  sizeField,
  assetField,
  typographyGroup,
  underlineTabsFields,
  iconGroup,
  ctaFields,
} from './fields'

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
        // ── Modal Settings ──────────────────────────────────────────────
        {
          type: 'group',
          name: 'modal',
          label: 'Modal Settings',
          fields: [
            {
              type: 'row',
              fields: [
                colorField('bgColor', 'Background Color', '#ffffff'),
                colorField('colorBtnBgColor', 'Color Button BG', '#f0f0f0'),
              ],
            },
            assetField('closeIconAsset', 'Close Icon', 'icons'),
            colorField('closeIconColor', 'Close Icon Color', '#000000', '50%'),
          ],
        },

        // ── Conveyance Selection ────────────────────────────────────────
        {
          type: 'group',
          name: 'conveyanceSelection',
          label: 'Conveyance Selection',
          fields: [
            {
              name: 'selectionStyle',
              type: 'select',
              label: 'Selection Style',
              dbName: 'sel_style',
              enumName: 'loc_conv_sel_style',
              defaultValue: 'pill',
              options: [
                { label: 'Pill', value: 'pill' },
                { label: 'Underline Tabs', value: 'underlineTabs' },
              ],
            },
            // Pill Settings (conditional)
            {
              type: 'collapsible',
              label: 'Pill Settings',
              admin: {
                initCollapsed: false,
                condition: (_data, siblingData) => siblingData?.selectionStyle === 'pill',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    colorField('pillActiveBgColor', 'Active BG', '#000000'),
                    colorField('pillActiveBorderColor', 'Active Border', '#000000'),
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    colorField('pillActiveTextColor', 'Active Text', '#ffffff'),
                    colorField('pillInactiveBgColor', 'Inactive BG', '#ffffff'),
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    colorField('pillInactiveTextColor', 'Inactive Text', '#666666'),
                    sizeField('pillBorderRadius', 'Border Radius', '24px', {
                      min: 0,
                      max: 50,
                    }),
                  ],
                },
              ],
            },
            // Underline Tab Settings (conditional)
            {
              type: 'collapsible',
              label: 'Underline Tab Settings',
              admin: {
                initCollapsed: false,
                condition: (_data, siblingData) => siblingData?.selectionStyle === 'underlineTabs',
              },
              fields: underlineTabsFields('tab'),
            },
            // Input Field
            {
              type: 'group',
              name: 'inputField',
              label: 'Input Field',
              fields: [
                {
                  type: 'row',
                  fields: [
                    colorField('inactiveBorder', 'Inactive Border', '#dbdbdb'),
                    colorField('activeBorder', 'Active Border', '#000000'),
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    colorField('placeholderColor', 'Placeholder Color', '#978f6f'),
                    colorField('textColor', 'Text Color', '#000000'),
                  ],
                },
              ],
            },
          ],
        },

        // ── Return List ─────────────────────────────────────────────────
        {
          type: 'group',
          name: 'returnList',
          label: 'Return List',
          fields: [
            // List Tabs
            {
              type: 'collapsible',
              label: 'List Tabs',
              admin: { initCollapsed: true },
              fields: underlineTabsFields('listTab'),
            },
            // Map Icon
            {
              type: 'collapsible',
              label: 'Map Icon',
              admin: { initCollapsed: true },
              fields: [iconGroup('mapIcon', 'Map Icon', { bgColor: '#ffffff', iconColor: '#000000' })],
            },
            // Location Card
            {
              type: 'collapsible',
              label: 'Location Card',
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'cardStyle',
                  type: 'select',
                  label: 'Card Style',
                  dbName: 'card_style',
                  enumName: 'loc_ret_card_style',
                  defaultValue: 'flat',
                  options: [{ label: 'Flat', value: 'flat' }],
                },
                typographyGroup('cardTitle', 'Card Title', {
                  fontSize: '16px',
                  color: '#000000',
                }),
                typographyGroup('cardAddress', 'Card Address', {
                  fontSize: '14px',
                  color: '#666666',
                }),
                typographyGroup('cardHours', 'Card Hours', {
                  fontSize: '12px',
                  color: '#999999',
                }),
                {
                  type: 'row',
                  fields: [
                    colorField('cardBgColor', 'Card BG', '#ffffff'),
                    colorField('cardStripeColor', 'Stripe Color', '#f0f0f0'),
                  ],
                },
                colorField('cardBorderColor', 'Border Color', '#e0e0e0', '50%'),
                iconGroup('deliveryIcon', 'Delivery Icon', {
                  bgColor: '#f0f0f0',
                  iconColor: '#000000',
                }),
              ],
            },
            // Additional Details
            {
              type: 'collapsible',
              label: 'Additional Details',
              admin: { initCollapsed: true },
              fields: [
                typographyGroup('detailsTitle', 'Details Title', {
                  fontSize: '16px',
                  color: '#000000',
                }),
                typographyGroup('detailsSubtitle', 'Details Subtitle', {
                  fontSize: '14px',
                  color: '#666666',
                }),
              ],
            },
            // Secondary CTAs
            {
              type: 'collapsible',
              label: 'Secondary CTAs',
              admin: { initCollapsed: true },
              fields: ctaFields('cta'),
            },
          ],
        },

        // ── Map ─────────────────────────────────────────────────────────
        {
          type: 'group',
          name: 'map',
          label: 'Map',
          fields: [
            colorField('bgColor', 'Background Color', '#e5e3df', '50%'),
            {
              type: 'row',
              fields: [
                assetField('activePin', 'Active Pin', 'icons'),
                assetField('inactivePin', 'Inactive Pin', 'icons'),
              ],
            },
            colorField('popoverBgColor', 'Popover BG Color', '#ffffff', '50%'),
            typographyGroup('popoverText', 'Popover Text', {
              fontSize: '14px',
              color: '#000000',
            }),
          ],
        },

        // ── Empty States ────────────────────────────────────────────────
        {
          type: 'group',
          name: 'emptyStates',
          label: 'Empty States',
          fields: [
            colorField('containerBgColor', 'Container BG Color', '#f9f8f4', '50%'),
            typographyGroup('emptyTitle', 'Empty Title', {
              fontSize: '18px',
              color: '#000000',
            }),
            typographyGroup('emptyBody', 'Empty Body', {
              fontSize: '14px',
              color: '#666666',
            }),
            {
              type: 'collapsible',
              label: 'Icons & Assets',
              admin: { initCollapsed: true },
              fields: [
                assetField('locationServicesIcon', 'Location Services Icon', 'icons'),
                assetField('noNearbyLocationsIcon', 'No Nearby Locations Icon', 'icons'),
                assetField('errorIcon', 'Error Icon', 'icons'),
                assetField('noResultsFoundAsset', 'No Results Found Asset', 'media', 'Raster image for no results state'),
                assetField('loadingLottieAsset', 'Loading Lottie Asset', 'media', 'Lottie JSON animation file'),
              ],
            },
          ],
        },
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
