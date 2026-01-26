import type { GlobalConfig, Field } from 'payload'

// Component paths for custom field UI
const ColorPicker = '/components/fields/ColorPickerField'
const SizeSlider = '/components/fields/SizeSliderField'
const OpacitySlider = '/components/fields/OpacitySliderField'
const FontWeightSelect = '/components/fields/FontWeightField'

// Helper to create a color field with picker
const colorField = (name: string, label: string, defaultValue: string, width = '50%'): Field => ({
  name,
  type: 'text',
  label,
  defaultValue,
  admin: {
    width,
    components: {
      Field: ColorPicker,
    },
  },
})

// Helper to create a size/spacing field with slider
const sizeField = (
  name: string,
  label: string,
  defaultValue: string,
  options: { min?: number; max?: number; step?: number; unit?: string; width?: string } = {},
): Field => ({
  name,
  type: 'text',
  label,
  defaultValue,
  admin: {
    width: options.width || '50%',
    components: {
      Field: SizeSlider,
    },
    custom: {
      min: options.min ?? 0,
      max: options.max ?? 100,
      step: options.step ?? 1,
      unit: options.unit ?? 'px',
    },
  },
})

// Helper for font weight fields
const fontWeightField = (name: string, label: string, defaultValue: string, width = '50%'): Field => ({
  name,
  type: 'text',
  label,
  defaultValue,
  admin: {
    width,
    components: {
      Field: FontWeightSelect,
    },
  },
})

// Helper for feature flag toggle
const featureFlag = (name: string, label: string, description: string, defaultValue = false): Field => ({
  name,
  type: 'checkbox',
  label,
  defaultValue,
  admin: {
    description,
  },
})

