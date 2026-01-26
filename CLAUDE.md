# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Veya Theme Customizer POC - A Payload CMS 3.0 application that provides a live theme editor with real-time preview. Built with Next.js 15, React 19, and SQLite.

## Commands

```bash
# Development
pnpm dev                  # Start dev server (http://localhost:3000)
pnpm devsafe              # Clean .next and start dev server

# Build & Production
pnpm build                # Build for production
pnpm start                # Start production server

# Type Generation (run after schema changes)
pnpm generate:types       # Generate TypeScript types from Payload schema
pnpm generate:importmap   # Regenerate component import map

# Linting & Validation
pnpm lint                 # Run ESLint
tsc --noEmit              # Validate TypeScript without emitting

# Testing
pnpm test                 # Run all tests (integration + e2e)
pnpm test:int             # Run integration tests only (vitest)
pnpm test:e2e             # Run e2e tests only (playwright)

# Run single integration test
pnpm exec vitest run tests/int/api.int.spec.ts
```

## Architecture

### Route Groups
- `src/app/(frontend)/` - Public frontend routes
- `src/app/(payload)/` - Payload admin panel routes
- `src/app/(frontend)/preview/` - Live preview page for theme editor

### Core Files
- `src/payload.config.ts` - Main Payload configuration (SQLite adapter, collections, globals)
- `src/globals/ThemeEditor.ts` - Theme editor global with all design token fields
- `src/globals/MobileAppSettings.ts` - Mobile app settings global for app configuration
- `src/utils/` - **Shared utilities** (see Shared Utilities section below)
- `src/styles/` - **Shared SCSS** variables and mixins
- `src/components/shared/fields/` - **Shared UI components** (ColorPicker, SizeSlider, OpacitySlider) - USE THESE
- `src/components/fields/` - Payload custom field wrappers (ColorPickerField, etc.)
- `src/payload-types.ts` - Auto-generated types (do not edit manually)

### Live Preview System
The theme editor uses Payload's live preview feature:
1. Theme values are edited in the admin panel (`/admin/globals/theme-editor`)
2. Changes stream to the preview page via `@payloadcms/live-preview-react`
3. `generateCSSVariables()` in `preview/page.tsx` converts theme data to CSS custom properties
4. Preview page renders multiple template pages (Home, Product, Blog, Form, Components)

### Custom Field Components
Located in `src/components/fields/`, these are client components (`'use client'`) that provide enhanced UI for theme editing:
- Component paths are defined as strings in the config (e.g., `'/components/fields/ColorPickerField'`)
- After creating/modifying components, run `pnpm generate:importmap`

## Shared Utilities

**IMPORTANT: Always use shared utilities instead of duplicating logic across components.**

### Utility Modules (`src/utils/`)

| Module | Functions | Purpose |
|--------|-----------|---------|
| `colorConversion.ts` | `hexToHsl`, `hslToHex`, `isValidHex`, `normalizeHex`, `PRESET_COLORS` | Color format conversion for color pickers |
| `valueParser.ts` | `parseNumericValue`, `parseCSSValue`, `clamp`, `formatWithUnit`, `roundTo` | Parse and validate CSS values for sliders |
| `objectUtils.ts` | `deepClone`, `deepEqual`, `getValueByPath`, `setValueByPath` | Object manipulation for state management |

### Usage Examples

```typescript
// Color utilities
import { hexToHsl, hslToHex, isValidHex, PRESET_COLORS } from '@/utils'

// Value parsing
import { parseCSSValue, clamp } from '@/utils'
const { num, unit } = parseCSSValue('16px', 'px')
const clamped = clamp(value, 0, 100)

// Object utilities (for context providers)
import { deepClone, deepEqual, getValueByPath, setValueByPath } from '@/utils'
const isDirty = !deepEqual(data, originalData)
const value = getValueByPath(obj, 'styles.brandPrimary')
```

### Shared SCSS (`src/styles/`)

| File | Purpose |
|------|---------|
| `_variables.scss` | Design tokens (colors, spacing, typography, shadows, z-index) |
| `_mixins.scss` | Reusable mixins (inputs, buttons, sliders, toggles, modals) |
| `index.scss` | Forward file for importing both |

