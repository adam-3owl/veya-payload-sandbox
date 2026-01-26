/**
 * Object manipulation utilities
 * Shared across context providers and state management
 */

/**
 * Deep clone an object using JSON serialization
 * Note: Does not handle functions, undefined, or circular references
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Deep equality check using JSON serialization
 * Note: Order-sensitive for object keys
 */
export function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

/**
 * Get a nested value from an object by dot-notation path
 * @param obj - Source object
 * @param path - Dot-notation path (e.g., 'styles.brandPrimaryLight')
 * @returns The value at the path, or undefined if not found
 */
export function getValueByPath(obj: Record<string, unknown> | null, path: string): unknown {
  if (!obj) return undefined
  const keys = path.split('.')
  let current: unknown = obj

  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined
    }
    current = (current as Record<string, unknown>)[key]
  }

  return current
}

/**
 * Set a nested value in an object by dot-notation path (immutably)
 * @param obj - Source object (will not be modified)
 * @param path - Dot-notation path (e.g., 'styles.brandPrimaryLight')
 * @param value - Value to set
 * @returns New object with the value set
 */
export function setValueByPath(
  obj: Record<string, unknown>,
  path: string,
  value: unknown
): Record<string, unknown> {
  const clone = deepClone(obj)
  const keys = path.split('.')
  let current: Record<string, unknown> = clone

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
      current[key] = {}
    }
    current = current[key] as Record<string, unknown>
  }

  current[keys[keys.length - 1]] = value
  return clone
}

/**
 * Check if a value exists at a path
 */
export function hasValueAtPath(obj: Record<string, unknown> | null, path: string): boolean {
  return getValueByPath(obj, path) !== undefined
}

/**
 * Delete a nested value by path (immutably)
 */
export function deleteValueByPath(
  obj: Record<string, unknown>,
  path: string
): Record<string, unknown> {
  const clone = deepClone(obj)
  const keys = path.split('.')
  let current: Record<string, unknown> = clone

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!(key in current) || typeof current[key] !== 'object') {
      return clone // Path doesn't exist, return unchanged
    }
    current = current[key] as Record<string, unknown>
  }

  delete current[keys[keys.length - 1]]
  return clone
}