export const ThemeEditor: GlobalConfig = {
  slug: 'theme-editor',
  label: 'Global Theme Editor',
  admin: {
    group: 'Frontend Experiences',
    hideAPIURL: true,
    livePreview: {
      url: () => `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/preview`,
    },
    components: {
      views: {
        edit: {
          root: {
            Component: '/components/admin/ThemeEditorRedirect',
          },
        },
      },
    },
  },
  versions: {
    drafts: true,
    max: 10,
  },
  fields: [
    // Top-level tabs for icon sidebar navigation
    {
      type: 'tabs',
      tabs: [
        // ═══════════════════════════════════════════════════════════════════════
        // STYLES TAB (paintbrush icon)
        // ═══════════════════════════════════════════════════════════════════════
        {
          name: 'styles',
          label: 'Styles',
          fields: [
            // Colors Section
            {
              type: 'collapsible',
              label: 'Colors',
              admin: { initCollapsed: true },
              fields: [
                // Brand Colors
                {
                  type: 'collapsible',
                  label: 'Brand',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        colorField('brandPrimaryLight', 'Primary Light', '#2fddd0'),
                        colorField('brandPrimaryLight400', 'Primary Light 400', '#bbf2e8'),
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        colorField('brandPrimaryLight200', 'Primary Light 200', '#f9f8f4'),
                        colorField('brandPrimaryLight50', 'Primary Light 50', '#ffffff'),
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        colorField('brandPrimaryDark', 'Primary Dark', '#0b1f22'),
                        colorField('brandPrimaryDark400', 'Primary Dark 400', '#133c45'),
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        colorField('brandPrimaryDark200', 'Primary Dark 200', '#1e5a67'),
                        colorField('brandPrimaryDark50', 'Primary Dark 50', '#308597'),
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        colorField('brandSecondarySlot1', 'Secondary 1', '#fc5a44'),
                        colorField('brandSecondarySlot2', 'Secondary 2', '#ff784e'),
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        colorField('brandSecondarySlot3', 'Secondary 3', '#ff9a70'),
                        colorField('brandSecondarySlot4', 'Secondary 4', '#ffe029'),
                      ],
                    },
                  ],
                },
                // Surface Colors
                {
                  type: 'collapsible',
                  label: 'Surfaces',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        colorField('surfaceLight', 'Light', '#ffffff'),
                        colorField('surfaceStripe', 'Stripe', '#f9f8f4'),
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        colorField('surfaceDark', 'Dark', '#0b1f22'),
                      ],
                    },
                  ],
                },
                // Text Colors
                {
                  type: 'collapsible',
                  label: 'Text',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        colorField('textDark', 'Dark', '#0b1f22'),
                        colorField('textMedium', 'Medium', '#405255'),
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        colorField('textLight', 'Light', '#978f6f'),
                        colorField('textAccent', 'Accent', '#fc5a44'),
                      ],
                    },
                  ],
                },
                // Border Colors
                {
                  type: 'collapsible',
                  label: 'Borders',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        colorField('borderLight', 'Light', '#dbdbdb'),
                        colorField('borderDark', 'Dark', '#0b1f22'),
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        colorField('borderExtraLight', 'Extra Light', '#f9f8f4'),
                      ],
                    },
                  ],
                },
                // Utility Colors
                {
                  type: 'collapsible',
                  label: 'Utility',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        colorField('utilityWarning', 'Warning', '#ffe029'),
                        colorField('utilityPositive', 'Positive', '#2fddd0'),
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        colorField('utilityFailure', 'Failure', '#aa1400'),
                        colorField('utilityFocus', 'Focus', '#1c41ff'),
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        colorField('utilityNativeControl', 'Native Control', '#deddd6'),
                      ],
                    },
                  ],
                },
                // Form Field Colors
                {
                  type: 'collapsible',
                  label: 'Form Fields',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        colorField('fieldBorderInactive', 'Border Inactive', '#dbdbdb'),
                        colorField('fieldBorderActive', 'Border Active', '#0b1f22'),
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        colorField('fieldError', 'Error', '#aa1400'),
                        colorField('fieldPlaceholder', 'Placeholder', '#978f6f'),
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        colorField('fieldInput', 'Input', '#0b1f22'),
                      ],
                    },
                  ],
                },
                // Overlay
                {
                  type: 'collapsible',
                  label: 'Overlay',
                  admin: { initCollapsed: true },
                  fields: [
                    { name: 'overlayDark', type: 'text', label: 'Dark Overlay', defaultValue: 'rgba(11, 31, 34, 0.4)' },
                  ],
                },
                // Action Colors
                {
                  type: 'collapsible',
                  label: 'Actions',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: 'group',
                      name: 'actionPrimary',
                      label: 'Primary Actions',
                      fields: [
                        {
                          type: 'row',
                          fields: [
                            colorField('bgActive', 'BG Active', '#0b1f22'),
                            colorField('bgInactive', 'BG Inactive', '#dddddd'),
                          ],
                        },
                        {
                          type: 'row',
                          fields: [
                            colorField('bgHover', 'BG Hover', '#fc5a44'),
                            colorField('bgPressed', 'BG Pressed', '#040e0f'),
                          ],
                        },
                        {
                          type: 'row',
                          fields: [
                            colorField('surfaceActive', 'Surface Active', '#ffffff'),
                            colorField('surfaceInactive', 'Surface Inactive', '#949494'),
                          ],
                        },
                        {
                          type: 'row',
                          fields: [
                            colorField('surfaceHover', 'Surface Hover', '#0b1f22'),
                            colorField('surfacePressed', 'Surface Pressed', '#ffffff'),
                          ],
                        },
                      ],
                    },
                    {
                      type: 'group',
                      name: 'actionSecondary',
                      label: 'Secondary Actions',
                      fields: [
                        {
                          type: 'row',
                          fields: [
                            colorField('bgActive', 'BG Active', '#fc5a44'),
                            colorField('bgInactive', 'BG Inactive', '#d3d3d3'),
                          ],
                        },
                        {
                          type: 'row',
                          fields: [
                            colorField('bgHover', 'BG Hover', '#ff784e'),
                            colorField('bgPressed', 'BG Pressed', '#aa1400'),
                          ],
                        },
                        {
                          type: 'row',
                          fields: [
                            colorField('surfaceActive', 'Surface Active', '#0b1f22'),
                            colorField('surfaceInactive', 'Surface Inactive', '#5b5b5b'),
                          ],
                        },
                        {
                          type: 'row',
                          fields: [
                            colorField('surfaceHover', 'Surface Hover', '#393737'),
                            colorField('surfacePressed', 'Surface Pressed', '#ffffff'),
                          ],
                        },
                      ],
                    },
                    {
                      type: 'group',
                      name: 'actionText',
                      label: 'Text Actions',
                      fields: [
                        {
                          type: 'row',
                          fields: [
                            colorField('surfaceActive', 'Surface Active', '#0b1f22'),
                            colorField('surfaceInactive', 'Surface Inactive', '#5d5d5d'),
                          ],
                        },
                        {
                          type: 'row',
                          fields: [
                            colorField('surfaceHover', 'Surface Hover', '#fc5a44'),
                            colorField('surfacePressed', 'Surface Pressed', '#0b1f22'),
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            // Typography Section
            {
              type: 'collapsible',
              label: 'Typography',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'collapsible',
                  label: 'Font Families',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'fontFamilyHeading', type: 'text', label: 'Heading', defaultValue: 'Owners', admin: { width: '50%' } },
                        { name: 'fontFamilyBody', type: 'text', label: 'Body', defaultValue: 'Stack Sans Text', admin: { width: '50%' } },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        { name: 'fontFamilyAccent', type: 'text', label: 'Accent', defaultValue: 'DM Mono', admin: { width: '50%' } },
                        { name: 'fontFamilyAction', type: 'text', label: 'Action', defaultValue: 'Stack Sans Text', admin: { width: '50%' } },
                      ],
                    },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Font Weights',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        fontWeightField('fontWeightLight', 'Light', '300'),
                        fontWeightField('fontWeightRegular', 'Regular', '400'),
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        fontWeightField('fontWeightMedium', 'Medium', '500'),
                        fontWeightField('fontWeightSemiBold', 'Semi Bold', '600'),
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        fontWeightField('fontWeightBold', 'Bold', '700'),
                        fontWeightField('fontWeightExtraBold', 'Extra Bold', '800'),
                      ],
                    },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Line Heights',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        sizeField('lineHeightSmall', 'Small', '110%', { min: 100, max: 200, step: 5, unit: '%' }),
                        sizeField('lineHeightMedium', 'Medium', '135%', { min: 100, max: 200, step: 5, unit: '%' }),
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        sizeField('lineHeightTall', 'Tall', '150%', { min: 100, max: 200, step: 5, unit: '%' }),
                      ],
                    },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Letter Spacing',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        sizeField('letterSpacingTight', 'Tight', '-1.5px', { min: -5, max: 5, step: 0.5, unit: 'px' }),
                        sizeField('letterSpacingWide', 'Wide', '1.5px', { min: -5, max: 5, step: 0.5, unit: 'px' }),
                      ],
                    },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Desktop Font Sizes',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: 'group',
                      name: 'desktopFontSizeDisplay',
                      label: 'Display',
                      fields: [
                        {
                          type: 'row',
                          fields: [
                            sizeField('xxl', 'XXL', '98px', { min: 40, max: 150 }),
                            sizeField('xl', 'XL', '68px', { min: 30, max: 120 }),
                          ],
                        },
                        {
                          type: 'row',
                          fields: [
                            sizeField('lg', 'L', '60px', { min: 24, max: 100 }),
                            sizeField('md', 'M', '48px', { min: 20, max: 80 }),
                          ],
                        },
                        {
                          type: 'row',
                          fields: [
                            sizeField('sm', 'S', '40px', { min: 16, max: 60 }),
                          ],
                        },
                      ],
                    },
                    {
                      type: 'group',
                      name: 'desktopFontSizeHeadline',
                      label: 'Headline',
                      fields: [
                        {
                          type: 'row',
                          fields: [
                            sizeField('xxl', 'XXL', '60px', { min: 24, max: 100 }),
                            sizeField('xl', 'XL', '48px', { min: 20, max: 80 }),
                          ],
                        },
                        {
                          type: 'row',
                          fields: [
                            sizeField('lg', 'L', '40px', { min: 18, max: 60 }),
                            sizeField('md', 'M', '32px', { min: 14, max: 50 }),
                          ],
                        },
                        {
                          type: 'row',
                          fields: [
                            sizeField('sm', 'S', '24px', { min: 12, max: 40 }),
                            sizeField('xs', 'XS', '16px', { min: 10, max: 30 }),
                          ],
                        },
                      ],
                    },
                    {
                      type: 'group',
                      name: 'desktopFontSizeBody',
                      label: 'Body',
                      fields: [
                        {
                          type: 'row',
                          fields: [
                            sizeField('xxl', 'XXL', '20px', { min: 12, max: 32 }),
                            sizeField('xl', 'XL', '18px', { min: 10, max: 28 }),
                          ],
                        },
                        {
                          type: 'row',
                          fields: [
                            sizeField('lg', 'L', '16px', { min: 10, max: 24 }),
                            sizeField('md', 'M', '14px', { min: 8, max: 20 }),
                          ],
                        },
                        {
                          type: 'row',
                          fields: [
                            sizeField('sm', 'S', '12px', { min: 8, max: 18 }),
                            sizeField('xs', 'XS', '11px', { min: 8, max: 16 }),
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Mobile Font Sizes',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: 'group',
                      name: 'mobileFontSizeDisplay',
                      label: 'Display',
                      fields: [
                        {
                          type: 'row',
                          fields: [
                            sizeField('xxl', 'XXL', '68px', { min: 32, max: 100 }),
                            sizeField('xl', 'XL', '60px', { min: 28, max: 90 }),
                          ],
                        },
                        {
                          type: 'row',
                          fields: [
                            sizeField('lg', 'L', '48px', { min: 24, max: 80 }),
                            sizeField('md', 'M', '40px', { min: 20, max: 60 }),
                          ],
                        },
                        {
                          type: 'row',
                          fields: [
                            sizeField('sm', 'S', '32px', { min: 16, max: 50 }),
                          ],
                        },
                      ],
                    },
                    {
                      type: 'group',
                      name: 'mobileFontSizeHeadline',
                      label: 'Headline',
                      fields: [
                        {
                          type: 'row',
                          fields: [
                            sizeField('xxl', 'XXL', '48px', { min: 20, max: 80 }),
                            sizeField('xl', 'XL', '40px', { min: 18, max: 60 }),
                          ],
                        },
                        {
                          type: 'row',
                          fields: [
                            sizeField('lg', 'L', '32px', { min: 16, max: 50 }),
                            sizeField('md', 'M', '24px', { min: 14, max: 40 }),
                          ],
                        },
                        {
                          type: 'row',
                          fields: [
                            sizeField('sm', 'S', '18px', { min: 12, max: 30 }),
                            sizeField('xs', 'XS', '14px', { min: 10, max: 24 }),
                          ],
                        },
                      ],
                    },
                    {
                      type: 'group',
                      name: 'mobileFontSizeBody',
                      label: 'Body',
                      fields: [
                        {
                          type: 'row',
                          fields: [
                            sizeField('xxl', 'XXL', '18px', { min: 10, max: 28 }),
                            sizeField('xl', 'XL', '16px', { min: 10, max: 24 }),
                          ],
                        },
                        {
                          type: 'row',
                          fields: [
                            sizeField('lg', 'L', '14px', { min: 8, max: 20 }),
                            sizeField('md', 'M', '12px', { min: 8, max: 18 }),
                          ],
                        },
                        {
                          type: 'row',
                          fields: [
                            sizeField('sm', 'S', '11px', { min: 8, max: 16 }),
                            sizeField('xs', 'XS', '10px', { min: 8, max: 14 }),
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            // Spacing Section
            {
              type: 'collapsible',
              label: 'Spacing',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'collapsible',
                  label: 'Desktop Vertical',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: 'group',
                      name: 'desktopSpacingVertical',
                      label: false,
                      fields: [
                        { type: 'row', fields: [sizeField('tiny', 'Tiny', '4px', { min: 0, max: 16 }), sizeField('small', 'Small', '6px', { min: 0, max: 20 })] },
                        { type: 'row', fields: [sizeField('medium', 'Medium', '8px', { min: 0, max: 24 }), sizeField('large', 'Large', '12px', { min: 0, max: 32 })] },
                        { type: 'row', fields: [sizeField('xlarge', 'X-Large', '16px', { min: 0, max: 40 }), sizeField('xxlarge', 'XX-Large', '20px', { min: 0, max: 48 })] },
                        { type: 'row', fields: [sizeField('jumbo', 'Jumbo', '24px', { min: 0, max: 56 }), sizeField('mega', 'Mega', '32px', { min: 0, max: 64 })] },
                        { type: 'row', fields: [sizeField('ultra', 'Ultra', '40px', { min: 0, max: 80 }), sizeField('giga', 'Giga', '48px', { min: 0, max: 96 })] },
                        { type: 'row', fields: [sizeField('titan', 'Titan', '60px', { min: 0, max: 120 }), sizeField('colosal', 'Colosal', '68px', { min: 0, max: 140 })] },
                      ],
                    },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Desktop Horizontal',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: 'group',
                      name: 'desktopSpacingHorizontal',
                      label: false,
                      fields: [
                        { type: 'row', fields: [sizeField('small', 'Small', '6px', { min: 0, max: 20 }), sizeField('medium', 'Medium', '8px', { min: 0, max: 24 })] },
                        { type: 'row', fields: [sizeField('large', 'Large', '12px', { min: 0, max: 32 }), sizeField('xlarge', 'X-Large', '16px', { min: 0, max: 40 })] },
                        { type: 'row', fields: [sizeField('xxlarge', 'XX-Large', '20px', { min: 0, max: 48 }), sizeField('jumbo', 'Jumbo', '24px', { min: 0, max: 56 })] },
                        { type: 'row', fields: [sizeField('mega', 'Mega', '32px', { min: 0, max: 64 }), sizeField('ultra', 'Ultra', '40px', { min: 0, max: 80 })] },
                        { type: 'row', fields: [sizeField('giga', 'Giga', '48px', { min: 0, max: 96 }), sizeField('titan', 'Titan', '60px', { min: 0, max: 120 })] },
                        { type: 'row', fields: [sizeField('colosal', 'Colosal', '68px', { min: 0, max: 140 })] },
                      ],
                    },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Mobile Vertical',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: 'group',
                      name: 'mobileSpacingVertical',
                      label: false,
                      fields: [
                        { type: 'row', fields: [sizeField('tiny', 'Tiny', '4px', { min: 0, max: 12 }), sizeField('small', 'Small', '4px', { min: 0, max: 16 })] },
                        { type: 'row', fields: [sizeField('medium', 'Medium', '6px', { min: 0, max: 20 }), sizeField('large', 'Large', '8px', { min: 0, max: 24 })] },
                        { type: 'row', fields: [sizeField('xlarge', 'X-Large', '12px', { min: 0, max: 32 }), sizeField('xxlarge', 'XX-Large', '16px', { min: 0, max: 40 })] },
                        { type: 'row', fields: [sizeField('jumbo', 'Jumbo', '20px', { min: 0, max: 48 }), sizeField('mega', 'Mega', '24px', { min: 0, max: 56 })] },
                        { type: 'row', fields: [sizeField('ultra', 'Ultra', '32px', { min: 0, max: 64 }), sizeField('giga', 'Giga', '40px', { min: 0, max: 80 })] },
                        { type: 'row', fields: [sizeField('titan', 'Titan', '48px', { min: 0, max: 96 }), sizeField('colosal', 'Colosal', '60px', { min: 0, max: 120 })] },
                      ],
                    },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Mobile Horizontal',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: 'group',
                      name: 'mobileSpacingHorizontal',
                      label: false,
                      fields: [
                        { type: 'row', fields: [sizeField('small', 'Small', '4px', { min: 0, max: 16 }), sizeField('medium', 'Medium', '6px', { min: 0, max: 20 })] },
                        { type: 'row', fields: [sizeField('large', 'Large', '8px', { min: 0, max: 24 }), sizeField('xlarge', 'X-Large', '12px', { min: 0, max: 32 })] },
                        { type: 'row', fields: [sizeField('xxlarge', 'XX-Large', '16px', { min: 0, max: 40 }), sizeField('jumbo', 'Jumbo', '20px', { min: 0, max: 48 })] },
                        { type: 'row', fields: [sizeField('mega', 'Mega', '24px', { min: 0, max: 56 }), sizeField('ultra', 'Ultra', '32px', { min: 0, max: 64 })] },
                        { type: 'row', fields: [sizeField('giga', 'Giga', '40px', { min: 0, max: 80 }), sizeField('titan', 'Titan', '48px', { min: 0, max: 96 })] },
                        { type: 'row', fields: [sizeField('colosal', 'Colosal', '60px', { min: 0, max: 120 })] },
                      ],
                    },
                  ],
                },
              ],
            },

            // Effects Section
            {
              type: 'collapsible',
              label: 'Effects',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'collapsible',
                  label: 'Border Radius',
                  admin: { initCollapsed: true },
                  fields: [
                    { type: 'row', fields: [sizeField('radiusXxSmall', 'XX-Small', '2px', { min: 0, max: 8 }), sizeField('radiusExtraSmall', 'Extra Small', '8px', { min: 0, max: 16 })] },
                    { type: 'row', fields: [sizeField('radiusSmall', 'Small', '12px', { min: 0, max: 24 }), sizeField('radiusMedium', 'Medium', '16px', { min: 0, max: 32 })] },
                    { type: 'row', fields: [sizeField('radiusLarge', 'Large', '24px', { min: 0, max: 48 }), sizeField('radiusFull', 'Full', '1000px', { min: 0, max: 1000 })] },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Elevation (Shadows)',
                  admin: { initCollapsed: true },
                  fields: [
                    { name: 'elevation0', type: 'text', label: 'Level 0', defaultValue: 'none' },
                    { name: 'elevation1', type: 'text', label: 'Level 1', defaultValue: '0 1px 2px rgba(0,0,0,0.06)' },
                    { name: 'elevation2', type: 'text', label: 'Level 2', defaultValue: '0 2px 4px rgba(0,0,0,0.08)' },
                    { name: 'elevation3', type: 'text', label: 'Level 3', defaultValue: '0 4px 8px rgba(0,0,0,0.12)' },
                    { name: 'elevation4', type: 'text', label: 'Level 4', defaultValue: '0 8px 16px rgba(0,0,0,0.16)' },
                    { name: 'elevation5', type: 'text', label: 'Level 5', defaultValue: '0 12px 24px rgba(0,0,0,0.20)' },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Stroke Width',
                  admin: { initCollapsed: true },
                  fields: [
                    { type: 'row', fields: [sizeField('strokeSmall', 'Small', '1px', { min: 0, max: 4, step: 0.5 }), sizeField('strokeMedium', 'Medium', '2px', { min: 0, max: 6, step: 0.5 })] },
                    { type: 'row', fields: [sizeField('strokeLarge', 'Large', '4px', { min: 0, max: 10, step: 0.5 })] },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Opacity',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'opacityDisabled', type: 'number', label: 'Disabled', defaultValue: 40, min: 0, max: 100, admin: { width: '50%', components: { Field: OpacitySlider } } },
                        { name: 'opacityOverlay', type: 'number', label: 'Overlay', defaultValue: 60, min: 0, max: 100, admin: { width: '50%', components: { Field: OpacitySlider } } },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        { name: 'opacityHover', type: 'number', label: 'Hover', defaultValue: 85, min: 0, max: 100, admin: { width: '50%', components: { Field: OpacitySlider } } },
                        { name: 'opacityFocus', type: 'number', label: 'Focus', defaultValue: 90, min: 0, max: 100, admin: { width: '50%', components: { Field: OpacitySlider } } },
                      ],
                    },
                  ],
                },
              ],
            },

            // Motion Section
            {
              type: 'collapsible',
              label: 'Motion',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'collapsible',
                  label: 'Duration',
                  admin: { initCollapsed: true },
                  fields: [
                    { type: 'row', fields: [sizeField('durationXs', 'XS', '80ms', { min: 0, max: 200, step: 10, unit: 'ms' }), sizeField('durationSm', 'SM', '150ms', { min: 0, max: 300, step: 10, unit: 'ms' })] },
                    { type: 'row', fields: [sizeField('durationMd', 'MD', '250ms', { min: 0, max: 500, step: 10, unit: 'ms' }), sizeField('durationLg', 'LG', '400ms', { min: 0, max: 800, step: 10, unit: 'ms' })] },
                    { type: 'row', fields: [sizeField('durationXl', 'XL', '700ms', { min: 0, max: 1200, step: 10, unit: 'ms' })] },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Easing Curves',
                  admin: { initCollapsed: true },
                  fields: [
                    { name: 'easingStandard', type: 'select', label: 'Standard', defaultValue: 'cubic-bezier(0.4, 0, 0.2, 1)', options: [{ label: 'Standard', value: 'cubic-bezier(0.4, 0, 0.2, 1)' }, { label: 'Ease', value: 'ease' }, { label: 'Ease In Out', value: 'ease-in-out' }, { label: 'Linear', value: 'linear' }] },
                    { name: 'easingDecelerate', type: 'select', label: 'Decelerate', defaultValue: 'cubic-bezier(0, 0, 0.2, 1)', options: [{ label: 'Decelerate', value: 'cubic-bezier(0, 0, 0.2, 1)' }, { label: 'Ease Out', value: 'ease-out' }] },
                    { name: 'easingAccelerate', type: 'select', label: 'Accelerate', defaultValue: 'cubic-bezier(0.4, 0, 1, 1)', options: [{ label: 'Accelerate', value: 'cubic-bezier(0.4, 0, 1, 1)' }, { label: 'Ease In', value: 'ease-in' }] },
                  ],
                },
              ],
            },

            // Layout Section
            {
              type: 'collapsible',
              label: 'Layout',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'collapsible',
                  label: 'Breakpoints',
                  admin: { initCollapsed: true },
                  fields: [
                    { type: 'row', fields: [sizeField('breakpointSmall', 'Small', '480px', { min: 320, max: 768 }), sizeField('breakpointMedium', 'Medium', '768px', { min: 600, max: 1024 })] },
                    { type: 'row', fields: [sizeField('breakpointLarge', 'Large', '1440px', { min: 1024, max: 2560 })] },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Container Widths',
                  admin: { initCollapsed: true },
                  fields: [
                    { type: 'row', fields: [sizeField('containerSmall', 'Small', '980px', { min: 600, max: 1200 }), sizeField('containerLarge', 'Large', '1280px', { min: 900, max: 1800 })] },
                  ],
                },
              ],
            },
          ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // SETTINGS TAB (gear icon)
        // ═══════════════════════════════════════════════════════════════════════
        {
          name: 'settings',
          label: 'Settings',
          fields: [
            // UI Features
            {
              type: 'collapsible',
              label: 'UI Features',
              admin: { initCollapsed: false },
              fields: [
                featureFlag('enableDarkMode', 'Dark Mode', 'Allow users to toggle between light and dark themes'),
                featureFlag('enableAnimations', 'Animations', 'Enable motion and transition effects throughout the site', true),
                featureFlag('enableStickyHeader', 'Sticky Header', 'Keep the header fixed at the top when scrolling', true),
                featureFlag('enableBackToTop', 'Back to Top Button', 'Show a button to scroll back to the top of the page'),
                featureFlag('enableBreadcrumbs', 'Breadcrumbs', 'Show breadcrumb navigation on interior pages', true),
              ],
            },
            // E-commerce Features
            {
              type: 'collapsible',
              label: 'E-commerce',
              admin: { initCollapsed: true },
              fields: [
                featureFlag('enableQuickView', 'Quick View', 'Allow users to preview products without leaving the page'),
                featureFlag('enableWishlist', 'Wishlist', 'Allow users to save products to a wishlist'),
                featureFlag('enableCompare', 'Product Compare', 'Allow users to compare multiple products'),
                featureFlag('enableReviews', 'Product Reviews', 'Show customer reviews on product pages', true),
                featureFlag('enableRecentlyViewed', 'Recently Viewed', 'Show recently viewed products', true),
                featureFlag('enableStockNotify', 'Stock Notifications', 'Allow users to sign up for back-in-stock alerts'),
              ],
            },
            // Navigation Features
            {
              type: 'collapsible',
              label: 'Navigation',
              admin: { initCollapsed: true },
              fields: [
                featureFlag('enableMegaMenu', 'Mega Menu', 'Use expanded mega menu for main navigation', true),
                featureFlag('enableSearch', 'Site Search', 'Enable the search functionality', true),
                featureFlag('enableSearchSuggestions', 'Search Suggestions', 'Show autocomplete suggestions in search'),
                featureFlag('enableMobileDrawer', 'Mobile Drawer Menu', 'Use a drawer-style menu on mobile', true),
              ],
            },
            // Performance Features
            {
              type: 'collapsible',
              label: 'Performance',
              admin: { initCollapsed: true },
              fields: [
                featureFlag('enableLazyLoad', 'Lazy Loading', 'Lazy load images and components below the fold', true),
                featureFlag('enableImageOptimization', 'Image Optimization', 'Automatically optimize images for web', true),
                featureFlag('enablePrefetch', 'Link Prefetching', 'Prefetch linked pages on hover'),
              ],
            },
            // Marketing Features
            {
              type: 'collapsible',
              label: 'Marketing',
              admin: { initCollapsed: true },
              fields: [
                featureFlag('enableAnnouncement', 'Announcement Bar', 'Show an announcement bar at the top of the site'),
                featureFlag('enablePopups', 'Promotional Popups', 'Enable promotional popup modals'),
                featureFlag('enableNewsletterFooter', 'Newsletter Signup', 'Show newsletter signup in footer', true),
                featureFlag('enableSocialProof', 'Social Proof', 'Show social proof notifications'),
              ],
            },
            // Accessibility Features
            {
              type: 'collapsible',
              label: 'Accessibility',
              admin: { initCollapsed: true },
              fields: [
                featureFlag('enableSkipLinks', 'Skip Links', 'Add skip-to-content links for screen readers', true),
                featureFlag('enableReducedMotion', 'Respect Reduced Motion', 'Honor user preference for reduced motion', true),
                featureFlag('enableHighContrast', 'High Contrast Mode', 'Allow users to enable high contrast mode'),
                featureFlag('enableFontScaling', 'Font Scaling Controls', 'Allow users to adjust font size'),
              ],
            },
          ],
        },
      ],
    },
  ],
}
