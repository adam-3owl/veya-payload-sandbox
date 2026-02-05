import type { UISectionSchema } from '../types'
import {
  colorField,
  sizeField,
  assetField,
  selectField,
  row,
  group,
  collapsible,
  typographyGroup,
  underlineTabsFields,
  iconGroup,
  ctaFields,
} from '../builders'

export const locationsSchema: UISectionSchema = {
  title: 'Locations',
  description: 'Configure location finder and store details',
  pathPrefix: 'locations',
  fields: [
    // ── Modal Settings ──────────────────────────────────────────────
    group('modal', 'Modal Settings', [
      row(
        colorField('bgColor', 'Background Color', '#ffffff'), // Surface Light
        colorField('colorBtnBgColor', 'Color Button BG', '#deddd6'), // Utility / Native Control
      ),
      assetField('closeIconAsset', 'Close Icon', 'icons'),
      colorField('closeIconColor', 'Close Icon Color', '#0b1f22'), // Surface Dark
    ], true),

    // ── Conveyance Selection ────────────────────────────────────────
    group('conveyanceSelection', 'Conveyance Selection', [
      selectField('selectionStyle', 'Selection Style', [
        { label: 'Pill', value: 'pill' },
        { label: 'Underline Tabs', value: 'underlineTabs' },
      ], 'pill'),

      // Pill Settings (conditional on selectionStyle === 'pill')
      collapsible('Pill Settings', [
        row(
          colorField('pillActiveBgColor', 'Active BG', '#0b1f22'), // Brand / Primary Dark
          colorField('pillActiveBorderColor', 'Active Border', '#0b1f22'), // Brand / Primary Dark
        ),
        row(
          colorField('pillActiveTextColor', 'Active Text', '#ffffff'), // Action / Primary / Surface Active
          colorField('pillInactiveBgColor', 'Inactive BG', 'transparent'), // Transparent
        ),
        row(
          colorField('pillInactiveTextColor', 'Inactive Text', '#949494'), // Action / Primary / Surface Inactive
          sizeField('pillBorderRadius', 'Border Radius', '12px', { min: 0, max: 50 }), // Radius Small
        ),
      ], {
        defaultOpen: false,
        condition: (getValue) =>
          (getValue('locations.conveyanceSelection.selectionStyle') as string) === 'pill',
      }),

      // Underline Tab Settings (conditional on selectionStyle === 'underlineTabs')
      collapsible('Underline Tab Settings',
        underlineTabsFields('tab', {
          activeUnderlineColor: '#0b1f22', // Brand / Primary Dark
          activeTextColor: '#0b1f22', // Action / Text / Surface Active
          inactiveUnderlineColor: '#dbdbdb', // Border / Light
          inactiveTextColor: '#5d5d5d', // Action / Text / Surface Inactive
        }),
        {
          defaultOpen: false,
          condition: (getValue) =>
            (getValue('locations.conveyanceSelection.selectionStyle') as string) === 'underlineTabs',
        },
      ),

      // Input Field
      group('inputField', 'Input Field', [
        row(
          colorField('inactiveBorder', 'Inactive Border', '#dbdbdb'), // Field / Border Inactive
          colorField('activeBorder', 'Active Border', '#0b1f22'), // Field / Border Active
        ),
        row(
          colorField('placeholderColor', 'Placeholder Color', '#978f6f'), // Field / Placeholder
          colorField('textColor', 'Text Color', '#0b1f22'), // Field / Field Input
        ),
      ]),
    ]),

    // ── Return List ─────────────────────────────────────────────────
    group('returnList', 'Return List', [
      // List Tabs
      collapsible('List Tabs', underlineTabsFields('listTab', {
        activeUnderlineColor: '#0b1f22', // Text / Dark
        activeTextColor: '#0b1f22', // Text / Dark
        inactiveUnderlineColor: '#949494', // Action / Primary / Surface Inactive
        inactiveTextColor: '#949494', // Action / Primary / Surface Inactive
      })),

      // Map Icon
      collapsible('Map Icon', [
        iconGroup('mapIcon', 'Map Icon', {
          bgColor: '#133c45', // Brand / Primary Dark 400
          iconColor: '#ffffff', // Surface Light
        }),
      ]),

      // Location Card
      collapsible('Location Card', [
        selectField('cardStyle', 'Card Style', [
          { label: 'Flat', value: 'flat' },
        ], 'flat'),
        typographyGroup('cardTitle', 'Card Title', { fontSize: '14px', color: '#0b1f22' }), // Headline / Extra Small, Text / Dark
        typographyGroup('cardAddress', 'Card Address', { fontSize: '12px', color: '#405255' }), // Body / Medium, Text / Medium
        typographyGroup('cardHours', 'Card Hours', { fontSize: '11px', color: '#978f6f' }), // Body / Small, Text / Light
        row(
          colorField('cardBgColor', 'Card BG', '#ffffff'), // Surface / Light
          colorField('cardStripeColor', 'Stripe Color', '#f9f8f4'), // Surface / Stripe
        ),
        colorField('cardBorderColor', 'Border Color', '#dbdbdb'), // Border / Light
        iconGroup('deliveryIcon', 'Delivery Icon', {
          bgColor: '#f9f8f4', // Brand / Primary Light 200
          iconColor: '#0b1f22', // Brand / Primary Dark
        }),
      ]),

      // Additional Details
      collapsible('Additional Details', [
        typographyGroup('detailsTitle', 'Details Title', { fontSize: '11px', color: '#0b1f22' }), // Body / Small, Text / Dark
        typographyGroup('detailsSubtitle', 'Details Subtitle', { fontSize: '10px', color: '#405255' }), // Body / Extra Small, Text / Medium
      ]),

      // Secondary CTAs
      collapsible('Secondary CTAs', ctaFields('cta', {
        bgColor: '#fc5a44', // Action / Secondary / BG Active
        textColor: '#0b1f22', // Action / Secondary / Surface Active
        borderColor: '#fc5a44', // Action / Secondary / BG Active
      })),
    ]),

    // ── Map ─────────────────────────────────────────────────────────
    group('map', 'Map', [
      colorField('bgColor', 'Background Color', '#e5e3df'),
      row(
        assetField('activePin', 'Active Pin', 'icons'),
        assetField('inactivePin', 'Inactive Pin', 'icons'),
      ),
      colorField('popoverBgColor', 'Popover BG Color', '#ffffff'), // Surface / Light
      typographyGroup('popoverText', 'Popover Text', { fontSize: '14px', color: '#0b1f22' }), // Headline / Extra Small, Text / Dark
    ]),

    // ── Empty States ────────────────────────────────────────────────
    group('emptyStates', 'Empty States', [
      colorField('containerBgColor', 'Container BG Color', '#f9f8f4'), // Surface / Stripe
      typographyGroup('emptyTitle', 'Empty Title', { fontSize: '18px', color: '#0b1f22' }), // Headline / Small, Text / Dark
      typographyGroup('emptyBody', 'Empty Body', { fontSize: '12px', color: '#0b1f22' }), // Body / Medium, Text / Dark
      collapsible('Icons & Assets', [
        assetField('locationServicesIcon', 'Location Services Icon', 'icons'),
        assetField('noNearbyLocationsIcon', 'No Nearby Locations Icon', 'icons'),
        assetField('errorIcon', 'Error Icon', 'icons'),
        assetField('noResultsFoundAsset', 'No Results Found Asset', 'media'),
        assetField('loadingLottieAsset', 'Loading Lottie Asset', 'media'),
      ]),
    ]),
  ],
}
