/**
 * Value parsing utilities
 * Shared across slider and number input components
 */

export interface ParsedCSSValue {
  num: number
  unit: string
}

/**
 * Parse a CSS value with optional unit
 * @param value - Value string like "16px", "1.5rem", "100"
 * @returns Numeric value without unit
 */
export function parseNumericValue(value: string | number | undefined | null): number {
  if (value === undefined || value === null) return 0
  if (typeof value === 'number') return value
  const parsed = parseFloat(value)
  return isNaN(parsed) ? 0 : parsed
}

/**
 * Parse a CSS value string into numeric value and unit
 * @param value - CSS value like "16px", "1.5rem", "50%"
 * @param defaultUnit - Default unit if none found
 * @returns Object with num and unit
 */
export function parseCSSValue(value: string | undefined | null, defaultUnit: string = 'px'): ParsedCSSValue {
  if (!value) return { num: 0, unit: defaultUnit }
  const match = value.match(/^(-?\d*\.?\d+)(px|rem|em|%|ms|s)?$/)
  if (match) {
    return { num: parseFloat(match[1]), unit: match[2] || defaultUnit }
  }
  return { num: 0, unit: defaultUnit }
}

/**
 * Clamp a number between min and max
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Format a number with optional unit
 * @param value - Numeric value
 * @param unit - Optional unit suffix (px, rem, %, etc.)
 * @returns Formatted string
 */
export function formatWithUnit(value: number, unit?: string): string {
  if (!unit) return String(value)
  return `${value}${unit}`
}

/**
 * Round to specified decimal places
 * @param value - Value to round
 * @param decimals - Number of decimal places
 * @returns Rounded value
 */
export function roundTo(value: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}
