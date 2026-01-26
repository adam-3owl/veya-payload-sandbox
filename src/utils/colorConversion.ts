/**
 * Color conversion utilities
 * Shared across all color picker components
 */

export interface HSL {
  h: number
  s: number
  l: number
}

/**
 * Convert hex color to HSL
 * @param hex - Hex color string (with or without #)
 * @returns HSL object with h (0-360), s (0-100), l (0-100)
 */
export function hexToHsl(hex: string): HSL {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return { h: 0, s: 0, l: 50 }

  const r = parseInt(result[1], 16) / 255
  const g = parseInt(result[2], 16) / 255
  const b = parseInt(result[3], 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

/**
 * Convert HSL to hex color
 * @param h - Hue (0-360)
 * @param s - Saturation (0-100)
 * @param l - Lightness (0-100)
 * @returns Hex color string with # prefix
 */
export function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100
  const lNorm = l / 100
  const a = sNorm * Math.min(lNorm, 1 - lNorm)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = lNorm - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

/**
 * Validate hex color format
 * @param hex - Hex color string to validate
 * @returns boolean indicating if valid 6-digit hex color
 */
export function isValidHex(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex)
}

/**
 * Normalize hex color to include # prefix
 * @param hex - Hex color string
 * @returns Hex color with # prefix, or original if invalid
 */
export function normalizeHex(hex: string): string {
  if (!hex) return '#000000'
  if (hex.startsWith('#')) return hex
  return `#${hex}`
}

/**
 * Default preset colors for color pickers
 */
export const PRESET_COLORS = [
  '#000000',
  '#ffffff',
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#ff00ff',
  '#00ffff',
  '#ff6600',
  '#9900ff',
] as const
