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
            initCollapsed: true,
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
                colorField('bgColor', 'Background Color', '#ffffff'), // Surface Light
                colorField('colorBtnBgColor', 'Color Button BG', '#deddd6'), // Utility / Native Control
              ],
            },
            assetField('closeIconAsset', 'Close Icon', 'icons'),
            colorField('closeIconColor', 'Close Icon Color', '#0b1f22', '50%'), // Surface Dark
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
                initCollapsed: true,
                condition: (_data, siblingData) => siblingData?.selectionStyle === 'pill',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    colorField('pillActiveBgColor', 'Active BG', '#0b1f22'), // Brand / Primary Dark
                    colorField('pillActiveBorderColor', 'Active Border', '#0b1f22'), // Brand / Primary Dark
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    colorField('pillActiveTextColor', 'Active Text', '#ffffff'), // Action / Primary / Surface Active
                    colorField('pillInactiveBgColor', 'Inactive BG', 'transparent'), // Transparent
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    colorField('pillInactiveTextColor', 'Inactive Text', '#949494'), // Action / Primary / Surface Inactive
                    sizeField('pillBorderRadius', 'Border Radius', '12px', { // Radius Small
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
                initCollapsed: true,
                condition: (_data, siblingData) => siblingData?.selectionStyle === 'underlineTabs',
              },
              fields: underlineTabsFields('tab', {
                activeUnderlineColor: '#0b1f22', // Brand / Primary Dark
                activeTextColor: '#0b1f22', // Action / Text / Surface Active
                inactiveUnderlineColor: '#dbdbdb', // Border / Light
                inactiveTextColor: '#5d5d5d', // Action / Text / Surface Inactive
              }),
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
                    colorField('inactiveBorder', 'Inactive Border', '#dbdbdb'), // Field / Border Inactive
                    colorField('activeBorder', 'Active Border', '#0b1f22'), // Field / Border Active
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    colorField('placeholderColor', 'Placeholder Color', '#978f6f'), // Field / Placeholder
                    colorField('textColor', 'Text Color', '#0b1f22'), // Field / Field Input
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
              fields: underlineTabsFields('listTab', {
                activeUnderlineColor: '#0b1f22', // Text / Dark
                activeTextColor: '#0b1f22', // Text / Dark
                inactiveUnderlineColor: '#949494', // Action / Primary / Surface Inactive
                inactiveTextColor: '#949494', // Action / Primary / Surface Inactive
              }),
            },
            // Map Icon
            {
              type: 'collapsible',
              label: 'Map Icon',
              admin: { initCollapsed: true },
              fields: [iconGroup('mapIcon', 'Map Icon', {
                bgColor: '#133c45', // Brand / Primary Dark 400
                iconColor: '#ffffff', // Surface Light
              })],
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
                typographyGroup('cardTitle', 'Card Title', { // Headline / Extra Small, Text / Dark
                  fontSize: '14px',
                  color: '#0b1f22',
                }),
                typographyGroup('cardAddress', 'Card Address', { // Body / Medium, Text / Medium
                  fontSize: '12px',
                  color: '#405255',
                }),
                typographyGroup('cardHours', 'Card Hours', { // Body / Small, Text / Light
                  fontSize: '11px',
                  color: '#978f6f',
                }),
                {
                  type: 'row',
                  fields: [
                    colorField('cardBgColor', 'Card BG', '#ffffff'), // Surface / Light
                    colorField('cardStripeColor', 'Stripe Color', '#f9f8f4'), // Surface / Stripe
                  ],
                },
                colorField('cardBorderColor', 'Border Color', '#dbdbdb', '50%'), // Border / Light
                iconGroup('deliveryIcon', 'Delivery Icon', {
                  bgColor: '#f9f8f4', // Brand / Primary Light 200
                  iconColor: '#0b1f22', // Brand / Primary Dark
                }),
              ],
            },
            // Additional Details
            {
              type: 'collapsible',
              label: 'Additional Details',
              admin: { initCollapsed: true },
              fields: [
                typographyGroup('detailsTitle', 'Details Title', { // Body / Small, Text / Dark
                  fontSize: '11px',
                  color: '#0b1f22',
                }),
                typographyGroup('detailsSubtitle', 'Details Subtitle', { // Body / Extra Small, Text / Medium
                  fontSize: '10px',
                  color: '#405255',
                }),
              ],
            },
            // Secondary CTAs
            {
              type: 'collapsible',
              label: 'Secondary CTAs',
              admin: { initCollapsed: true },
              fields: ctaFields('cta', {
                bgColor: '#fc5a44', // Action / Secondary / BG Active
                textColor: '#0b1f22', // Action / Secondary / Surface Active
                borderColor: '#fc5a44', // Action / Secondary / BG Active
              }),
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
            colorField('popoverBgColor', 'Popover BG Color', '#ffffff', '50%'), // Surface / Light
            typographyGroup('popoverText', 'Popover Text', { // Headline / Extra Small, Text / Dark
              fontSize: '14px',
              color: '#0b1f22',
            }),
          ],
        },

        // ── Empty States ────────────────────────────────────────────────
        {
          type: 'group',
          name: 'emptyStates',
          label: 'Empty States',
          fields: [
            colorField('containerBgColor', 'Container BG Color', '#f9f8f4', '50%'), // Surface / Stripe
            typographyGroup('emptyTitle', 'Empty Title', { // Headline / Small, Text / Dark
              fontSize: '18px',
              color: '#0b1f22',
            }),
            typographyGroup('emptyBody', 'Empty Body', { // Body / Medium, Text / Dark
              fontSize: '12px',
              color: '#0b1f22',
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
        // ── Conveyance Bar ────────────────────────────────────────────────
        {
          type: 'group',
          name: 'conveyanceBar',
          label: 'Conveyance Bar',
          fields: [
            // Background Settings
            {
              name: 'backgroundType',
              type: 'select',
              label: 'Background Type',
              enumName: 'menu_conv_bg_type',
              defaultValue: 'solid',
              options: [
                { label: 'Solid Color', value: 'solid' },
                { label: 'Image', value: 'image' },
              ],
            },
            colorField('backgroundColor', 'Background Color', '#ffffff', '50%'), // Surface / Light
            {
              name: 'backgroundImage',
              type: 'upload',
              label: 'Background Image',
              relationTo: 'media',
              admin: {
                condition: (_data, siblingData) => siblingData?.backgroundType === 'image',
              },
            },
            colorField('backgroundImageOverlayColor', 'Overlay Color', '#0b1f22', '50%'), // Surface / Dark
            {
              name: 'backgroundImageOverlayOpacity',
              type: 'number',
              label: 'Overlay Opacity',
              defaultValue: 40, // Opacity / Disabled
              min: 0,
              max: 100,
              admin: {
                condition: (_data, siblingData) => siblingData?.backgroundType === 'image',
              },
            },
            // Border
            colorField('borderColor', 'Border Color', '#dbdbdb', '50%'), // Border / Light
            sizeField('borderWidth', 'Border Width', '1px', { min: 0, max: 10, step: 0.5 }), // Stroke / Small
            // Conveyance Mode Settings
            {
              name: 'conveyanceFontFamily',
              type: 'select',
              label: 'Conveyance Font Family',
              enumName: 'menu_conv_font_fam',
              defaultValue: 'Stack Sans Text', // Body font
              options: [
                { label: 'System Default', value: 'System Default' },
                { label: 'Owners (Heading)', value: 'Owners' },
                { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                { label: 'DM Mono (Accent)', value: 'DM Mono' },
              ],
            },
            {
              name: 'conveyanceFontSize',
              type: 'select',
              label: 'Conveyance Font Size',
              enumName: 'menu_conv_font_size',
              defaultValue: '14px', // Body / L
              options: [
                { label: 'XXL (18px)', value: '18px' },
                { label: 'XL (16px)', value: '16px' },
                { label: 'L (14px)', value: '14px' },
                { label: 'M (12px)', value: '12px' },
                { label: 'S (11px)', value: '11px' },
                { label: 'XS (10px)', value: '10px' },
              ],
            },
            {
              name: 'conveyanceLineHeight',
              type: 'select',
              label: 'Conveyance Line Height',
              enumName: 'menu_conv_line_ht',
              defaultValue: '135%', // Line Height / Medium
              options: [
                { label: 'Small (110%)', value: '110%' },
                { label: 'Medium (135%)', value: '135%' },
                { label: 'Tall (150%)', value: '150%' },
              ],
            },
            colorField('conveyanceFontColor', 'Conveyance Font Color', '#0b1f22', '50%'), // Text / Dark
            {
              name: 'conveyanceFontWeight',
              type: 'select',
              label: 'Conveyance Font Weight',
              enumName: 'menu_conv_font_wt',
              defaultValue: '500', // Medium
              options: [
                { label: 'Light (300)', value: '300' },
                { label: 'Regular (400)', value: '400' },
                { label: 'Medium (500)', value: '500' },
                { label: 'Semi Bold (600)', value: '600' },
                { label: 'Bold (700)', value: '700' },
                { label: 'Extra Bold (800)', value: '800' },
              ],
            },
            colorField('conveyanceIconBackgroundColor', 'Conveyance Icon BG', '#f9f8f4', '50%'), // Brand / Primary Light 200
            colorField('conveyanceIconColor', 'Conveyance Icon Color', '#0b1f22', '50%'), // Brand / Primary Dark
            // Location Settings
            {
              name: 'locationFontFamily',
              type: 'select',
              label: 'Location Font Family',
              enumName: 'menu_loc_font_fam',
              defaultValue: 'Stack Sans Text', // Body font
              options: [
                { label: 'System Default', value: 'System Default' },
                { label: 'Owners (Heading)', value: 'Owners' },
                { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                { label: 'DM Mono (Accent)', value: 'DM Mono' },
              ],
            },
            {
              name: 'locationFontSize',
              type: 'select',
              label: 'Location Font Size',
              enumName: 'menu_loc_font_size',
              defaultValue: '12px', // Body / M
              options: [
                { label: 'XXL (18px)', value: '18px' },
                { label: 'XL (16px)', value: '16px' },
                { label: 'L (14px)', value: '14px' },
                { label: 'M (12px)', value: '12px' },
                { label: 'S (11px)', value: '11px' },
                { label: 'XS (10px)', value: '10px' },
              ],
            },
            {
              name: 'locationLineHeight',
              type: 'select',
              label: 'Location Line Height',
              enumName: 'menu_loc_line_ht',
              defaultValue: '135%', // Line Height / Medium
              options: [
                { label: 'Small (110%)', value: '110%' },
                { label: 'Medium (135%)', value: '135%' },
                { label: 'Tall (150%)', value: '150%' },
              ],
            },
            colorField('locationFontColor', 'Location Font Color', '#405255', '50%'), // Text / Medium
            {
              name: 'locationFontWeight',
              type: 'select',
              label: 'Location Font Weight',
              enumName: 'menu_loc_font_wt',
              defaultValue: '400', // Regular
              options: [
                { label: 'Light (300)', value: '300' },
                { label: 'Regular (400)', value: '400' },
                { label: 'Medium (500)', value: '500' },
                { label: 'Semi Bold (600)', value: '600' },
                { label: 'Bold (700)', value: '700' },
                { label: 'Extra Bold (800)', value: '800' },
              ],
            },
          ],
        },
        // ── Category Navigation ───────────────────────────────────────────
        {
          type: 'group',
          name: 'menuCategories',
          label: 'Category Navigation',
          fields: [
            colorField('backgroundColor', 'Background Color', '#ffffff', '50%'), // Surface / Light
            { name: 'showIcons', type: 'checkbox', label: 'Show Category Icons', defaultValue: true },
            // Tab Typography
            {
              name: 'tabFontFamily',
              type: 'select',
              label: 'Tab Font Family',
              enumName: 'menu_cat_tab_font_fam',
              defaultValue: 'Stack Sans Text', // Body font
              options: [
                { label: 'System Default', value: 'System Default' },
                { label: 'Owners (Heading)', value: 'Owners' },
                { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                { label: 'DM Mono (Accent)', value: 'DM Mono' },
              ],
            },
            {
              name: 'tabFontSize',
              type: 'select',
              label: 'Tab Font Size',
              enumName: 'menu_cat_tab_font_size',
              defaultValue: '14px', // Body / L
              options: [
                { label: 'XXL (18px)', value: '18px' },
                { label: 'XL (16px)', value: '16px' },
                { label: 'L (14px)', value: '14px' },
                { label: 'M (12px)', value: '12px' },
                { label: 'S (11px)', value: '11px' },
                { label: 'XS (10px)', value: '10px' },
              ],
            },
            {
              name: 'tabLineHeight',
              type: 'select',
              label: 'Tab Line Height',
              enumName: 'menu_cat_tab_line_ht',
              defaultValue: '135%', // Line Height / Medium
              options: [
                { label: 'Small (110%)', value: '110%' },
                { label: 'Medium (135%)', value: '135%' },
                { label: 'Tall (150%)', value: '150%' },
              ],
            },
            {
              name: 'tabFontWeight',
              type: 'select',
              label: 'Tab Font Weight',
              enumName: 'menu_cat_tab_font_wt',
              defaultValue: '500', // Medium
              options: [
                { label: 'Light (300)', value: '300' },
                { label: 'Regular (400)', value: '400' },
                { label: 'Medium (500)', value: '500' },
                { label: 'Semi Bold (600)', value: '600' },
                { label: 'Bold (700)', value: '700' },
                { label: 'Extra Bold (800)', value: '800' },
              ],
            },
            colorField('tabFontColorActive', 'Active Text Color', '#0b1f22', '50%'), // Text / Dark
            colorField('tabFontColorInactive', 'Inactive Text Color', '#949494', '50%'), // Action / Primary / Surface Inactive
            // Underlines
            colorField('categoryBarUnderlineColor', 'Bar Underline Color', '#dbdbdb', '50%'), // Border / Light
            colorField('tabActiveUnderlineColor', 'Active Tab Underline', '#0b1f22', '50%'), // Brand / Primary Dark
          ],
        },
        // ── Category Titles ───────────────────────────────────────────────
        {
          type: 'group',
          name: 'categoryTitle',
          label: 'Category Titles',
          fields: [
            // Main Title
            { name: 'enabled', type: 'checkbox', label: 'Show Category Title', defaultValue: true },
            {
              name: 'fontFamily',
              type: 'select',
              label: 'Title Font Family',
              enumName: 'menu_cat_title_font_fam',
              defaultValue: 'Owners', // Heading font
              options: [
                { label: 'System Default', value: 'System Default' },
                { label: 'Owners (Heading)', value: 'Owners' },
                { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                { label: 'DM Mono (Accent)', value: 'DM Mono' },
              ],
            },
            {
              name: 'fontSize',
              type: 'select',
              label: 'Title Font Size',
              enumName: 'menu_cat_title_font_size',
              defaultValue: '18px', // Headline / Small
              options: [
                { label: 'XXL (18px)', value: '18px' },
                { label: 'XL (16px)', value: '16px' },
                { label: 'L (14px)', value: '14px' },
                { label: 'M (12px)', value: '12px' },
                { label: 'S (11px)', value: '11px' },
                { label: 'XS (10px)', value: '10px' },
              ],
            },
            {
              name: 'lineHeight',
              type: 'select',
              label: 'Title Line Height',
              enumName: 'menu_cat_title_line_ht',
              defaultValue: '110%', // Line Height / Small
              options: [
                { label: 'Small (110%)', value: '110%' },
                { label: 'Medium (135%)', value: '135%' },
                { label: 'Tall (150%)', value: '150%' },
              ],
            },
            {
              name: 'fontWeight',
              type: 'select',
              label: 'Title Font Weight',
              enumName: 'menu_cat_title_font_wt',
              defaultValue: '700', // Bold
              options: [
                { label: 'Light (300)', value: '300' },
                { label: 'Regular (400)', value: '400' },
                { label: 'Medium (500)', value: '500' },
                { label: 'Semi Bold (600)', value: '600' },
                { label: 'Bold (700)', value: '700' },
                { label: 'Extra Bold (800)', value: '800' },
              ],
            },
            colorField('fontColor', 'Title Font Color', '#0b1f22', '50%'), // Text / Dark
            // Subtitle
            { name: 'subEnabled', type: 'checkbox', label: 'Show Category Subtitle', defaultValue: true },
            {
              name: 'subFontFamily',
              type: 'select',
              label: 'Subtitle Font Family',
              enumName: 'menu_cat_sub_font_fam',
              defaultValue: 'Stack Sans Text', // Body font
              options: [
                { label: 'System Default', value: 'System Default' },
                { label: 'Owners (Heading)', value: 'Owners' },
                { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                { label: 'DM Mono (Accent)', value: 'DM Mono' },
              ],
            },
            {
              name: 'subFontSize',
              type: 'select',
              label: 'Subtitle Font Size',
              enumName: 'menu_cat_sub_font_size',
              defaultValue: '12px', // Body / M
              options: [
                { label: 'XXL (18px)', value: '18px' },
                { label: 'XL (16px)', value: '16px' },
                { label: 'L (14px)', value: '14px' },
                { label: 'M (12px)', value: '12px' },
                { label: 'S (11px)', value: '11px' },
                { label: 'XS (10px)', value: '10px' },
              ],
            },
            {
              name: 'subLineHeight',
              type: 'select',
              label: 'Subtitle Line Height',
              enumName: 'menu_cat_sub_line_ht',
              defaultValue: '135%', // Line Height / Medium
              options: [
                { label: 'Small (110%)', value: '110%' },
                { label: 'Medium (135%)', value: '135%' },
                { label: 'Tall (150%)', value: '150%' },
              ],
            },
            {
              name: 'subFontWeight',
              type: 'select',
              label: 'Subtitle Font Weight',
              enumName: 'menu_cat_sub_font_wt',
              defaultValue: '400', // Regular
              options: [
                { label: 'Light (300)', value: '300' },
                { label: 'Regular (400)', value: '400' },
                { label: 'Medium (500)', value: '500' },
                { label: 'Semi Bold (600)', value: '600' },
                { label: 'Bold (700)', value: '700' },
                { label: 'Extra Bold (800)', value: '800' },
              ],
            },
            colorField('subFontColor', 'Subtitle Font Color', '#405255', '50%'), // Text / Medium
          ],
        },
        // ── Product Card ──────────────────────────────────────────────────
        {
          type: 'group',
          name: 'productCard',
          label: 'Product Card',
          fields: [
            // Card Version & Display Options
            {
              name: 'version',
              type: 'select',
              label: 'Card Version',
              enumName: 'menu_prod_card_ver',
              defaultValue: 'horizontal',
              options: [
                { label: 'Horizontal', value: 'horizontal' },
              ],
            },
            { name: 'showTags', type: 'checkbox', label: 'Show Tags', defaultValue: true },
            { name: 'showQuickAdd', type: 'checkbox', label: 'Show Quick Add', defaultValue: true },
            { name: 'showPriceAndCalories', type: 'checkbox', label: 'Show Price & Calories', defaultValue: true },
            { name: 'showDescription', type: 'checkbox', label: 'Show Description', defaultValue: true },
            // Card Styling
            colorField('backgroundColor', 'Card BG Color', '#ffffff', '50%'), // Surface / Light
            colorField('stripeBackgroundColor', 'Stripe BG Color', '#f9f8f4', '50%'), // Surface / Stripe
            colorField('borderColor', 'Border Color', '#dbdbdb', '50%'), // Border / Light
            sizeField('borderWidth', 'Border Width', '1px', { min: 0, max: 10, step: 0.5 }), // Stroke / Small
            { name: 'imageBorderRadius', type: 'number', label: 'Image Border Radius', defaultValue: 12, min: 0, max: 50 }, // Radius / Small
            // Tag Styling
            {
              name: 'tagFontFamily',
              type: 'select',
              label: 'Tag Font Family',
              enumName: 'menu_prod_tag_font_fam',
              defaultValue: 'Stack Sans Text', // Body font
              options: [
                { label: 'System Default', value: 'System Default' },
                { label: 'Owners (Heading)', value: 'Owners' },
                { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                { label: 'DM Mono (Accent)', value: 'DM Mono' },
              ],
            },
            {
              name: 'tagFontSize',
              type: 'select',
              label: 'Tag Font Size',
              enumName: 'menu_prod_tag_font_size',
              defaultValue: '10px', // Body / XS
              options: [
                { label: 'XXL (18px)', value: '18px' },
                { label: 'XL (16px)', value: '16px' },
                { label: 'L (14px)', value: '14px' },
                { label: 'M (12px)', value: '12px' },
                { label: 'S (11px)', value: '11px' },
                { label: 'XS (10px)', value: '10px' },
              ],
            },
            {
              name: 'tagLineHeight',
              type: 'select',
              label: 'Tag Line Height',
              enumName: 'menu_prod_tag_line_ht',
              defaultValue: '110%', // Line Height / Small
              options: [
                { label: 'Small (110%)', value: '110%' },
                { label: 'Medium (135%)', value: '135%' },
                { label: 'Tall (150%)', value: '150%' },
              ],
            },
            colorField('tagFontColor', 'Tag Font Color', '#0b1f22', '50%'), // Text / Dark
            colorField('tagBackgroundColor', 'Tag BG Color', '#f9f8f4', '50%'), // Surface / Stripe
            { name: 'tagBorderRadius', type: 'number', label: 'Tag Border Radius', defaultValue: 4, min: 0, max: 24 }, // Radius / XX-Small
            // Title Typography
            {
              name: 'titleFontFamily',
              type: 'select',
              label: 'Title Font Family',
              enumName: 'menu_prod_title_font_fam',
              defaultValue: 'Owners', // Heading font
              options: [
                { label: 'System Default', value: 'System Default' },
                { label: 'Owners (Heading)', value: 'Owners' },
                { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                { label: 'DM Mono (Accent)', value: 'DM Mono' },
              ],
            },
            {
              name: 'titleFontSize',
              type: 'select',
              label: 'Title Font Size',
              enumName: 'menu_prod_title_font_size',
              defaultValue: '14px', // Headline / XS
              options: [
                { label: 'XXL (18px)', value: '18px' },
                { label: 'XL (16px)', value: '16px' },
                { label: 'L (14px)', value: '14px' },
                { label: 'M (12px)', value: '12px' },
                { label: 'S (11px)', value: '11px' },
                { label: 'XS (10px)', value: '10px' },
              ],
            },
            {
              name: 'titleLineHeight',
              type: 'select',
              label: 'Title Line Height',
              enumName: 'menu_prod_title_line_ht',
              defaultValue: '110%', // Line Height / Small
              options: [
                { label: 'Small (110%)', value: '110%' },
                { label: 'Medium (135%)', value: '135%' },
                { label: 'Tall (150%)', value: '150%' },
              ],
            },
            colorField('titleFontColor', 'Title Font Color', '#0b1f22', '50%'), // Text / Dark
            // Description Typography
            {
              name: 'descriptionFontFamily',
              type: 'select',
              label: 'Description Font Family',
              enumName: 'menu_prod_desc_font_fam',
              defaultValue: 'Stack Sans Text', // Body font
              options: [
                { label: 'System Default', value: 'System Default' },
                { label: 'Owners (Heading)', value: 'Owners' },
                { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                { label: 'DM Mono (Accent)', value: 'DM Mono' },
              ],
            },
            {
              name: 'descriptionFontSize',
              type: 'select',
              label: 'Description Font Size',
              enumName: 'menu_prod_desc_font_size',
              defaultValue: '12px', // Body / M
              options: [
                { label: 'XXL (18px)', value: '18px' },
                { label: 'XL (16px)', value: '16px' },
                { label: 'L (14px)', value: '14px' },
                { label: 'M (12px)', value: '12px' },
                { label: 'S (11px)', value: '11px' },
                { label: 'XS (10px)', value: '10px' },
              ],
            },
            {
              name: 'descriptionLineHeight',
              type: 'select',
              label: 'Description Line Height',
              enumName: 'menu_prod_desc_line_ht',
              defaultValue: '135%', // Line Height / Medium
              options: [
                { label: 'Small (110%)', value: '110%' },
                { label: 'Medium (135%)', value: '135%' },
                { label: 'Tall (150%)', value: '150%' },
              ],
            },
            colorField('descriptionFontColor', 'Description Font Color', '#405255', '50%'), // Text / Medium
            // Price Typography
            {
              name: 'priceFontFamily',
              type: 'select',
              label: 'Price Font Family',
              enumName: 'menu_prod_price_font_fam',
              defaultValue: 'Stack Sans Text', // Body font
              options: [
                { label: 'System Default', value: 'System Default' },
                { label: 'Owners (Heading)', value: 'Owners' },
                { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                { label: 'DM Mono (Accent)', value: 'DM Mono' },
              ],
            },
            {
              name: 'priceFontSize',
              type: 'select',
              label: 'Price Font Size',
              enumName: 'menu_prod_price_font_size',
              defaultValue: '14px', // Body / L
              options: [
                { label: 'XXL (18px)', value: '18px' },
                { label: 'XL (16px)', value: '16px' },
                { label: 'L (14px)', value: '14px' },
                { label: 'M (12px)', value: '12px' },
                { label: 'S (11px)', value: '11px' },
                { label: 'XS (10px)', value: '10px' },
              ],
            },
            {
              name: 'priceLineHeight',
              type: 'select',
              label: 'Price Line Height',
              enumName: 'menu_prod_price_line_ht',
              defaultValue: '135%', // Line Height / Medium
              options: [
                { label: 'Small (110%)', value: '110%' },
                { label: 'Medium (135%)', value: '135%' },
                { label: 'Tall (150%)', value: '150%' },
              ],
            },
            colorField('priceFontColor', 'Price Font Color', '#0b1f22', '50%'), // Text / Dark
            // Calories Typography
            {
              name: 'caloriesFontFamily',
              type: 'select',
              label: 'Calories Font Family',
              enumName: 'menu_prod_cal_font_fam',
              defaultValue: 'Stack Sans Text', // Body font
              options: [
                { label: 'System Default', value: 'System Default' },
                { label: 'Owners (Heading)', value: 'Owners' },
                { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                { label: 'DM Mono (Accent)', value: 'DM Mono' },
              ],
            },
            {
              name: 'caloriesFontSize',
              type: 'select',
              label: 'Calories Font Size',
              enumName: 'menu_prod_cal_font_size',
              defaultValue: '12px', // Body / M
              options: [
                { label: 'XXL (18px)', value: '18px' },
                { label: 'XL (16px)', value: '16px' },
                { label: 'L (14px)', value: '14px' },
                { label: 'M (12px)', value: '12px' },
                { label: 'S (11px)', value: '11px' },
                { label: 'XS (10px)', value: '10px' },
              ],
            },
            {
              name: 'caloriesLineHeight',
              type: 'select',
              label: 'Calories Line Height',
              enumName: 'menu_prod_cal_line_ht',
              defaultValue: '135%', // Line Height / Medium
              options: [
                { label: 'Small (110%)', value: '110%' },
                { label: 'Medium (135%)', value: '135%' },
                { label: 'Tall (150%)', value: '150%' },
              ],
            },
            colorField('caloriesFontColor', 'Calories Font Color', '#978f6f', '50%'), // Text / Light
            // Quick Add Button
            colorField('quickAddIconColor', 'Quick Add Icon Color', '#ffffff', '50%'), // Surface / Light
            colorField('quickAddBackgroundColor', 'Quick Add BG Color', '#0b1f22', '50%'), // Brand / Primary Dark
            { name: 'quickAddBorderRadius', type: 'number', label: 'Quick Add Border Radius', defaultValue: 1000, min: 0, max: 1000 }, // Radius / Full
          ],
        },
        // ── Conveyance Selection Modal ────────────────────────────────────
        {
          type: 'group',
          name: 'conveyanceModal',
          label: 'Conveyance Selection Modal',
          fields: [
            // Modal Container
            {
              type: 'collapsible',
              label: 'Modal Container',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    colorField('backgroundColor', 'Background Color', '#ffffff', '50%'), // Surface / Light
                    { name: 'borderRadius', type: 'number', label: 'Border Radius', defaultValue: 16, min: 0, max: 50 }, // Radius / Medium
                  ],
                },
              ],
            },
            // Close Icon
            {
              type: 'collapsible',
              label: 'Close Icon',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    colorField('closeIconColor', 'Icon Color', '#0b1f22', '50%'), // Surface / Dark
                    colorField('closeIconBackgroundColor', 'BG Color', '#f9f8f4', '50%'), // Surface / Stripe
                  ],
                },
                { name: 'closeIconBorderRadius', type: 'number', label: 'Border Radius', defaultValue: 1000, min: 0, max: 1000 }, // Radius / Full
              ],
            },
            // Modal Title Typography
            {
              type: 'collapsible',
              label: 'Modal Title',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'headerFontFamily',
                      type: 'select',
                      label: 'Font Family',
                      enumName: 'menu_cm_hdr_font_fam',
                      defaultValue: 'Owners', // Heading font
                      options: [
                        { label: 'System Default', value: 'System Default' },
                        { label: 'Owners (Heading)', value: 'Owners' },
                        { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                        { label: 'DM Mono (Accent)', value: 'DM Mono' },
                      ],
                    },
                    {
                      name: 'headerFontSize',
                      type: 'select',
                      label: 'Font Size',
                      enumName: 'menu_cm_hdr_font_size',
                      defaultValue: '18px', // Headline / Small
                      options: [
                        { label: 'XXL (18px)', value: '18px' },
                        { label: 'XL (16px)', value: '16px' },
                        { label: 'L (14px)', value: '14px' },
                        { label: 'M (12px)', value: '12px' },
                        { label: 'S (11px)', value: '11px' },
                        { label: 'XS (10px)', value: '10px' },
                      ],
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'headerLineHeight',
                      type: 'select',
                      label: 'Line Height',
                      enumName: 'menu_cm_hdr_line_ht',
                      defaultValue: '110%', // Line Height / Small
                      options: [
                        { label: 'Small (110%)', value: '110%' },
                        { label: 'Medium (135%)', value: '135%' },
                        { label: 'Tall (150%)', value: '150%' },
                      ],
                    },
                    colorField('headerFontColor', 'Font Color', '#0b1f22', '50%'), // Text / Dark
                  ],
                },
              ],
            },
            // Panel Styling
            {
              type: 'collapsible',
              label: 'Panel Styling',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    colorField('panelBackgroundColor', 'BG Color', '#f9f8f4', '50%'), // Surface / Stripe
                    { name: 'panelBorderRadius', type: 'number', label: 'Border Radius', defaultValue: 12, min: 0, max: 50 }, // Radius / Small
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    colorField('panelBorderColor', 'Border Color', '#dbdbdb', '50%'), // Border / Light
                    sizeField('panelBorderWidth', 'Border Width', '1px', { min: 0, max: 10, step: 0.5 }), // Stroke / Small
                  ],
                },
              ],
            },
            // Location Title Typography
            {
              type: 'collapsible',
              label: 'Location Title',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'locationTitleFontFamily',
                      type: 'select',
                      label: 'Font Family',
                      enumName: 'menu_cm_lt_font_fam',
                      defaultValue: 'Owners', // Heading font
                      options: [
                        { label: 'System Default', value: 'System Default' },
                        { label: 'Owners (Heading)', value: 'Owners' },
                        { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                        { label: 'DM Mono (Accent)', value: 'DM Mono' },
                      ],
                    },
                    {
                      name: 'locationTitleFontSize',
                      type: 'select',
                      label: 'Font Size',
                      enumName: 'menu_cm_lt_font_size',
                      defaultValue: '14px', // Headline / XS
                      options: [
                        { label: 'XXL (18px)', value: '18px' },
                        { label: 'XL (16px)', value: '16px' },
                        { label: 'L (14px)', value: '14px' },
                        { label: 'M (12px)', value: '12px' },
                        { label: 'S (11px)', value: '11px' },
                        { label: 'XS (10px)', value: '10px' },
                      ],
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'locationTitleLineHeight',
                      type: 'select',
                      label: 'Line Height',
                      enumName: 'menu_cm_lt_line_ht',
                      defaultValue: '110%', // Line Height / Small
                      options: [
                        { label: 'Small (110%)', value: '110%' },
                        { label: 'Medium (135%)', value: '135%' },
                        { label: 'Tall (150%)', value: '150%' },
                      ],
                    },
                    colorField('locationTitleFontColor', 'Font Color', '#0b1f22', '50%'), // Text / Dark
                  ],
                },
              ],
            },
            // Location Subtitle Typography
            {
              type: 'collapsible',
              label: 'Location Subtitle',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'locationSubFontFamily',
                      type: 'select',
                      label: 'Font Family',
                      enumName: 'menu_cm_ls_font_fam',
                      defaultValue: 'Stack Sans Text', // Body font
                      options: [
                        { label: 'System Default', value: 'System Default' },
                        { label: 'Owners (Heading)', value: 'Owners' },
                        { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                        { label: 'DM Mono (Accent)', value: 'DM Mono' },
                      ],
                    },
                    {
                      name: 'locationSubFontSize',
                      type: 'select',
                      label: 'Font Size',
                      enumName: 'menu_cm_ls_font_size',
                      defaultValue: '12px', // Body / M
                      options: [
                        { label: 'XXL (18px)', value: '18px' },
                        { label: 'XL (16px)', value: '16px' },
                        { label: 'L (14px)', value: '14px' },
                        { label: 'M (12px)', value: '12px' },
                        { label: 'S (11px)', value: '11px' },
                        { label: 'XS (10px)', value: '10px' },
                      ],
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'locationSubLineHeight',
                      type: 'select',
                      label: 'Line Height',
                      enumName: 'menu_cm_ls_line_ht',
                      defaultValue: '135%', // Line Height / Medium
                      options: [
                        { label: 'Small (110%)', value: '110%' },
                        { label: 'Medium (135%)', value: '135%' },
                        { label: 'Tall (150%)', value: '150%' },
                      ],
                    },
                    colorField('locationSubFontColor', 'Font Color', '#405255', '50%'), // Text / Medium
                  ],
                },
              ],
            },
            // Meta Typography
            {
              type: 'collapsible',
              label: 'Meta Typography',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'metaFontFamily',
                      type: 'select',
                      label: 'Font Family',
                      enumName: 'menu_cm_meta_font_fam',
                      defaultValue: 'Stack Sans Text', // Body font
                      options: [
                        { label: 'System Default', value: 'System Default' },
                        { label: 'Owners (Heading)', value: 'Owners' },
                        { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                        { label: 'DM Mono (Accent)', value: 'DM Mono' },
                      ],
                    },
                    {
                      name: 'metaFontSize',
                      type: 'select',
                      label: 'Font Size',
                      enumName: 'menu_cm_meta_font_size',
                      defaultValue: '11px', // Body / S
                      options: [
                        { label: 'XXL (18px)', value: '18px' },
                        { label: 'XL (16px)', value: '16px' },
                        { label: 'L (14px)', value: '14px' },
                        { label: 'M (12px)', value: '12px' },
                        { label: 'S (11px)', value: '11px' },
                        { label: 'XS (10px)', value: '10px' },
                      ],
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'metaLineHeight',
                      type: 'select',
                      label: 'Line Height',
                      enumName: 'menu_cm_meta_line_ht',
                      defaultValue: '135%', // Line Height / Medium
                      options: [
                        { label: 'Small (110%)', value: '110%' },
                        { label: 'Medium (135%)', value: '135%' },
                        { label: 'Tall (150%)', value: '150%' },
                      ],
                    },
                    colorField('metaFontColor', 'Font Color', '#978f6f', '50%'), // Text / Light
                  ],
                },
              ],
            },
            // Status & Icons
            {
              type: 'collapsible',
              label: 'Status & Icons',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    colorField('statusDotColor', 'Status Dot Color', '#2fddd0', '50%'), // Utility / Positive
                    colorField('iconColor', 'Icon Color', '#0b1f22', '50%'), // Brand / Primary Dark
                  ],
                },
              ],
            },
            // Primary Button
            {
              type: 'collapsible',
              label: 'Primary Button',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    colorField('primaryButtonBackgroundColor', 'BG Color', '#0b1f22', '50%'), // Action / Primary / BG Active
                    colorField('primaryButtonFontColor', 'Font Color', '#ffffff', '50%'), // Action / Primary / Surface Active
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'primaryButtonFontFamily',
                      type: 'select',
                      label: 'Font Family',
                      enumName: 'menu_cm_pb_font_fam',
                      defaultValue: 'Stack Sans Text', // Action font
                      options: [
                        { label: 'System Default', value: 'System Default' },
                        { label: 'Owners (Heading)', value: 'Owners' },
                        { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                        { label: 'DM Mono (Accent)', value: 'DM Mono' },
                      ],
                    },
                    {
                      name: 'primaryButtonFontSize',
                      type: 'select',
                      label: 'Font Size',
                      enumName: 'menu_cm_pb_font_size',
                      defaultValue: '14px', // Body / L
                      options: [
                        { label: 'XXL (18px)', value: '18px' },
                        { label: 'XL (16px)', value: '16px' },
                        { label: 'L (14px)', value: '14px' },
                        { label: 'M (12px)', value: '12px' },
                        { label: 'S (11px)', value: '11px' },
                        { label: 'XS (10px)', value: '10px' },
                      ],
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'primaryButtonLineHeight',
                      type: 'select',
                      label: 'Line Height',
                      enumName: 'menu_cm_pb_line_ht',
                      defaultValue: '135%', // Line Height / Medium
                      options: [
                        { label: 'Small (110%)', value: '110%' },
                        { label: 'Medium (135%)', value: '135%' },
                        { label: 'Tall (150%)', value: '150%' },
                      ],
                    },
                    { name: 'primaryButtonBorderRadius', type: 'number', label: 'Border Radius', defaultValue: 12, min: 0, max: 50 }, // Radius / Small
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    colorField('primaryButtonBorderColor', 'Border Color', '#0b1f22', '50%'), // Brand / Primary Dark
                    sizeField('primaryButtonBorderWidth', 'Border Width', '1px', { min: 0, max: 10, step: 0.5 }), // Stroke / Small
                  ],
                },
              ],
            },
            // Secondary Button
            {
              type: 'collapsible',
              label: 'Secondary Button',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    colorField('secondaryButtonBackgroundColor', 'BG Color', '#fc5a44', '50%'), // Action / Secondary / BG Active
                    colorField('secondaryButtonFontColor', 'Font Color', '#0b1f22', '50%'), // Action / Secondary / Surface Active
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'secondaryButtonFontFamily',
                      type: 'select',
                      label: 'Font Family',
                      enumName: 'menu_cm_sb_font_fam',
                      defaultValue: 'Stack Sans Text', // Action font
                      options: [
                        { label: 'System Default', value: 'System Default' },
                        { label: 'Owners (Heading)', value: 'Owners' },
                        { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                        { label: 'DM Mono (Accent)', value: 'DM Mono' },
                      ],
                    },
                    {
                      name: 'secondaryButtonFontSize',
                      type: 'select',
                      label: 'Font Size',
                      enumName: 'menu_cm_sb_font_size',
                      defaultValue: '14px', // Body / L
                      options: [
                        { label: 'XXL (18px)', value: '18px' },
                        { label: 'XL (16px)', value: '16px' },
                        { label: 'L (14px)', value: '14px' },
                        { label: 'M (12px)', value: '12px' },
                        { label: 'S (11px)', value: '11px' },
                        { label: 'XS (10px)', value: '10px' },
                      ],
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'secondaryButtonLineHeight',
                      type: 'select',
                      label: 'Line Height',
                      enumName: 'menu_cm_sb_line_ht',
                      defaultValue: '135%', // Line Height / Medium
                      options: [
                        { label: 'Small (110%)', value: '110%' },
                        { label: 'Medium (135%)', value: '135%' },
                        { label: 'Tall (150%)', value: '150%' },
                      ],
                    },
                    { name: 'secondaryButtonBorderRadius', type: 'number', label: 'Border Radius', defaultValue: 12, min: 0, max: 50 }, // Radius / Small
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    colorField('secondaryButtonBorderColor', 'Border Color', '#fc5a44', '50%'), // Action / Secondary / BG Active
                    sizeField('secondaryButtonBorderWidth', 'Border Width', '1px', { min: 0, max: 10, step: 0.5 }), // Stroke / Small
                  ],
                },
              ],
            },
            // Section Title Typography
            {
              type: 'collapsible',
              label: 'Section Title',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'sectionTitleFontFamily',
                      type: 'select',
                      label: 'Font Family',
                      enumName: 'menu_cm_st_font_fam',
                      defaultValue: 'Owners', // Heading font
                      options: [
                        { label: 'System Default', value: 'System Default' },
                        { label: 'Owners (Heading)', value: 'Owners' },
                        { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                        { label: 'DM Mono (Accent)', value: 'DM Mono' },
                      ],
                    },
                    {
                      name: 'sectionTitleFontSize',
                      type: 'select',
                      label: 'Font Size',
                      enumName: 'menu_cm_st_font_size',
                      defaultValue: '16px', // Headline / XS+
                      options: [
                        { label: 'XXL (18px)', value: '18px' },
                        { label: 'XL (16px)', value: '16px' },
                        { label: 'L (14px)', value: '14px' },
                        { label: 'M (12px)', value: '12px' },
                        { label: 'S (11px)', value: '11px' },
                        { label: 'XS (10px)', value: '10px' },
                      ],
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'sectionTitleLineHeight',
                      type: 'select',
                      label: 'Line Height',
                      enumName: 'menu_cm_st_line_ht',
                      defaultValue: '110%', // Line Height / Small
                      options: [
                        { label: 'Small (110%)', value: '110%' },
                        { label: 'Medium (135%)', value: '135%' },
                        { label: 'Tall (150%)', value: '150%' },
                      ],
                    },
                    colorField('sectionTitleFontColor', 'Font Color', '#0b1f22', '50%'), // Text / Dark
                  ],
                },
              ],
            },
            // Section Subtitle Typography
            {
              type: 'collapsible',
              label: 'Section Subtitle',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'sectionSubFontFamily',
                      type: 'select',
                      label: 'Font Family',
                      enumName: 'menu_cm_ss_font_fam',
                      defaultValue: 'Stack Sans Text', // Body font
                      options: [
                        { label: 'System Default', value: 'System Default' },
                        { label: 'Owners (Heading)', value: 'Owners' },
                        { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                        { label: 'DM Mono (Accent)', value: 'DM Mono' },
                      ],
                    },
                    {
                      name: 'sectionSubFontSize',
                      type: 'select',
                      label: 'Font Size',
                      enumName: 'menu_cm_ss_font_size',
                      defaultValue: '12px', // Body / M
                      options: [
                        { label: 'XXL (18px)', value: '18px' },
                        { label: 'XL (16px)', value: '16px' },
                        { label: 'L (14px)', value: '14px' },
                        { label: 'M (12px)', value: '12px' },
                        { label: 'S (11px)', value: '11px' },
                        { label: 'XS (10px)', value: '10px' },
                      ],
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'sectionSubLineHeight',
                      type: 'select',
                      label: 'Line Height',
                      enumName: 'menu_cm_ss_line_ht',
                      defaultValue: '135%', // Line Height / Medium
                      options: [
                        { label: 'Small (110%)', value: '110%' },
                        { label: 'Medium (135%)', value: '135%' },
                        { label: 'Tall (150%)', value: '150%' },
                      ],
                    },
                    colorField('sectionSubFontColor', 'Font Color', '#405255', '50%'), // Text / Medium
                  ],
                },
              ],
            },
            // Day Card Styling
            {
              type: 'collapsible',
              label: 'Day Card',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    colorField('dayCardBackgroundColor', 'BG Color', '#ffffff', '50%'), // Surface / Light
                    { name: 'dayCardBorderRadius', type: 'number', label: 'Border Radius', defaultValue: 12, min: 0, max: 50 }, // Radius / Small
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    colorField('dayCardBorderColor', 'Border Color', '#dbdbdb', '50%'), // Border / Light
                    sizeField('dayCardBorderWidth', 'Border Width', '1px', { min: 0, max: 10, step: 0.5 }), // Stroke / Small
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    colorField('dayCardBackgroundColorSelected', 'Selected BG', '#f9f8f4', '50%'), // Surface / Stripe
                    colorField('dayCardBorderColorSelected', 'Selected Border', '#0b1f22', '50%'), // Brand / Primary Dark
                  ],
                },
                sizeField('dayCardBorderWidthSelected', 'Selected Border Width', '2px', { min: 0, max: 10, step: 0.5 }), // Stroke / Medium
              ],
            },
            // Day Card Title Typography
            {
              type: 'collapsible',
              label: 'Day Card Title',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'dayCardTitleFontFamily',
                      type: 'select',
                      label: 'Font Family',
                      enumName: 'menu_cm_dct_font_fam',
                      defaultValue: 'Stack Sans Text', // Body font
                      options: [
                        { label: 'System Default', value: 'System Default' },
                        { label: 'Owners (Heading)', value: 'Owners' },
                        { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                        { label: 'DM Mono (Accent)', value: 'DM Mono' },
                      ],
                    },
                    {
                      name: 'dayCardTitleFontSize',
                      type: 'select',
                      label: 'Font Size',
                      enumName: 'menu_cm_dct_font_size',
                      defaultValue: '14px', // Body / L
                      options: [
                        { label: 'XXL (18px)', value: '18px' },
                        { label: 'XL (16px)', value: '16px' },
                        { label: 'L (14px)', value: '14px' },
                        { label: 'M (12px)', value: '12px' },
                        { label: 'S (11px)', value: '11px' },
                        { label: 'XS (10px)', value: '10px' },
                      ],
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'dayCardTitleLineHeight',
                      type: 'select',
                      label: 'Line Height',
                      enumName: 'menu_cm_dct_line_ht',
                      defaultValue: '135%', // Line Height / Medium
                      options: [
                        { label: 'Small (110%)', value: '110%' },
                        { label: 'Medium (135%)', value: '135%' },
                        { label: 'Tall (150%)', value: '150%' },
                      ],
                    },
                    colorField('dayCardTitleFontColor', 'Font Color', '#0b1f22', '50%'), // Text / Dark
                  ],
                },
              ],
            },
            // Day Card Subtitle Typography
            {
              type: 'collapsible',
              label: 'Day Card Subtitle',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'dayCardSubFontFamily',
                      type: 'select',
                      label: 'Font Family',
                      enumName: 'menu_cm_dcs_font_fam',
                      defaultValue: 'Stack Sans Text', // Body font
                      options: [
                        { label: 'System Default', value: 'System Default' },
                        { label: 'Owners (Heading)', value: 'Owners' },
                        { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                        { label: 'DM Mono (Accent)', value: 'DM Mono' },
                      ],
                    },
                    {
                      name: 'dayCardSubFontSize',
                      type: 'select',
                      label: 'Font Size',
                      enumName: 'menu_cm_dcs_font_size',
                      defaultValue: '12px', // Body / M
                      options: [
                        { label: 'XXL (18px)', value: '18px' },
                        { label: 'XL (16px)', value: '16px' },
                        { label: 'L (14px)', value: '14px' },
                        { label: 'M (12px)', value: '12px' },
                        { label: 'S (11px)', value: '11px' },
                        { label: 'XS (10px)', value: '10px' },
                      ],
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'dayCardSubLineHeight',
                      type: 'select',
                      label: 'Line Height',
                      enumName: 'menu_cm_dcs_line_ht',
                      defaultValue: '135%', // Line Height / Medium
                      options: [
                        { label: 'Small (110%)', value: '110%' },
                        { label: 'Medium (135%)', value: '135%' },
                        { label: 'Tall (150%)', value: '150%' },
                      ],
                    },
                    colorField('dayCardSubFontColor', 'Font Color', '#405255', '50%'), // Text / Medium
                  ],
                },
              ],
            },
            // Day Card Radio
            {
              type: 'collapsible',
              label: 'Day Card Radio',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    colorField('dayCardRadioColor', 'Radio Color', '#dbdbdb', '50%'), // Border / Light
                    colorField('dayCardRadioColorSelected', 'Selected Radio', '#0b1f22', '50%'), // Brand / Primary Dark
                  ],
                },
              ],
            },
            // Time Row Styling
            {
              type: 'collapsible',
              label: 'Time Row',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    colorField('timeRowBorderColor', 'Border Color', '#dbdbdb', '50%'), // Border / Light
                    sizeField('timeRowBorderWidth', 'Border Width', '1px', { min: 0, max: 10, step: 0.5 }), // Stroke / Small
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    colorField('timeRowRadioColor', 'Radio Color', '#dbdbdb', '50%'), // Border / Light
                    colorField('timeRowRadioColorSelected', 'Selected Radio', '#0b1f22', '50%'), // Brand / Primary Dark
                  ],
                },
              ],
            },
            // Time Row Title Typography
            {
              type: 'collapsible',
              label: 'Time Row Title',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'timeRowTitleFontFamily',
                      type: 'select',
                      label: 'Font Family',
                      enumName: 'menu_cm_trt_font_fam',
                      defaultValue: 'Stack Sans Text', // Body font
                      options: [
                        { label: 'System Default', value: 'System Default' },
                        { label: 'Owners (Heading)', value: 'Owners' },
                        { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                        { label: 'DM Mono (Accent)', value: 'DM Mono' },
                      ],
                    },
                    {
                      name: 'timeRowTitleFontSize',
                      type: 'select',
                      label: 'Font Size',
                      enumName: 'menu_cm_trt_font_size',
                      defaultValue: '14px', // Body / L
                      options: [
                        { label: 'XXL (18px)', value: '18px' },
                        { label: 'XL (16px)', value: '16px' },
                        { label: 'L (14px)', value: '14px' },
                        { label: 'M (12px)', value: '12px' },
                        { label: 'S (11px)', value: '11px' },
                        { label: 'XS (10px)', value: '10px' },
                      ],
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'timeRowTitleLineHeight',
                      type: 'select',
                      label: 'Line Height',
                      enumName: 'menu_cm_trt_line_ht',
                      defaultValue: '135%', // Line Height / Medium
                      options: [
                        { label: 'Small (110%)', value: '110%' },
                        { label: 'Medium (135%)', value: '135%' },
                        { label: 'Tall (150%)', value: '150%' },
                      ],
                    },
                    colorField('timeRowTitleFontColor', 'Font Color', '#0b1f22', '50%'), // Text / Dark
                  ],
                },
              ],
            },
            // Time Row Subtitle Typography
            {
              type: 'collapsible',
              label: 'Time Row Subtitle',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'timeRowSubFontFamily',
                      type: 'select',
                      label: 'Font Family',
                      enumName: 'menu_cm_trs_font_fam',
                      defaultValue: 'Stack Sans Text', // Body font
                      options: [
                        { label: 'System Default', value: 'System Default' },
                        { label: 'Owners (Heading)', value: 'Owners' },
                        { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                        { label: 'DM Mono (Accent)', value: 'DM Mono' },
                      ],
                    },
                    {
                      name: 'timeRowSubFontSize',
                      type: 'select',
                      label: 'Font Size',
                      enumName: 'menu_cm_trs_font_size',
                      defaultValue: '12px', // Body / M
                      options: [
                        { label: 'XXL (18px)', value: '18px' },
                        { label: 'XL (16px)', value: '16px' },
                        { label: 'L (14px)', value: '14px' },
                        { label: 'M (12px)', value: '12px' },
                        { label: 'S (11px)', value: '11px' },
                        { label: 'XS (10px)', value: '10px' },
                      ],
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'timeRowSubLineHeight',
                      type: 'select',
                      label: 'Line Height',
                      enumName: 'menu_cm_trs_line_ht',
                      defaultValue: '135%', // Line Height / Medium
                      options: [
                        { label: 'Small (110%)', value: '110%' },
                        { label: 'Medium (135%)', value: '135%' },
                        { label: 'Tall (150%)', value: '150%' },
                      ],
                    },
                    colorField('timeRowSubFontColor', 'Font Color', '#405255', '50%'), // Text / Medium
                  ],
                },
              ],
            },
          ],
        },
        // ── Menu Search ────────────────────────────────────────────────────
        {
          type: 'group',
          name: 'menuSearch',
          label: 'Menu Search',
          fields: [
            { name: 'enabled', type: 'checkbox', label: 'Enable Search', defaultValue: true },
            // Input Styling
            {
              type: 'collapsible',
              label: 'Input Styling',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    colorField('backgroundColor', 'Background Color', '#ffffff', '50%'), // Surface / Light
                    colorField('borderColor', 'Border Color', '#dbdbdb', '50%'), // Border / Light
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    sizeField('borderWidth', 'Border Width', '1px', { min: 0, max: 10, step: 0.5 }), // Stroke / Small
                    { name: 'borderRadius', type: 'number', label: 'Border Radius', defaultValue: 12, min: 0, max: 50 }, // Radius / Small
                  ],
                },
              ],
            },
            // Text Typography
            {
              type: 'collapsible',
              label: 'Text Typography',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'textFontFamily',
                      type: 'select',
                      label: 'Font Family',
                      enumName: 'menu_srch_txt_font_fam',
                      defaultValue: 'Stack Sans Text', // Body font
                      options: [
                        { label: 'System Default', value: 'System Default' },
                        { label: 'Owners (Heading)', value: 'Owners' },
                        { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                        { label: 'DM Mono (Accent)', value: 'DM Mono' },
                      ],
                    },
                    {
                      name: 'textFontSize',
                      type: 'select',
                      label: 'Font Size',
                      enumName: 'menu_srch_txt_font_size',
                      defaultValue: '14px', // Body / L
                      options: [
                        { label: 'XXL (18px)', value: '18px' },
                        { label: 'XL (16px)', value: '16px' },
                        { label: 'L (14px)', value: '14px' },
                        { label: 'M (12px)', value: '12px' },
                        { label: 'S (11px)', value: '11px' },
                        { label: 'XS (10px)', value: '10px' },
                      ],
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'textLineHeight',
                      type: 'select',
                      label: 'Line Height',
                      enumName: 'menu_srch_txt_line_ht',
                      defaultValue: '135%', // Line Height / Medium
                      options: [
                        { label: 'Small (110%)', value: '110%' },
                        { label: 'Medium (135%)', value: '135%' },
                        { label: 'Tall (150%)', value: '150%' },
                      ],
                    },
                    colorField('textFontColor', 'Font Color', '#0b1f22', '50%'), // Text / Dark
                  ],
                },
              ],
            },
            // Placeholder Typography
            {
              type: 'collapsible',
              label: 'Placeholder Typography',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'placeholderFontFamily',
                      type: 'select',
                      label: 'Font Family',
                      enumName: 'menu_srch_ph_font_fam',
                      defaultValue: 'Stack Sans Text', // Body font
                      options: [
                        { label: 'System Default', value: 'System Default' },
                        { label: 'Owners (Heading)', value: 'Owners' },
                        { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
                        { label: 'DM Mono (Accent)', value: 'DM Mono' },
                      ],
                    },
                    {
                      name: 'placeholderFontSize',
                      type: 'select',
                      label: 'Font Size',
                      enumName: 'menu_srch_ph_font_size',
                      defaultValue: '14px', // Body / L
                      options: [
                        { label: 'XXL (18px)', value: '18px' },
                        { label: 'XL (16px)', value: '16px' },
                        { label: 'L (14px)', value: '14px' },
                        { label: 'M (12px)', value: '12px' },
                        { label: 'S (11px)', value: '11px' },
                        { label: 'XS (10px)', value: '10px' },
                      ],
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'placeholderLineHeight',
                      type: 'select',
                      label: 'Line Height',
                      enumName: 'menu_srch_ph_line_ht',
                      defaultValue: '135%', // Line Height / Medium
                      options: [
                        { label: 'Small (110%)', value: '110%' },
                        { label: 'Medium (135%)', value: '135%' },
                        { label: 'Tall (150%)', value: '150%' },
                      ],
                    },
                    colorField('placeholderFontColor', 'Font Color', '#978f6f', '50%'), // Text / Light
                  ],
                },
              ],
            },
          ],
        },
        // ── Menu Page Settings ───────────────────────────────────────────────
        {
          type: 'group',
          name: 'pageSettings',
          label: 'Menu Page Settings',
          fields: [
            colorField('backgroundColor', 'Background Color', '#ffffff', '50%'), // Surface / Light
          ],
        },
      ],
    },
  ],
}
