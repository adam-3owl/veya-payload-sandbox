/**
 * Type definitions for Mobile App Settings
 * These types define the configuration structure for content blocks and page builder elements
 */

// ============================================
// Overlay Configuration
// ============================================

export interface OverlayConfig {
  type?: 'none' | 'solid' | 'gradient'
  // Solid overlay
  color?: string
  opacity?: number
  // Gradient overlay
  gradientType?: 'linear' | 'radial'
  gradientDirection?: string
  gradientStartColor?: string
  gradientStartOpacity?: number
  gradientEndColor?: string
  gradientEndOpacity?: number
}

// ============================================
// Typography Configuration
// ============================================

export interface TypographyConfig {
  fontColor?: string
  fontSize?: string
  fontFamily?: string
}

export interface CopyConfig extends TypographyConfig {
  guestCopy?: string
  customerCopy?: string
}

// ============================================
// CTA Configuration
// ============================================

export interface CTAPrimaryConfig {
  dynamicDataType?: 'customer-guest' | 'location-selected'
  // Customer/Guest mode
  guestRoute?: string
  customerRoute?: string
  // Location Selected mode
  locationNotSelectedRoute?: string
  locationSelectedRoute?: string
  // Copy
  locationNotSelectedCopy?: string
  locationSelectedCopy?: string
  // Styling
  backgroundColor?: string
  fontColor?: string
}

export interface CTASecondaryConfig {
  backgroundColor?: string
  fontColor?: string
}

// ============================================
// Icon Configuration
// ============================================

export interface IconConfig {
  backgroundColor?: string
  fontColor?: string
}

// ============================================
// Full Screen Image Block Configuration
// ============================================

export interface FullScreenImageConfig {
  backgroundImage?: {
    guestImageUrl?: string
    customerImageUrl?: string
  }
  overlay?: {
    guest?: OverlayConfig
    customer?: OverlayConfig
  }
  eyebrow?: CopyConfig
  headline?: CopyConfig
  body?: {
    guestCopy?: string
    customerCopy?: string
  }
  ctaPrimary?: CTAPrimaryConfig
  ctaSecondary?: CTASecondaryConfig
  ctaLayout?: 'stacked' | 'side-by-side'
  conveyance?: {
    fontFamily?: string
    fontColor?: string
  }
  accountIcon?: IconConfig
  messageIcon?: IconConfig
}

// ============================================
// Text with CTA Block Configuration
// Same as Full Screen Image but without backgroundImage
// ============================================

export interface TextWithCTAConfig {
  // Background color instead of image
  backgroundColor?: {
    guest?: string
    customer?: string
  }
  overlay?: {
    guest?: OverlayConfig
    customer?: OverlayConfig
  }
  eyebrow?: CopyConfig
  headline?: CopyConfig
  body?: {
    guestCopy?: string
    customerCopy?: string
  }
  ctaPrimary?: CTAPrimaryConfig
  ctaSecondary?: CTASecondaryConfig
  ctaLayout?: 'stacked' | 'side-by-side'
  conveyance?: {
    fontFamily?: string
    fontColor?: string
  }
  accountIcon?: IconConfig
  messageIcon?: IconConfig
}

// ============================================
// Order Again Block Configuration
// Only available on Customer Homepage
// ============================================

export interface OrderAgainConfig {
  headline?: {
    fontColor?: string
    fontSize?: string
    fontFamily?: string
  }
  background?: {
    backgroundColor?: string
  }
  menuCard?: {
    title?: {
      fontColor?: string
      fontSize?: string
      fontFamily?: string
    }
    subCopy?: {
      fontColor?: string
      fontSize?: string
      fontFamily?: string
    }
    background?: {
      backgroundColor?: string
    }
    tag?: {
      backgroundColor?: string
      fontColor?: string
    }
  }
  additionalItems?: {
    icon?: string
    text?: {
      copy?: string
      fontColor?: string
      fontSize?: string
      fontFamily?: string
    }
    button?: {
      backgroundColor?: string
      fontColor?: string
    }
  }
}

// ============================================
// Menu Categories Block Configuration
// ============================================

export interface MenuCategoryItem {
  id?: string
  apiCategoryId?: string // Will be populated by Veya Ordering API
  titleOverride?: string
  image?: string
}

export interface MenuCategoriesConfig {
  headline?: {
    copy?: string
    fontColor?: string
    fontSize?: string
    fontFamily?: string
  }
  categories?: MenuCategoryItem[]
  layout?: 'horizontal-scroll' | '2-column' | '3-column'
  menuCard?: {
    title?: {
      fontColor?: string
      fontSize?: string
      fontFamily?: string
    }
    background?: {
      backgroundColor?: string
    }
  }
  sectionBackground?: {
    backgroundColor?: string
  }
  // Conveyance and icons (for first/only section)
  conveyance?: {
    fontFamily?: string
    fontColor?: string
  }
  accountIcon?: IconConfig
  messageIcon?: IconConfig
}

// ============================================
// Content Block Types
// ============================================

export type BlockType =
  | 'full-screen-image'
  | 'text-with-cta'
  | 'order-again'
  | 'menu-categories'
  | 'image-with-text'
  | 'rewards-indicator'

export interface ContentBlock {
  id?: string
  blockType: BlockType
  title?: string
  enabled?: boolean
  config?: FullScreenImageConfig | TextWithCTAConfig | OrderAgainConfig | MenuCategoriesConfig // Union type for all block configs
}

// ============================================
// Tab Types
// ============================================

export type TabType = 'guest' | 'customer'

// ============================================
// Navigation Types
// ============================================

export type NavigationRoute =
  | 'home'
  | 'locations'
  | 'menu'
  | 'loyalty'
  | 'reorder'
  | 'bag'
  | 'account'
  | 'sign-in'
  | 'sign-up'

export interface NavigationItem {
  label: string
  route: NavigationRoute
  inactiveIcon?: string
  activeIcon?: string
}
