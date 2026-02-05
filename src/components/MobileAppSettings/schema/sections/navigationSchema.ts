import type { UISectionSchema } from '../types'
import { checkboxField, selectField, colorField, row, collapsible, conditional, custom } from '../builders'
import { NavigationItemsEditor } from '../../sections/NavigationItemsEditor'

export const navigationSchema: UISectionSchema = {
  title: 'Navigation',
  description: 'Configure the tab bar navigation items for your mobile app',
  pathPrefix: 'navigation',
  fields: [
    custom(NavigationItemsEditor),

    collapsible('Tab Bar Settings', [
      checkboxField('showTabLabels', 'Show Tab Labels', true, 'Display labels under tab icons'),
      checkboxField('hapticFeedback', 'Haptic Feedback', true, 'Provide haptic feedback on tab selection'),

      row(
        selectField('iosStyle', 'iOS Style', [
          { label: 'Liquid Glass', value: 'liquid-glass' },
          { label: 'Flat', value: 'flat' },
        ], 'liquid-glass'),
        selectField('androidStyle', 'Android Style', [
          { label: 'Flat', value: 'flat' },
        ], 'flat'),
      ),

      row(
        selectField('position', 'Position', [
          { label: 'Fixed', value: 'fixed' },
          { label: 'Floating', value: 'floating' },
        ], 'fixed'),
      ),

      conditional(
        (getValue) => (getValue('navigation.position') as string) === 'floating',
        [
          selectField('floatingDropShadow', 'Drop Shadow Style', [
            { label: 'None', value: 'none' },
            { label: 'Subtle', value: 'elevation1' },
            { label: 'Medium', value: 'elevation2' },
            { label: 'Pronounced', value: 'elevation3' },
            { label: 'Strong', value: 'elevation4' },
            { label: 'Dramatic', value: 'elevation5' },
          ], 'elevation2'),
        ],
      ),

      row(
        colorField('backgroundColor', 'Background Color', '#ffffff'),
        colorField('tabInactiveColor', 'Tab Inactive Color', '#6b7280'),
      ),

      row(
        colorField('tabActiveColor', 'Tab Active Color', '#000000'),
        colorField('activeIndicatorColor', 'Active Indicator Color', '#000000'),
      ),
    ]),

    collapsible('Gestures', [
      checkboxField('swipeNavigation', 'Swipe Navigation', true, 'Allow swipe gestures to navigate between screens'),
      checkboxField('pullToRefresh', 'Pull to Refresh', true, 'Enable pull-to-refresh on list screens'),
    ]),
  ],
}
