import type { UISectionSchema } from '../types'
import {
  checkboxField,
  selectField,
  colorField,
  assetField,
  opacityField,
  sizeField,
  numberField,
  row,
  group,
  collapsible,
  conditional,
} from '../builders'

// Font family options (matches ThemeEditor)
const fontFamilyOptions = [
  { label: 'System Default', value: 'System Default' },
  { label: 'Owners (Heading)', value: 'Owners' },
  { label: 'Stack Sans Text (Body)', value: 'Stack Sans Text' },
  { label: 'DM Mono (Accent)', value: 'DM Mono' },
]

// Font size options (mobile body sizes from ThemeEditor)
const fontSizeOptions = [
  { label: 'XXL (18px)', value: '18px' },
  { label: 'XL (16px)', value: '16px' },
  { label: 'L (14px)', value: '14px' },
  { label: 'M (12px)', value: '12px' },
  { label: 'S (11px)', value: '11px' },
  { label: 'XS (10px)', value: '10px' },
]

// Font weight options
const fontWeightOptions = [
  { label: 'Light (300)', value: '300' },
  { label: 'Regular (400)', value: '400' },
  { label: 'Medium (500)', value: '500' },
  { label: 'Semi Bold (600)', value: '600' },
  { label: 'Bold (700)', value: '700' },
  { label: 'Extra Bold (800)', value: '800' },
]

// Line height options (from ThemeEditor)
const lineHeightOptions = [
  { label: 'Small (110%)', value: '110%' },
  { label: 'Medium (135%)', value: '135%' },
  { label: 'Tall (150%)', value: '150%' },
]