```scss
// In component SCSS files:
@use '@/styles' as *;

.my-input {
  @include input-base;
}

.my-button {
  @include btn-primary;
}
```

## Shared UI Components

**IMPORTANT: All form input components must be consistent across the entire application.**

### Shared Field Components Location
All reusable field components are located in `src/components/shared/fields/`:

| Component | Purpose | Import |
|-----------|---------|--------|
| `ColorPicker` | Color selection with hex input and visual picker | `import { ColorPicker } from '@/components/shared/fields'` |
| `OpacitySlider` | Range slider for opacity/percentage values (0-100) | `import { OpacitySlider } from '@/components/shared/fields'` |
| `SizeSlider` | Range slider for CSS size values (px, rem, em, %) | `import { SizeSlider } from '@/components/shared/fields'` |
| `TextInput` | Basic text input with label | `import { TextInput } from '@/components/shared/fields'` |
| `SelectInput` | Dropdown select with label | `import { SelectInput } from '@/components/shared/fields'` |
| `ToggleSwitch` | Boolean toggle switch | `import { ToggleSwitch } from '@/components/shared/fields'` |
| `NumberInput` | Numeric input with optional unit | `import { NumberInput } from '@/components/shared/fields'` |

### Component Consistency Rules

1. **Never duplicate field components** - If a field type exists in `shared/fields/`, use it. Do not create local versions.

2. **Shared styles** - All slider components use `Slider.scss` for consistent styling:
   - `.slider__controls` - Flex container for slider elements
   - `.slider__track` - The range input track
   - `.slider__value` - Container for numeric input + unit
   - `.slider__input` - Numeric input field
   - `.slider__unit` - Unit label (%, px, etc.)
   - `.field__label` - Consistent label styling

3. **When adding new field types**:
   - Check if a shared component already exists
   - If creating new, add to `src/components/shared/fields/`
   - Export from the index file
   - Use Payload's theme variables (`--theme-elevation-*`) for colors
   - Follow existing BEM naming patterns

4. **Feature-specific wrappers** - If ThemeEditor or MobileAppSettings need feature-specific field wrappers, they should re-export from shared:
   ```typescript
   // src/components/ThemeEditor/fields/index.ts
   export { ColorPicker, OpacitySlider, SizeSlider } from '../../shared/fields'
   ```

### Adding a New Shared Component

1. Create component in `src/components/shared/fields/NewComponent.tsx`
2. Add styles to existing shared SCSS or create `NewComponent.scss`
3. Export from `src/components/shared/fields/index.ts`
4. Use Payload theme variables for consistent theming

## Payload CMS Patterns

### Local API Security
When using the Local API with a user context, always set `overrideAccess: false`:
```typescript
await payload.find({
  collection: 'posts',
  user: someUser,
  overrideAccess: false,  // REQUIRED to enforce access control
})
```

### Transaction Safety in Hooks
Always pass `req` to nested operations:
```typescript
hooks: {
  afterChange: [
    async ({ doc, req }) => {
      await req.payload.create({
        collection: 'audit-log',
        data: { docId: doc.id },
        req,  // Maintains transaction atomicity
      })
    },
  ],
}
```

### Prevent Infinite Hook Loops
Use context flags when hooks trigger operations on the same collection:
```typescript
if (context.skipHooks) return
await req.payload.update({
  collection: 'posts',
  id: doc.id,
  data: { ... },
  context: { skipHooks: true },
  req,
})
```

## Testing

- Integration tests: `tests/int/*.int.spec.ts` (Vitest with jsdom)
- E2E tests: `tests/e2e/*.e2e.spec.ts` (Playwright)
- Test setup: `vitest.setup.ts`

## Additional Documentation

Detailed Payload CMS patterns and rules are in `.cursor/rules/`:
- `payload-overview.md` - Core principles and quick reference
- `security-critical.mdc` - Critical security patterns
- `collections.md`, `fields.md`, `hooks.md` - Schema patterns
- `access-control.md`, `access-control-advanced.md` - Permission patterns
- `components.md` - Custom component development
