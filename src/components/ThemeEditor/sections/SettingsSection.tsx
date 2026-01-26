'use client'

import { useThemeEditor } from '../ThemeEditorContext'
import { ToggleSwitch } from '../fields'
import { SectionGroup } from './SectionGroup'
import { CollapsibleGroup } from './CollapsibleGroup'

interface SettingsSectionProps {
  sectionId: string
  isOpen: boolean
  onToggle: (sectionId: string) => void
}

export function SettingsSection({ sectionId, isOpen, onToggle }: SettingsSectionProps) {
  const { getValue, updateField } = useThemeEditor()

  const getBool = (path: string): boolean => (getValue(path) as boolean) || false
  const setBool = (path: string) => (value: boolean) => updateField(path, value)

  return (
    <SectionGroup title="Settings" sectionId={sectionId} isOpen={isOpen} onToggle={onToggle}>
      <CollapsibleGroup title="UI Features" defaultOpen>
        <ToggleSwitch
          label="Dark Mode"
          description="Allow users to toggle between light and dark themes"
          value={getBool('settings.enableDarkMode')}
          onChange={setBool('settings.enableDarkMode')}
        />
        <ToggleSwitch
          label="Animations"
          description="Enable motion and transition effects throughout the site"
          value={getBool('settings.enableAnimations')}
          onChange={setBool('settings.enableAnimations')}
        />
        <ToggleSwitch
          label="Sticky Header"
          description="Keep the header fixed at the top when scrolling"
          value={getBool('settings.enableStickyHeader')}
          onChange={setBool('settings.enableStickyHeader')}
        />
        <ToggleSwitch
          label="Back to Top Button"
          description="Show a button to scroll back to the top of the page"
          value={getBool('settings.enableBackToTop')}
          onChange={setBool('settings.enableBackToTop')}
        />
        <ToggleSwitch
          label="Breadcrumbs"
          description="Show breadcrumb navigation on interior pages"
          value={getBool('settings.enableBreadcrumbs')}
          onChange={setBool('settings.enableBreadcrumbs')}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="E-commerce">
        <ToggleSwitch
          label="Quick View"
          description="Allow users to preview products without leaving the page"
          value={getBool('settings.enableQuickView')}
          onChange={setBool('settings.enableQuickView')}
        />
        <ToggleSwitch
          label="Wishlist"
          description="Allow users to save products to a wishlist"
          value={getBool('settings.enableWishlist')}
          onChange={setBool('settings.enableWishlist')}
        />
        <ToggleSwitch
          label="Product Compare"
          description="Allow users to compare multiple products"
          value={getBool('settings.enableCompare')}
          onChange={setBool('settings.enableCompare')}
        />
        <ToggleSwitch
          label="Product Reviews"
          description="Show customer reviews on product pages"
          value={getBool('settings.enableReviews')}
          onChange={setBool('settings.enableReviews')}
        />
        <ToggleSwitch
          label="Recently Viewed"
          description="Show recently viewed products"
          value={getBool('settings.enableRecentlyViewed')}
          onChange={setBool('settings.enableRecentlyViewed')}
        />
        <ToggleSwitch
          label="Stock Notifications"
          description="Allow users to sign up for back-in-stock alerts"
          value={getBool('settings.enableStockNotify')}
          onChange={setBool('settings.enableStockNotify')}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Navigation">
        <ToggleSwitch
          label="Mega Menu"
          description="Use expanded mega menu for main navigation"
          value={getBool('settings.enableMegaMenu')}
          onChange={setBool('settings.enableMegaMenu')}
        />
        <ToggleSwitch
          label="Site Search"
          description="Enable the search functionality"
          value={getBool('settings.enableSearch')}
          onChange={setBool('settings.enableSearch')}
        />
        <ToggleSwitch
          label="Search Suggestions"
          description="Show autocomplete suggestions in search"
          value={getBool('settings.enableSearchSuggestions')}
          onChange={setBool('settings.enableSearchSuggestions')}
        />
        <ToggleSwitch
          label="Mobile Drawer Menu"
          description="Use a drawer-style menu on mobile"
          value={getBool('settings.enableMobileDrawer')}
          onChange={setBool('settings.enableMobileDrawer')}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Performance">
        <ToggleSwitch
          label="Lazy Loading"
          description="Lazy load images and components below the fold"
          value={getBool('settings.enableLazyLoad')}
          onChange={setBool('settings.enableLazyLoad')}
        />
        <ToggleSwitch
          label="Image Optimization"
          description="Automatically optimize images for web"
          value={getBool('settings.enableImageOptimization')}
          onChange={setBool('settings.enableImageOptimization')}
        />
        <ToggleSwitch
          label="Link Prefetching"
          description="Prefetch linked pages on hover"
          value={getBool('settings.enablePrefetch')}
          onChange={setBool('settings.enablePrefetch')}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Marketing">
        <ToggleSwitch
          label="Announcement Bar"
          description="Show an announcement bar at the top of the site"
          value={getBool('settings.enableAnnouncement')}
          onChange={setBool('settings.enableAnnouncement')}
        />
        <ToggleSwitch
          label="Promotional Popups"
          description="Enable promotional popup modals"
          value={getBool('settings.enablePopups')}
          onChange={setBool('settings.enablePopups')}
        />
        <ToggleSwitch
          label="Newsletter Signup"
          description="Show newsletter signup in footer"
          value={getBool('settings.enableNewsletterFooter')}
          onChange={setBool('settings.enableNewsletterFooter')}
        />
        <ToggleSwitch
          label="Social Proof"
          description="Show social proof notifications"
          value={getBool('settings.enableSocialProof')}
          onChange={setBool('settings.enableSocialProof')}
        />
      </CollapsibleGroup>

      <CollapsibleGroup title="Accessibility">
        <ToggleSwitch
          label="Skip Links"
          description="Add skip-to-content links for screen readers"
          value={getBool('settings.enableSkipLinks')}
          onChange={setBool('settings.enableSkipLinks')}
        />
        <ToggleSwitch
          label="Respect Reduced Motion"
          description="Honor user preference for reduced motion"
          value={getBool('settings.enableReducedMotion')}
          onChange={setBool('settings.enableReducedMotion')}
        />
        <ToggleSwitch
          label="High Contrast Mode"
          description="Allow users to enable high contrast mode"
          value={getBool('settings.enableHighContrast')}
          onChange={setBool('settings.enableHighContrast')}
        />
        <ToggleSwitch
          label="Font Scaling Controls"
          description="Allow users to adjust font size"
          value={getBool('settings.enableFontScaling')}
          onChange={setBool('settings.enableFontScaling')}
        />
      </CollapsibleGroup>
    </SectionGroup>
  )
}