export const menuSchema: UISectionSchema = {
  title: 'Menu',
  description: 'Configure the menu browsing experience',
  pathPrefix: 'menu',
  fields: [
    // ── Conveyance Bar ────────────────────────────────────────────────
    group('conveyanceBar', 'Conveyance Bar', [
      // Background Settings
      collapsible('Background Settings', [
        selectField('backgroundType', 'Background Type', [
          { label: 'Solid Color', value: 'solid' },
          { label: 'Image', value: 'image' },
        ], 'solid'),

        // Solid color background
        conditional(
          (getValue) => getValue('menu.conveyanceBar.backgroundType') === 'solid',
          [
            colorField('backgroundColor', 'Background Color', '#ffffff'), // Surface / Light
          ],
        ),

        // Image background
        conditional(
          (getValue) => getValue('menu.conveyanceBar.backgroundType') === 'image',
          [
            assetField('backgroundImage', 'Background Image', 'media'),
            row(
              colorField('backgroundImageOverlayColor', 'Overlay Color', '#0b1f22'), // Surface / Dark
              opacityField('backgroundImageOverlayOpacity', 'Overlay Opacity', 40), // Opacity / Disabled
            ),
          ],
        ),

        // Border
        row(
          colorField('borderColor', 'Border Color', '#dbdbdb'), // Border / Light
          sizeField('borderWidth', 'Border Width', '1px', { min: 0, max: 10, step: 0.5 }), // Stroke / Small
        ),
      ]),

      // Conveyance Mode Settings
      collapsible('Conveyance Mode', [
        row(
          selectField('conveyanceFontFamily', 'Font Family', fontFamilyOptions, 'Stack Sans Text'), // Body font
          selectField('conveyanceFontSize', 'Font Size', fontSizeOptions, '14px'), // Body / L
        ),
        row(
          selectField('conveyanceLineHeight', 'Line Height', lineHeightOptions, '135%'), // Line Height / Medium
          selectField('conveyanceFontWeight', 'Font Weight', fontWeightOptions, '500'), // Medium
        ),
        row(
          colorField('conveyanceFontColor', 'Font Color', '#0b1f22'), // Text / Dark
        ),
        row(
          colorField('conveyanceIconBackgroundColor', 'Icon BG Color', '#f9f8f4'), // Brand / Primary Light 200
          colorField('conveyanceIconColor', 'Icon Color', '#0b1f22'), // Brand / Primary Dark
        ),
      ]),

      // Location Settings
      collapsible('Location Display', [
        row(
          selectField('locationFontFamily', 'Font Family', fontFamilyOptions, 'Stack Sans Text'), // Body font
          selectField('locationFontSize', 'Font Size', fontSizeOptions, '12px'), // Body / M
        ),
        row(
          selectField('locationLineHeight', 'Line Height', lineHeightOptions, '135%'), // Line Height / Medium
          selectField('locationFontWeight', 'Font Weight', fontWeightOptions, '400'), // Regular
        ),
        row(
          colorField('locationFontColor', 'Font Color', '#405255'), // Text / Medium
        ),
      ]),
    ]),

    // ── Category Navigation ───────────────────────────────────────────
    group('menuCategories', 'Category Navigation', [
      colorField('backgroundColor', 'Background Color', '#ffffff'), // Surface / Light
      checkboxField('showIcons', 'Show Category Icons', true, 'Display icons next to category names'),

      // Tab Typography
      collapsible('Tab Typography', [
        row(
          selectField('tabFontFamily', 'Font Family', fontFamilyOptions, 'Stack Sans Text'), // Body font
          selectField('tabFontSize', 'Font Size', fontSizeOptions, '14px'), // Body / L
        ),
        row(
          selectField('tabLineHeight', 'Line Height', lineHeightOptions, '135%'), // Line Height / Medium
          selectField('tabFontWeight', 'Font Weight', fontWeightOptions, '500'), // Medium
        ),
        row(
          colorField('tabFontColorActive', 'Active Text Color', '#0b1f22'), // Text / Dark
          colorField('tabFontColorInactive', 'Inactive Text Color', '#949494'), // Action / Primary / Surface Inactive
        ),
      ]),

      // Underlines
      collapsible('Underlines', [
        row(
          colorField('categoryBarUnderlineColor', 'Bar Underline Color', '#dbdbdb'), // Border / Light
          colorField('tabActiveUnderlineColor', 'Active Tab Underline', '#0b1f22'), // Brand / Primary Dark
        ),
      ]),
    ]),

    // ── Category Titles ───────────────────────────────────────────────
    group('categoryTitle', 'Category Titles', [
      // Main Title
      collapsible('Category Title', [
        checkboxField('enabled', 'Show Category Title', true, 'Display category title above items'),
        row(
          selectField('fontFamily', 'Font Family', fontFamilyOptions, 'Owners'), // Heading font
          selectField('fontSize', 'Font Size', fontSizeOptions, '18px'), // Headline / Small
        ),
        row(
          selectField('lineHeight', 'Line Height', lineHeightOptions, '110%'), // Line Height / Small
          selectField('fontWeight', 'Font Weight', fontWeightOptions, '700'), // Bold
        ),
        colorField('fontColor', 'Font Color', '#0b1f22'), // Text / Dark
      ]),

      // Subtitle
      collapsible('Category Subtitle', [
        checkboxField('subEnabled', 'Show Category Subtitle', true, 'Display subtitle below category title'),
        row(
          selectField('subFontFamily', 'Font Family', fontFamilyOptions, 'Stack Sans Text'), // Body font
          selectField('subFontSize', 'Font Size', fontSizeOptions, '12px'), // Body / M
        ),
        row(
          selectField('subLineHeight', 'Line Height', lineHeightOptions, '135%'), // Line Height / Medium
          selectField('subFontWeight', 'Font Weight', fontWeightOptions, '400'), // Regular
        ),
        colorField('subFontColor', 'Font Color', '#405255'), // Text / Medium
      ]),
    ]),

    // ── Product Card ──────────────────────────────────────────────────
    group('productCard', 'Product Card', [
      // Card Version & Display Options
      collapsible('Display Options', [
        selectField('version', 'Card Version', [
          { label: 'Horizontal', value: 'horizontal' },
        ], 'horizontal'),
        checkboxField('showTags', 'Show Tags', true, 'Display product tags'),
        checkboxField('showQuickAdd', 'Show Quick Add', true, 'Display quick add button'),
        checkboxField('showPriceAndCalories', 'Show Price & Calories', true, 'Display price and calorie info'),
        checkboxField('showDescription', 'Show Description', true, 'Display product description'),
      ]),

      // Card Styling
      collapsible('Card Styling', [
        row(
          colorField('backgroundColor', 'Background Color', '#ffffff'), // Surface / Light
          colorField('stripeBackgroundColor', 'Stripe BG Color', '#f9f8f4'), // Surface / Stripe
        ),
        row(
          colorField('borderColor', 'Border Color', '#dbdbdb'), // Border / Light
          sizeField('borderWidth', 'Border Width', '1px', { min: 0, max: 10, step: 0.5 }), // Stroke / Small
        ),
        numberField('imageBorderRadius', 'Image Border Radius', 12, { min: 0, max: 50 }), // Radius / Small
      ]),

      // Tag Styling
      collapsible('Tag Styling', [
        row(
          selectField('tagFontFamily', 'Font Family', fontFamilyOptions, 'Stack Sans Text'), // Body font
          selectField('tagFontSize', 'Font Size', fontSizeOptions, '10px'), // Body / XS
        ),
        row(
          selectField('tagLineHeight', 'Line Height', lineHeightOptions, '110%'), // Line Height / Small
          colorField('tagFontColor', 'Font Color', '#0b1f22'), // Text / Dark
        ),
        row(
          colorField('tagBackgroundColor', 'Tag BG Color', '#f9f8f4'), // Surface / Stripe
          numberField('tagBorderRadius', 'Border Radius', 4, { min: 0, max: 24 }), // Radius / XX-Small
        ),
      ]),

      // Title Typography
      collapsible('Title Typography', [
        row(
          selectField('titleFontFamily', 'Font Family', fontFamilyOptions, 'Owners'), // Heading font
          selectField('titleFontSize', 'Font Size', fontSizeOptions, '14px'), // Headline / XS
        ),
        row(
          selectField('titleLineHeight', 'Line Height', lineHeightOptions, '110%'), // Line Height / Small
          colorField('titleFontColor', 'Font Color', '#0b1f22'), // Text / Dark
        ),
      ]),

      // Description Typography
      collapsible('Description Typography', [
        row(
          selectField('descriptionFontFamily', 'Font Family', fontFamilyOptions, 'Stack Sans Text'), // Body font
          selectField('descriptionFontSize', 'Font Size', fontSizeOptions, '12px'), // Body / M
        ),
        row(
          selectField('descriptionLineHeight', 'Line Height', lineHeightOptions, '135%'), // Line Height / Medium
          colorField('descriptionFontColor', 'Font Color', '#405255'), // Text / Medium
        ),
      ]),

      // Price Typography
      collapsible('Price Typography', [
        row(
          selectField('priceFontFamily', 'Font Family', fontFamilyOptions, 'Stack Sans Text'), // Body font
          selectField('priceFontSize', 'Font Size', fontSizeOptions, '14px'), // Body / L
        ),
        row(
          selectField('priceLineHeight', 'Line Height', lineHeightOptions, '135%'), // Line Height / Medium
          colorField('priceFontColor', 'Font Color', '#0b1f22'), // Text / Dark
        ),
      ]),

      // Calories Typography
      collapsible('Calories Typography', [
        row(
          selectField('caloriesFontFamily', 'Font Family', fontFamilyOptions, 'Stack Sans Text'), // Body font
          selectField('caloriesFontSize', 'Font Size', fontSizeOptions, '12px'), // Body / M
        ),
        row(
          selectField('caloriesLineHeight', 'Line Height', lineHeightOptions, '135%'), // Line Height / Medium
          colorField('caloriesFontColor', 'Font Color', '#978f6f'), // Text / Light
        ),
      ]),

      // Quick Add Button
      collapsible('Quick Add Button', [
        row(
          colorField('quickAddIconColor', 'Icon Color', '#ffffff'), // Surface / Light
          colorField('quickAddBackgroundColor', 'BG Color', '#0b1f22'), // Brand / Primary Dark
        ),
        numberField('quickAddBorderRadius', 'Border Radius', 1000, { min: 0, max: 1000 }), // Radius / Full
      ]),
    ]),

    // ── Conveyance Selection Modal ────────────────────────────────────
    group('conveyanceModal', 'Conveyance Selection Modal', [
      // Modal Container
      collapsible('Modal Container', [
        row(
          colorField('backgroundColor', 'Background Color', '#ffffff'), // Surface / Light
          numberField('borderRadius', 'Border Radius', 16, { min: 0, max: 50 }), // Radius / Medium
        ),
      ]),

      // Close Icon
      collapsible('Close Icon', [
        row(
          colorField('closeIconColor', 'Icon Color', '#0b1f22'), // Surface / Dark
          colorField('closeIconBackgroundColor', 'BG Color', '#f9f8f4'), // Surface / Stripe
        ),
        numberField('closeIconBorderRadius', 'Border Radius', 1000, { min: 0, max: 1000 }), // Radius / Full
      ]),

      // Modal Title Typography
      collapsible('Modal Title', [
        row(
          selectField('headerFontFamily', 'Font Family', fontFamilyOptions, 'Owners'), // Heading font
          selectField('headerFontSize', 'Font Size', fontSizeOptions, '18px'), // Headline / Small
        ),
        row(
          selectField('headerLineHeight', 'Line Height', lineHeightOptions, '110%'), // Line Height / Small
          colorField('headerFontColor', 'Font Color', '#0b1f22'), // Text / Dark
        ),
      ]),

      // Panel Styling
      collapsible('Panel Styling', [
        row(
          colorField('panelBackgroundColor', 'BG Color', '#f9f8f4'), // Surface / Stripe
          numberField('panelBorderRadius', 'Border Radius', 12, { min: 0, max: 50 }), // Radius / Small
        ),
        row(
          colorField('panelBorderColor', 'Border Color', '#dbdbdb'), // Border / Light
          sizeField('panelBorderWidth', 'Border Width', '1px', { min: 0, max: 10, step: 0.5 }), // Stroke / Small
        ),
      ]),

      // Location Title Typography
      collapsible('Location Title', [
        row(
          selectField('locationTitleFontFamily', 'Font Family', fontFamilyOptions, 'Owners'), // Heading font
          selectField('locationTitleFontSize', 'Font Size', fontSizeOptions, '14px'), // Headline / XS
        ),
        row(
          selectField('locationTitleLineHeight', 'Line Height', lineHeightOptions, '110%'), // Line Height / Small
          colorField('locationTitleFontColor', 'Font Color', '#0b1f22'), // Text / Dark
        ),
      ]),

      // Location Subtitle Typography
      collapsible('Location Subtitle', [
        row(
          selectField('locationSubFontFamily', 'Font Family', fontFamilyOptions, 'Stack Sans Text'), // Body font
          selectField('locationSubFontSize', 'Font Size', fontSizeOptions, '12px'), // Body / M
        ),
        row(
          selectField('locationSubLineHeight', 'Line Height', lineHeightOptions, '135%'), // Line Height / Medium
          colorField('locationSubFontColor', 'Font Color', '#405255'), // Text / Medium
        ),
      ]),

      // Meta Typography
      collapsible('Meta Typography', [
        row(
          selectField('metaFontFamily', 'Font Family', fontFamilyOptions, 'Stack Sans Text'), // Body font
          selectField('metaFontSize', 'Font Size', fontSizeOptions, '11px'), // Body / S
        ),
        row(
          selectField('metaLineHeight', 'Line Height', lineHeightOptions, '135%'), // Line Height / Medium
          colorField('metaFontColor', 'Font Color', '#978f6f'), // Text / Light
        ),
      ]),

      // Status & Icon Colors
      collapsible('Status & Icons', [
        row(
          colorField('statusDotColor', 'Status Dot Color', '#2fddd0'), // Utility / Positive
          colorField('iconColor', 'Icon Color', '#0b1f22'), // Brand / Primary Dark
        ),
      ]),

      // Primary Button
      collapsible('Primary Button', [
        row(
          colorField('primaryButtonBackgroundColor', 'BG Color', '#0b1f22'), // Action / Primary / BG Active
          colorField('primaryButtonFontColor', 'Font Color', '#ffffff'), // Action / Primary / Surface Active
        ),
        row(
          selectField('primaryButtonFontFamily', 'Font Family', fontFamilyOptions, 'Stack Sans Text'), // Action font
          selectField('primaryButtonFontSize', 'Font Size', fontSizeOptions, '14px'), // Body / L
        ),
        row(
          selectField('primaryButtonLineHeight', 'Line Height', lineHeightOptions, '135%'), // Line Height / Medium
          numberField('primaryButtonBorderRadius', 'Border Radius', 12, { min: 0, max: 50 }), // Radius / Small
        ),
        row(
          colorField('primaryButtonBorderColor', 'Border Color', '#0b1f22'), // Brand / Primary Dark
          sizeField('primaryButtonBorderWidth', 'Border Width', '1px', { min: 0, max: 10, step: 0.5 }), // Stroke / Small
        ),
      ]),

      // Secondary Button
      collapsible('Secondary Button', [
        row(
          colorField('secondaryButtonBackgroundColor', 'BG Color', '#fc5a44'), // Action / Secondary / BG Active
          colorField('secondaryButtonFontColor', 'Font Color', '#0b1f22'), // Action / Secondary / Surface Active
        ),
        row(
          selectField('secondaryButtonFontFamily', 'Font Family', fontFamilyOptions, 'Stack Sans Text'), // Action font
          selectField('secondaryButtonFontSize', 'Font Size', fontSizeOptions, '14px'), // Body / L
        ),
        row(
          selectField('secondaryButtonLineHeight', 'Line Height', lineHeightOptions, '135%'), // Line Height / Medium
          numberField('secondaryButtonBorderRadius', 'Border Radius', 12, { min: 0, max: 50 }), // Radius / Small
        ),
        row(
          colorField('secondaryButtonBorderColor', 'Border Color', '#fc5a44'), // Action / Secondary / BG Active
          sizeField('secondaryButtonBorderWidth', 'Border Width', '1px', { min: 0, max: 10, step: 0.5 }), // Stroke / Small
        ),
      ]),

      // Section Title Typography
      collapsible('Section Title', [
        row(
          selectField('sectionTitleFontFamily', 'Font Family', fontFamilyOptions, 'Owners'), // Heading font
          selectField('sectionTitleFontSize', 'Font Size', fontSizeOptions, '16px'), // Headline / XS+
        ),
        row(
          selectField('sectionTitleLineHeight', 'Line Height', lineHeightOptions, '110%'), // Line Height / Small
          colorField('sectionTitleFontColor', 'Font Color', '#0b1f22'), // Text / Dark
        ),
      ]),

      // Section Subtitle Typography
      collapsible('Section Subtitle', [
        row(
          selectField('sectionSubFontFamily', 'Font Family', fontFamilyOptions, 'Stack Sans Text'), // Body font
          selectField('sectionSubFontSize', 'Font Size', fontSizeOptions, '12px'), // Body / M
        ),
        row(
          selectField('sectionSubLineHeight', 'Line Height', lineHeightOptions, '135%'), // Line Height / Medium
          colorField('sectionSubFontColor', 'Font Color', '#405255'), // Text / Medium
        ),
      ]),

      // Day Card Styling
      collapsible('Day Card', [
        row(
          colorField('dayCardBackgroundColor', 'BG Color', '#ffffff'), // Surface / Light
          numberField('dayCardBorderRadius', 'Border Radius', 12, { min: 0, max: 50 }), // Radius / Small
        ),
        row(
          colorField('dayCardBorderColor', 'Border Color', '#dbdbdb'), // Border / Light
          sizeField('dayCardBorderWidth', 'Border Width', '1px', { min: 0, max: 10, step: 0.5 }), // Stroke / Small
        ),
        row(
          colorField('dayCardBackgroundColorSelected', 'Selected BG', '#f9f8f4'), // Surface / Stripe
          colorField('dayCardBorderColorSelected', 'Selected Border', '#0b1f22'), // Brand / Primary Dark
        ),
        sizeField('dayCardBorderWidthSelected', 'Selected Border Width', '2px', { min: 0, max: 10, step: 0.5 }), // Stroke / Medium
      ]),

      // Day Card Title Typography
      collapsible('Day Card Title', [
        row(
          selectField('dayCardTitleFontFamily', 'Font Family', fontFamilyOptions, 'Stack Sans Text'), // Body font
          selectField('dayCardTitleFontSize', 'Font Size', fontSizeOptions, '14px'), // Body / L
        ),
        row(
          selectField('dayCardTitleLineHeight', 'Line Height', lineHeightOptions, '135%'), // Line Height / Medium
          colorField('dayCardTitleFontColor', 'Font Color', '#0b1f22'), // Text / Dark
        ),
      ]),

      // Day Card Subtitle Typography
      collapsible('Day Card Subtitle', [
        row(
          selectField('dayCardSubFontFamily', 'Font Family', fontFamilyOptions, 'Stack Sans Text'), // Body font
          selectField('dayCardSubFontSize', 'Font Size', fontSizeOptions, '12px'), // Body / M
        ),
        row(
          selectField('dayCardSubLineHeight', 'Line Height', lineHeightOptions, '135%'), // Line Height / Medium
          colorField('dayCardSubFontColor', 'Font Color', '#405255'), // Text / Medium
        ),
      ]),

      // Day Card Radio
      collapsible('Day Card Radio', [
        row(
          colorField('dayCardRadioColor', 'Radio Color', '#dbdbdb'), // Border / Light
          colorField('dayCardRadioColorSelected', 'Selected Radio', '#0b1f22'), // Brand / Primary Dark
        ),
      ]),

      // Time Row Styling
      collapsible('Time Row', [
        row(
          colorField('timeRowBorderColor', 'Border Color', '#dbdbdb'), // Border / Light
          sizeField('timeRowBorderWidth', 'Border Width', '1px', { min: 0, max: 10, step: 0.5 }), // Stroke / Small
        ),
        row(
          colorField('timeRowRadioColor', 'Radio Color', '#dbdbdb'), // Border / Light
          colorField('timeRowRadioColorSelected', 'Selected Radio', '#0b1f22'), // Brand / Primary Dark
        ),
      ]),

      // Time Row Title Typography
      collapsible('Time Row Title', [
        row(
          selectField('timeRowTitleFontFamily', 'Font Family', fontFamilyOptions, 'Stack Sans Text'), // Body font
          selectField('timeRowTitleFontSize', 'Font Size', fontSizeOptions, '14px'), // Body / L
        ),
        row(
          selectField('timeRowTitleLineHeight', 'Line Height', lineHeightOptions, '135%'), // Line Height / Medium
          colorField('timeRowTitleFontColor', 'Font Color', '#0b1f22'), // Text / Dark
        ),
      ]),

      // Time Row Subtitle Typography
      collapsible('Time Row Subtitle', [
        row(
          selectField('timeRowSubFontFamily', 'Font Family', fontFamilyOptions, 'Stack Sans Text'), // Body font
          selectField('timeRowSubFontSize', 'Font Size', fontSizeOptions, '12px'), // Body / M
        ),
        row(
          selectField('timeRowSubLineHeight', 'Line Height', lineHeightOptions, '135%'), // Line Height / Medium
          colorField('timeRowSubFontColor', 'Font Color', '#405255'), // Text / Medium
        ),
      ]),
    ]),

    // ── Menu Search ────────────────────────────────────────────────────
    group('menuSearch', 'Menu Search', [
      checkboxField('enabled', 'Enable Search', true, 'Show search bar on menu'),

      // Input Styling
      collapsible('Input Styling', [
        row(
          colorField('backgroundColor', 'Background Color', '#ffffff'), // Surface / Light
          colorField('borderColor', 'Border Color', '#dbdbdb'), // Border / Light
        ),
        row(
          sizeField('borderWidth', 'Border Width', '1px', { min: 0, max: 10, step: 0.5 }), // Stroke / Small
          numberField('borderRadius', 'Border Radius', 12, { min: 0, max: 50 }), // Radius / Small
        ),
      ]),

      // Text Typography
      collapsible('Text Typography', [
        row(
          selectField('textFontFamily', 'Font Family', fontFamilyOptions, 'Stack Sans Text'), // Body font
          selectField('textFontSize', 'Font Size', fontSizeOptions, '14px'), // Body / L
        ),
        row(
          selectField('textLineHeight', 'Line Height', lineHeightOptions, '135%'), // Line Height / Medium
          colorField('textFontColor', 'Font Color', '#0b1f22'), // Text / Dark
        ),
      ]),

      // Placeholder Typography
      collapsible('Placeholder Typography', [
        row(
          selectField('placeholderFontFamily', 'Font Family', fontFamilyOptions, 'Stack Sans Text'), // Body font
          selectField('placeholderFontSize', 'Font Size', fontSizeOptions, '14px'), // Body / L
        ),
        row(
          selectField('placeholderLineHeight', 'Line Height', lineHeightOptions, '135%'), // Line Height / Medium
          colorField('placeholderFontColor', 'Font Color', '#978f6f'), // Text / Light
        ),
      ]),

    ]),

    // ── Menu Page Settings ───────────────────────────────────────────────
    group('pageSettings', 'Menu Page Settings', [
      colorField('backgroundColor', 'Background Color', '#ffffff'), // Surface / Light
    ]),
  ],
}
