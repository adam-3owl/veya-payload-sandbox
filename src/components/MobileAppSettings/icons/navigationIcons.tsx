import React from 'react'

interface IconProps {
  size?: number
  className?: string
  color?: string
}

// Home icon - house outline
export const HomeIcon = ({ size = 24, className, color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    className={className}
  >
    <path d="M20.0366 5.17159C19.8152 5.16467 19.5963 5.2207 19.4055 5.33317L4.57678 14.0554C4.44425 14.1335 4.3284 14.2369 4.23583 14.3597C4.14327 14.4826 4.07581 14.6224 4.0373 14.7713C3.99879 14.9202 3.98999 15.0753 4.01141 15.2276C4.03282 15.3799 4.08402 15.5265 4.1621 15.659C4.24017 15.7916 4.34358 15.9074 4.46643 16C4.58927 16.0925 4.72914 16.16 4.87806 16.1985C5.02698 16.237 5.18201 16.2458 5.33433 16.2243C5.48664 16.2029 5.63324 16.1517 5.76576 16.0736L5.95173 15.9639V33.6583C5.95176 33.9688 6.07511 34.2666 6.29465 34.4861C6.51419 34.7056 6.81194 34.829 7.12241 34.829H32.8775C33.188 34.829 33.4858 34.7056 33.7053 34.4861C33.9248 34.2666 34.0482 33.9688 34.0482 33.6583V15.9639L34.2342 16.0736C34.3667 16.1517 34.5133 16.2029 34.6656 16.2244C34.8179 16.2458 34.973 16.237 35.1219 16.1985C35.2708 16.16 35.4107 16.0926 35.5336 16C35.6564 15.9074 35.7598 15.7916 35.8379 15.6591C35.916 15.5265 35.9672 15.3799 35.9886 15.2276C36.01 15.0753 36.0012 14.9203 35.9627 14.7713C35.9242 14.6224 35.8567 14.4825 35.7641 14.3597C35.6716 14.2369 35.5557 14.1335 35.4232 14.0554L20.5945 5.33317C20.425 5.23331 20.2332 5.17774 20.0366 5.17159ZM20 7.70199L31.7069 14.5859V32.4876H26.2436V20.3905C26.2436 20.0801 26.1203 19.7823 25.9007 19.5628C25.6812 19.3432 25.3834 19.2199 25.073 19.2198H14.927C14.6165 19.2199 14.3188 19.3432 14.0992 19.5628C13.8797 19.7823 13.7563 20.0801 13.7563 20.3905V32.4876H8.2931V14.5859L20 7.70199ZM16.0977 21.5612H23.9023V32.4876H16.0977V21.5612Z" fill={color}/>
  </svg>
)

export const HomeIconFilled = ({ size = 24, className, color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    className={className}
  >
    <path d="M20.0003 5.17084C19.7953 5.17084 19.59 5.22472 19.4058 5.33242L4.57666 14.0549C4.0194 14.3827 3.83423 15.1013 4.16203 15.6586C4.48984 16.2158 5.20842 16.4026 5.76568 16.0732L5.95166 15.9635V33.6585C5.95166 34.3047 6.47614 34.8292 7.12238 34.8292H13.7565V20.3903C13.7565 19.744 14.281 19.2195 14.9272 19.2195H25.0735C25.7197 19.2195 26.2442 19.744 26.2442 20.3903V34.8292H32.8783C33.5246 34.8292 34.049 34.3047 34.049 33.6585V15.9635L34.235 16.0732C34.4223 16.1825 34.6266 16.2348 34.8295 16.2348C35.2307 16.2348 35.6201 16.0301 35.8387 15.6586C36.1649 15.1029 35.9813 14.3827 35.424 14.0549L20.5949 5.33242C20.4114 5.22472 20.2054 5.17084 20.0003 5.17084ZM16.0979 21.561V34.8292H23.9028V21.561H16.0979Z" fill={color}/>
  </svg>
)

// Locations icon - map pin
export const LocationsIcon = ({ size = 24, className, color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export const LocationsIconFilled = ({ size = 24, className, color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
)

// Menu icon - grid/list
export const MenuIcon = ({ size = 24, className, color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
)

export const MenuIconFilled = ({ size = 24, className, color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
)

// Loyalty icon - star/heart
export const LoyaltyIcon = ({ size = 24, className, color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

export const LoyaltyIconFilled = ({ size = 24, className, color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

// Cart icon - shopping cart
export const CartIcon = ({ size = 24, className, color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
)

export const CartIconFilled = ({ size = 24, className, color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
  >
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    <circle cx="9" cy="21" r="1.5" />
    <circle cx="20" cy="21" r="1.5" />
  </svg>
)

// Reorder icon - refresh/repeat
export const ReorderIcon = ({ size = 24, className, color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17 1l4 4-4 4" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <path d="M7 23l-4-4 4-4" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
)

export const ReorderIconFilled = ({ size = 24, className, color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17 1l4 4-4 4" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <path d="M7 23l-4-4 4-4" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
)

// Bag icon - shopping bag
export const BagIcon = ({ size = 24, className, color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)

export const BagIconFilled = ({ size = 24, className, color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" stroke="white" />
    <path d="M16 10a4 4 0 0 1-8 0" stroke="white" fill="none" />
  </svg>
)

// Map route values to their icons
export const defaultNavigationIcons: Record<string, { inactive: React.FC<IconProps>; active: React.FC<IconProps> }> = {
  home: { inactive: HomeIcon, active: HomeIconFilled },
  locations: { inactive: LocationsIcon, active: LocationsIconFilled },
  menu: { inactive: MenuIcon, active: MenuIconFilled },
  loyalty: { inactive: LoyaltyIcon, active: LoyaltyIconFilled },
  cart: { inactive: CartIcon, active: CartIconFilled },
  reorder: { inactive: ReorderIcon, active: ReorderIconFilled },
  bag: { inactive: BagIcon, active: BagIconFilled },
}

// Helper to get default icon for a route
export const getDefaultIcon = (route: string, state: 'inactive' | 'active') => {
  const icons = defaultNavigationIcons[route]
  if (!icons) return null
  return state === 'active' ? icons.active : icons.inactive
}
