'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import { useEffect, useState, useCallback } from 'react'
import type { ThemeEditor as ThemeEditorType } from '@/payload-types'

// Page templates available for preview
const PREVIEW_PAGES = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'product', label: 'Product', icon: '🛍️' },
  { id: 'blog', label: 'Blog', icon: '📝' },
  { id: 'form', label: 'Form', icon: '📋' },
  { id: 'components', label: 'Components', icon: '🧩' },
] as const

type PageId = (typeof PREVIEW_PAGES)[number]['id']

// Default theme values for initial render
const defaultTheme: Partial<ThemeEditorType> = {
  styles: {
    brandPrimaryLight: '#2fddd0',
    brandPrimaryDark: '#0b1f22',
    brandSecondarySlot1: '#fc5a44',
    surfaceLight: '#ffffff',
    surfaceStripe: '#f9f8f4',
    surfaceDark: '#0b1f22',
    textDark: '#0b1f22',
    textMedium: '#405255',
    textLight: '#978f6f',
    textAccent: '#fc5a44',
    fontFamilyHeading: 'Owners',
    fontFamilyBody: 'Stack Sans Text',
    radiusMedium: '16px',
    radiusSmall: '12px',
  },
}

// Type for the styles object
type ThemeStyles = NonNullable<ThemeEditorType['styles']>

function generateCSSVariables(theme: Partial<ThemeEditorType>): Record<string, string> {
  const vars: Record<string, string> = {}

  // Extract styles - handle nested structure
  const styles: Partial<ThemeStyles> = theme.styles || {}

  // Brand Colors
  if (styles.brandPrimaryLight) vars['--color-brand-primary-light'] = styles.brandPrimaryLight
  if (styles.brandPrimaryLight400) vars['--color-brand-primary-light-400'] = styles.brandPrimaryLight400
  if (styles.brandPrimaryLight200) vars['--color-brand-primary-light-200'] = styles.brandPrimaryLight200
  if (styles.brandPrimaryLight50) vars['--color-brand-primary-light-50'] = styles.brandPrimaryLight50
  if (styles.brandPrimaryDark) vars['--color-brand-primary-dark'] = styles.brandPrimaryDark
  if (styles.brandPrimaryDark400) vars['--color-brand-primary-dark-400'] = styles.brandPrimaryDark400
  if (styles.brandPrimaryDark200) vars['--color-brand-primary-dark-200'] = styles.brandPrimaryDark200
  if (styles.brandPrimaryDark50) vars['--color-brand-primary-dark-50'] = styles.brandPrimaryDark50
  if (styles.brandSecondarySlot1) vars['--color-brand-secondary-1'] = styles.brandSecondarySlot1
  if (styles.brandSecondarySlot2) vars['--color-brand-secondary-2'] = styles.brandSecondarySlot2
  if (styles.brandSecondarySlot3) vars['--color-brand-secondary-3'] = styles.brandSecondarySlot3
  if (styles.brandSecondarySlot4) vars['--color-brand-secondary-4'] = styles.brandSecondarySlot4

  // Surface Colors
  if (styles.surfaceLight) vars['--color-surface-light'] = styles.surfaceLight
  if (styles.surfaceStripe) vars['--color-surface-stripe'] = styles.surfaceStripe
  if (styles.surfaceDark) vars['--color-surface-dark'] = styles.surfaceDark

  // Text Colors
  if (styles.textDark) vars['--color-text-dark'] = styles.textDark
  if (styles.textMedium) vars['--color-text-medium'] = styles.textMedium
  if (styles.textLight) vars['--color-text-light'] = styles.textLight
  if (styles.textAccent) vars['--color-text-accent'] = styles.textAccent

  // Border Colors
  if (styles.borderLight) vars['--color-border-light'] = styles.borderLight
  if (styles.borderDark) vars['--color-border-dark'] = styles.borderDark
  if (styles.borderExtraLight) vars['--color-border-extra-light'] = styles.borderExtraLight

  // Utility Colors
  if (styles.utilityWarning) vars['--color-utility-warning'] = styles.utilityWarning
  if (styles.utilityPositive) vars['--color-utility-positive'] = styles.utilityPositive
  if (styles.utilityFailure) vars['--color-utility-failure'] = styles.utilityFailure
  if (styles.utilityFocus) vars['--color-utility-focus'] = styles.utilityFocus

  // Action Colors - now nested under actionPrimary/actionSecondary
  const ap = styles.actionPrimary
  if (ap) {
    if (ap.bgActive) vars['--color-action-primary-bg-active'] = ap.bgActive
    if (ap.bgHover) vars['--color-action-primary-bg-hover'] = ap.bgHover
    if (ap.bgInactive) vars['--color-action-primary-bg-inactive'] = ap.bgInactive
    if (ap.bgPressed) vars['--color-action-primary-bg-pressed'] = ap.bgPressed
    if (ap.surfaceActive) vars['--color-action-primary-surface-active'] = ap.surfaceActive
    if (ap.surfaceHover) vars['--color-action-primary-surface-hover'] = ap.surfaceHover
    if (ap.surfaceInactive) vars['--color-action-primary-surface-inactive'] = ap.surfaceInactive
    if (ap.surfacePressed) vars['--color-action-primary-surface-pressed'] = ap.surfacePressed
  }
  const as = styles.actionSecondary
  if (as) {
    if (as.bgActive) vars['--color-action-secondary-bg-active'] = as.bgActive
    if (as.bgHover) vars['--color-action-secondary-bg-hover'] = as.bgHover
    if (as.bgInactive) vars['--color-action-secondary-bg-inactive'] = as.bgInactive
    if (as.bgPressed) vars['--color-action-secondary-bg-pressed'] = as.bgPressed
    if (as.surfaceActive) vars['--color-action-secondary-surface-active'] = as.surfaceActive
    if (as.surfaceHover) vars['--color-action-secondary-surface-hover'] = as.surfaceHover
    if (as.surfaceInactive) vars['--color-action-secondary-surface-inactive'] = as.surfaceInactive
    if (as.surfacePressed) vars['--color-action-secondary-surface-pressed'] = as.surfacePressed
  }
  const at = styles.actionText
  if (at) {
    if (at.surfaceActive) vars['--color-action-text-surface-active'] = at.surfaceActive
    if (at.surfaceHover) vars['--color-action-text-surface-hover'] = at.surfaceHover
    if (at.surfaceInactive) vars['--color-action-text-surface-inactive'] = at.surfaceInactive
    if (at.surfacePressed) vars['--color-action-text-surface-pressed'] = at.surfacePressed
  }

  // Font Families
  if (styles.fontFamilyHeading) vars['--font-family-heading'] = `"${styles.fontFamilyHeading}", sans-serif`
  if (styles.fontFamilyBody) vars['--font-family-body'] = `"${styles.fontFamilyBody}", sans-serif`
  if (styles.fontFamilyAccent) vars['--font-family-accent'] = `"${styles.fontFamilyAccent}", monospace`
  if (styles.fontFamilyAction) vars['--font-family-action'] = `"${styles.fontFamilyAction}", sans-serif`

  // Font Weights
  if (styles.fontWeightLight) vars['--font-weight-light'] = styles.fontWeightLight
  if (styles.fontWeightRegular) vars['--font-weight-regular'] = styles.fontWeightRegular
  if (styles.fontWeightMedium) vars['--font-weight-medium'] = styles.fontWeightMedium
  if (styles.fontWeightSemiBold) vars['--font-weight-semi-bold'] = styles.fontWeightSemiBold
  if (styles.fontWeightBold) vars['--font-weight-bold'] = styles.fontWeightBold
  if (styles.fontWeightExtraBold) vars['--font-weight-extra-bold'] = styles.fontWeightExtraBold

  // Line Heights
  if (styles.lineHeightSmall) vars['--line-height-small'] = styles.lineHeightSmall
  if (styles.lineHeightMedium) vars['--line-height-medium'] = styles.lineHeightMedium
  if (styles.lineHeightTall) vars['--line-height-tall'] = styles.lineHeightTall

  // Letter Spacing
  if (styles.letterSpacingTight) vars['--letter-spacing-tight'] = styles.letterSpacingTight
  if (styles.letterSpacingWide) vars['--letter-spacing-wide'] = styles.letterSpacingWide

  // Desktop Font Sizes
  const dfd = styles.desktopFontSizeDisplay
  if (dfd) {
    if (dfd.xxl) vars['--font-size-display-xxl'] = dfd.xxl
    if (dfd.xl) vars['--font-size-display-xl'] = dfd.xl
    if (dfd.lg) vars['--font-size-display-lg'] = dfd.lg
    if (dfd.md) vars['--font-size-display-md'] = dfd.md
    if (dfd.sm) vars['--font-size-display-sm'] = dfd.sm
  }
  const dfh = styles.desktopFontSizeHeadline
  if (dfh) {
    if (dfh.xxl) vars['--font-size-headline-xxl'] = dfh.xxl
    if (dfh.xl) vars['--font-size-headline-xl'] = dfh.xl
    if (dfh.lg) vars['--font-size-headline-lg'] = dfh.lg
    if (dfh.md) vars['--font-size-headline-md'] = dfh.md
    if (dfh.sm) vars['--font-size-headline-sm'] = dfh.sm
    if (dfh.xs) vars['--font-size-headline-xs'] = dfh.xs
  }
  const dfb = styles.desktopFontSizeBody
  if (dfb) {
    if (dfb.xxl) vars['--font-size-body-xxl'] = dfb.xxl
    if (dfb.xl) vars['--font-size-body-xl'] = dfb.xl
    if (dfb.lg) vars['--font-size-body-lg'] = dfb.lg
    if (dfb.md) vars['--font-size-body-md'] = dfb.md
    if (dfb.sm) vars['--font-size-body-sm'] = dfb.sm
    if (dfb.xs) vars['--font-size-body-xs'] = dfb.xs
  }

  // Border Radius
  if (styles.radiusXxSmall) vars['--radius-xx-small'] = styles.radiusXxSmall
  if (styles.radiusExtraSmall) vars['--radius-extra-small'] = styles.radiusExtraSmall
  if (styles.radiusSmall) vars['--radius-small'] = styles.radiusSmall
  if (styles.radiusMedium) vars['--radius-medium'] = styles.radiusMedium
  if (styles.radiusLarge) vars['--radius-large'] = styles.radiusLarge
  if (styles.radiusFull) vars['--radius-full'] = styles.radiusFull

  // Elevation
  if (styles.elevation0) vars['--elevation-0'] = styles.elevation0
  if (styles.elevation1) vars['--elevation-1'] = styles.elevation1
  if (styles.elevation2) vars['--elevation-2'] = styles.elevation2
  if (styles.elevation3) vars['--elevation-3'] = styles.elevation3
  if (styles.elevation4) vars['--elevation-4'] = styles.elevation4
  if (styles.elevation5) vars['--elevation-5'] = styles.elevation5

  // Motion
  if (styles.durationXs) vars['--duration-xs'] = styles.durationXs
  if (styles.durationSm) vars['--duration-sm'] = styles.durationSm
  if (styles.durationMd) vars['--duration-md'] = styles.durationMd
  if (styles.durationLg) vars['--duration-lg'] = styles.durationLg
  if (styles.durationXl) vars['--duration-xl'] = styles.durationXl
  if (styles.easingStandard) vars['--easing-standard'] = styles.easingStandard
  if (styles.easingDecelerate) vars['--easing-decelerate'] = styles.easingDecelerate
  if (styles.easingAccelerate) vars['--easing-accelerate'] = styles.easingAccelerate

  // Spacing
  const dsv = styles.desktopSpacingVertical
  if (dsv) {
    if (dsv.tiny) vars['--spacing-v-tiny'] = dsv.tiny
    if (dsv.small) vars['--spacing-v-small'] = dsv.small
    if (dsv.medium) vars['--spacing-v-medium'] = dsv.medium
    if (dsv.large) vars['--spacing-v-large'] = dsv.large
    if (dsv.xlarge) vars['--spacing-v-xlarge'] = dsv.xlarge
    if (dsv.xxlarge) vars['--spacing-v-xxlarge'] = dsv.xxlarge
    if (dsv.jumbo) vars['--spacing-v-jumbo'] = dsv.jumbo
    if (dsv.mega) vars['--spacing-v-mega'] = dsv.mega
    if (dsv.ultra) vars['--spacing-v-ultra'] = dsv.ultra
    if (dsv.giga) vars['--spacing-v-giga'] = dsv.giga
    if (dsv.titan) vars['--spacing-v-titan'] = dsv.titan
    if (dsv.colosal) vars['--spacing-v-colosal'] = dsv.colosal
  }
  const dsh = styles.desktopSpacingHorizontal
  if (dsh) {
    if (dsh.small) vars['--spacing-h-small'] = dsh.small
    if (dsh.medium) vars['--spacing-h-medium'] = dsh.medium
    if (dsh.large) vars['--spacing-h-large'] = dsh.large
    if (dsh.xlarge) vars['--spacing-h-xlarge'] = dsh.xlarge
    if (dsh.xxlarge) vars['--spacing-h-xxlarge'] = dsh.xxlarge
    if (dsh.jumbo) vars['--spacing-h-jumbo'] = dsh.jumbo
    if (dsh.mega) vars['--spacing-h-mega'] = dsh.mega
    if (dsh.ultra) vars['--spacing-h-ultra'] = dsh.ultra
    if (dsh.giga) vars['--spacing-h-giga'] = dsh.giga
    if (dsh.titan) vars['--spacing-h-titan'] = dsh.titan
    if (dsh.colosal) vars['--spacing-h-colosal'] = dsh.colosal
  }

  // Layout
  if (styles.breakpointSmall) vars['--breakpoint-small'] = styles.breakpointSmall
  if (styles.breakpointMedium) vars['--breakpoint-medium'] = styles.breakpointMedium
  if (styles.breakpointLarge) vars['--breakpoint-large'] = styles.breakpointLarge
  if (styles.containerSmall) vars['--container-small'] = styles.containerSmall
  if (styles.containerLarge) vars['--container-large'] = styles.containerLarge

  // Stroke
  if (styles.strokeSmall) vars['--stroke-small'] = styles.strokeSmall
  if (styles.strokeMedium) vars['--stroke-medium'] = styles.strokeMedium
  if (styles.strokeLarge) vars['--stroke-large'] = styles.strokeLarge

  // Opacity
  if (styles.opacityDisabled) vars['--opacity-disabled'] = `${styles.opacityDisabled}%`
  if (styles.opacityOverlay) vars['--opacity-overlay'] = `${styles.opacityOverlay}%`
  if (styles.opacityHover) vars['--opacity-hover'] = `${styles.opacityHover}%`
  if (styles.opacityFocus) vars['--opacity-focus'] = `${styles.opacityFocus}%`

  return vars
}

// Page selector navigation component
function PageSelector({
  currentPage,
  onPageChange,
}: {
  currentPage: PageId
  onPageChange: (page: PageId) => void
}) {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        gap: '4px',
        padding: '8px 16px',
        background: 'var(--color-surface-dark, #0b1f22)',
        borderBottom: '1px solid var(--color-border-dark, #1e5a67)',
      }}
    >
      {PREVIEW_PAGES.map((page) => (
        <button
          key={page.id}
          onClick={() => onPageChange(page.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: currentPage === page.id 
              ? 'var(--color-brand-primary-light, #2fddd0)' 
              : 'transparent',
            color: currentPage === page.id 
              ? 'var(--color-surface-dark, #0b1f22)' 
              : 'var(--color-brand-primary-light-400, #bbf2e8)',
            border: 'none',
            borderRadius: 'var(--radius-small, 8px)',
            fontSize: '13px',
            fontWeight: currentPage === page.id ? '600' : '400',
            cursor: 'pointer',
            transition: 'all 150ms ease',
          }}
        >
          <span>{page.icon}</span>
          <span>{page.label}</span>
        </button>
      ))}
    </nav>
  )
}

// Home page template
function HomePage() {
  return (
    <>
      <header
        style={{
          backgroundColor: 'var(--color-brand-primary-dark, #0b1f22)',
          color: 'var(--color-brand-primary-light-50, #ffffff)',
          padding: 'var(--spacing-v-colosal, 68px) var(--spacing-h-mega, 32px)',
        }}
      >
        <div style={{ maxWidth: 'var(--container-large, 1280px)', margin: '0 auto' }}>
          <h1
            style={{
              fontFamily: 'var(--font-family-heading, serif)',
              fontSize: 'var(--font-size-display-xl, 68px)',
              fontWeight: 'var(--font-weight-bold, 700)',
              lineHeight: 'var(--line-height-small, 110%)',
              letterSpacing: 'var(--letter-spacing-tight, -1.5px)',
              marginBottom: 'var(--spacing-v-large, 12px)',
            }}
          >
            Welcome to Veya
          </h1>
          <p
            style={{
              fontSize: 'var(--font-size-body-xl, 18px)',
              lineHeight: 'var(--line-height-medium, 135%)',
              color: 'var(--color-brand-primary-light-400, #bbf2e8)',
              maxWidth: '600px',
            }}
          >
            Experience your theme in action. This home page showcases typography, colors, and spacing.
          </p>
          <div style={{ marginTop: 'var(--spacing-v-jumbo, 24px)', display: 'flex', gap: '12px' }}>
            <button
              style={{
                padding: '14px 28px',
                background: 'var(--color-brand-secondary-1, #fc5a44)',
                color: 'var(--color-surface-dark, #0b1f22)',
                border: 'none',
                borderRadius: 'var(--radius-small, 12px)',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Get Started
            </button>
            <button
              style={{
                padding: '14px 28px',
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                borderRadius: 'var(--radius-small, 12px)',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </header>

      <section style={{ padding: 'var(--spacing-v-titan, 60px) var(--spacing-h-mega, 32px)' }}>
        <div style={{ maxWidth: 'var(--container-large, 1280px)', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-family-heading, serif)',
              fontSize: 'var(--font-size-headline-xl, 48px)',
              marginBottom: 'var(--spacing-v-mega, 32px)',
            }}
          >
            Featured Content
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  background: 'var(--color-surface-light, #fff)',
                  borderRadius: 'var(--radius-medium, 16px)',
                  overflow: 'hidden',
                  boxShadow: 'var(--elevation-3, 0 4px 8px rgba(0,0,0,0.12))',
                }}
              >
                <div
                  style={{
                    height: '180px',
                    background: `linear-gradient(135deg, var(--color-brand-primary-dark-${i === 1 ? '400' : i === 2 ? '200' : '50'}, #133c45), var(--color-brand-primary-light, #2fddd0))`,
                  }}
                />
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Feature {i}</h3>
                  <p style={{ color: 'var(--color-text-medium, #405255)', fontSize: '14px' }}>
                    A brief description of this amazing feature.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// Product page template
function ProductPage() {
  return (
    <div style={{ padding: 'var(--spacing-v-giga, 48px) var(--spacing-h-mega, 32px)' }}>
      <div style={{ maxWidth: 'var(--container-large, 1280px)', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
          <div
            style={{
              aspectRatio: '1',
              background: 'var(--color-surface-stripe, #f9f8f4)',
              borderRadius: 'var(--radius-large, 24px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '120px',
            }}
          >
            🛍️
          </div>
          <div>
            <span
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                background: 'var(--color-brand-primary-light, #2fddd0)',
                color: 'var(--color-brand-primary-dark, #0b1f22)',
                borderRadius: 'var(--radius-full, 1000px)',
                fontSize: '12px',
                fontWeight: '600',
                marginBottom: '16px',
              }}
            >
              New Arrival
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-family-heading, serif)',
                fontSize: 'var(--font-size-headline-xxl, 60px)',
                marginBottom: '16px',
              }}
            >
              Premium Product
            </h1>
            <p
              style={{
                fontSize: 'var(--font-size-body-xl, 18px)',
                color: 'var(--color-text-medium, #405255)',
                marginBottom: '24px',
              }}
            >
              This is a sample product description showcasing your typography and color choices.
            </p>
            <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px' }}>
              $299.00
              <span
                style={{
                  fontSize: '18px',
                  color: 'var(--color-text-light, #978f6f)',
                  textDecoration: 'line-through',
                  marginLeft: '12px',
                }}
              >
                $399.00
              </span>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
              <button
                style={{
                  flex: 1,
                  padding: '16px 32px',
                  background: 'var(--color-action-primary-bg-active, #0b1f22)',
                  color: 'var(--color-action-primary-surface-active, #fff)',
                  border: 'none',
                  borderRadius: 'var(--radius-small, 12px)',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Add to Cart
              </button>
              <button
                style={{
                  padding: '16px',
                  background: 'transparent',
                  border: '2px solid var(--color-border-dark, #0b1f22)',
                  borderRadius: 'var(--radius-small, 12px)',
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              >
                ♡
              </button>
            </div>
            <div
              style={{
                padding: '16px',
                background: 'var(--color-surface-stripe, #f9f8f4)',
                borderRadius: 'var(--radius-small, 12px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--color-utility-positive, #2fddd0)' }}>✓</span>
                <span>Free shipping on orders over $50</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Blog page template
function BlogPage() {
  return (
    <div style={{ padding: 'var(--spacing-v-giga, 48px) var(--spacing-h-mega, 32px)' }}>
      <div style={{ maxWidth: 'var(--container-small, 980px)', margin: '0 auto' }}>
        <article>
          <header style={{ marginBottom: 'var(--spacing-v-mega, 32px)' }}>
            <span
              style={{
                fontFamily: 'var(--font-family-accent, monospace)',
                fontSize: '12px',
                color: 'var(--color-text-accent, #fc5a44)',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
              }}
            >
              Design Systems
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-family-heading, serif)',
                fontSize: 'var(--font-size-display-md, 48px)',
                lineHeight: 'var(--line-height-small, 110%)',
                marginTop: '12px',
                marginBottom: '16px',
              }}
            >
              Building Scalable Theme Systems
            </h1>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                color: 'var(--color-text-light, #978f6f)',
                fontSize: '14px',
              }}
            >
              <span>January 24, 2025</span>
              <span>•</span>
              <span>8 min read</span>
            </div>
          </header>

          <div
            style={{
              height: '400px',
              background: 'linear-gradient(135deg, var(--color-brand-primary-dark, #0b1f22), var(--color-brand-primary-dark-200, #1e5a67))',
              borderRadius: 'var(--radius-large, 24px)',
              marginBottom: 'var(--spacing-v-mega, 32px)',
            }}
          />

          <div
            style={{
              fontSize: 'var(--font-size-body-xl, 18px)',
              lineHeight: 'var(--line-height-tall, 150%)',
              color: 'var(--color-text-medium, #405255)',
            }}
          >
            <p style={{ marginBottom: '24px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-family-heading, serif)',
                fontSize: 'var(--font-size-headline-lg, 40px)',
                color: 'var(--color-text-dark, #0b1f22)',
                marginBottom: '16px',
              }}
            >
              The Importance of Variables
            </h2>
            <p style={{ marginBottom: '24px' }}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>
            <blockquote
              style={{
                borderLeft: '4px solid var(--color-brand-secondary-1, #fc5a44)',
                paddingLeft: '24px',
                marginLeft: 0,
                marginBottom: '24px',
                fontStyle: 'italic',
                fontSize: 'var(--font-size-headline-sm, 24px)',
                color: 'var(--color-text-dark, #0b1f22)',
              }}
            >
              "Design systems are the foundation of consistent user experiences."
            </blockquote>
          </div>
        </article>
      </div>
    </div>
  )
}

// Form page template
function FormPage() {
  return (
    <div style={{ padding: 'var(--spacing-v-giga, 48px) var(--spacing-h-mega, 32px)' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h1
          style={{
            fontFamily: 'var(--font-family-heading, serif)',
            fontSize: 'var(--font-size-headline-xl, 48px)',
            textAlign: 'center',
            marginBottom: 'var(--spacing-v-mega, 32px)',
          }}
        >
          Contact Us
        </h1>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
              }}
            >
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '2px solid var(--color-border-light, #dbdbdb)',
                borderRadius: 'var(--radius-small, 12px)',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '2px solid var(--color-border-light, #dbdbdb)',
                borderRadius: 'var(--radius-small, 12px)',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Subject
            </label>
            <select
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '2px solid var(--color-border-light, #dbdbdb)',
                borderRadius: 'var(--radius-small, 12px)',
                fontSize: '16px',
                outline: 'none',
                background: 'white',
                boxSizing: 'border-box',
              }}
            >
              <option>General Inquiry</option>
              <option>Support</option>
              <option>Partnership</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Message
            </label>
            <textarea
              rows={5}
              placeholder="Your message..."
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '2px solid var(--color-border-light, #dbdbdb)',
                borderRadius: 'var(--radius-small, 12px)',
                fontSize: '16px',
                outline: 'none',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '16px 32px',
              background: 'var(--color-action-primary-bg-active, #0b1f22)',
              color: 'var(--color-action-primary-surface-active, #fff)',
              border: 'none',
              borderRadius: 'var(--radius-small, 12px)',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

// Components showcase page
function ComponentsPage() {
  return (
    <div style={{ padding: 'var(--spacing-v-giga, 48px) var(--spacing-h-mega, 32px)' }}>
      <div style={{ maxWidth: 'var(--container-large, 1280px)', margin: '0 auto' }}>
        <h1
          style={{
            fontFamily: 'var(--font-family-heading, serif)',
            fontSize: 'var(--font-size-headline-xl, 48px)',
            marginBottom: 'var(--spacing-v-mega, 32px)',
          }}
        >
          Component Library
        </h1>

        {/* Buttons */}
        <section style={{ marginBottom: 'var(--spacing-v-titan, 60px)' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Buttons</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button style={{ padding: '12px 24px', background: 'var(--color-action-primary-bg-active)', color: 'white', border: 'none', borderRadius: 'var(--radius-small, 12px)', cursor: 'pointer' }}>Primary</button>
            <button style={{ padding: '12px 24px', background: 'var(--color-action-secondary-bg-active)', color: 'var(--color-surface-dark)', border: 'none', borderRadius: 'var(--radius-small, 12px)', cursor: 'pointer' }}>Secondary</button>
            <button style={{ padding: '12px 24px', background: 'transparent', color: 'var(--color-text-dark)', border: '2px solid var(--color-border-dark)', borderRadius: 'var(--radius-small, 12px)', cursor: 'pointer' }}>Outline</button>
            <button style={{ padding: '12px 24px', background: 'var(--color-action-primary-bg-inactive)', color: 'var(--color-action-primary-surface-inactive)', border: 'none', borderRadius: 'var(--radius-small, 12px)', cursor: 'not-allowed' }} disabled>Disabled</button>
          </div>
        </section>

        {/* Alerts */}
        <section style={{ marginBottom: 'var(--spacing-v-titan, 60px)' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Alerts</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '16px', background: 'rgba(47, 221, 208, 0.15)', borderLeft: '4px solid var(--color-utility-positive)', borderRadius: 'var(--radius-small, 12px)' }}>
              <strong>Success!</strong> Your changes have been saved.
            </div>
            <div style={{ padding: '16px', background: 'rgba(255, 224, 41, 0.15)', borderLeft: '4px solid var(--color-utility-warning)', borderRadius: 'var(--radius-small, 12px)' }}>
              <strong>Warning!</strong> Please review before continuing.
            </div>
            <div style={{ padding: '16px', background: 'rgba(170, 20, 0, 0.1)', borderLeft: '4px solid var(--color-utility-failure)', borderRadius: 'var(--radius-small, 12px)' }}>
              <strong>Error!</strong> Something went wrong.
            </div>
          </div>
        </section>

        {/* Cards with elevation */}
        <section style={{ marginBottom: 'var(--spacing-v-titan, 60px)' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Elevation Scale</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  padding: '24px',
                  background: 'var(--color-surface-light)',
                  borderRadius: 'var(--radius-medium, 16px)',
                  boxShadow: `var(--elevation-${i})`,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '24px', fontWeight: '700' }}>{i}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>Elevation</div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Typography Scale</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontFamily: 'var(--font-family-heading)', fontSize: 'var(--font-size-display-lg, 60px)', lineHeight: '1.1' }}>Display Large</div>
            <div style={{ fontFamily: 'var(--font-family-heading)', fontSize: 'var(--font-size-headline-xl, 48px)', lineHeight: '1.1' }}>Headline XL</div>
            <div style={{ fontFamily: 'var(--font-family-heading)', fontSize: 'var(--font-size-headline-lg, 40px)', lineHeight: '1.2' }}>Headline Large</div>
            <div style={{ fontFamily: 'var(--font-family-heading)', fontSize: 'var(--font-size-headline-md, 32px)', lineHeight: '1.2' }}>Headline Medium</div>
            <div style={{ fontSize: 'var(--font-size-body-xl, 18px)', color: 'var(--color-text-medium)' }}>Body Extra Large - Lorem ipsum dolor sit amet</div>
            <div style={{ fontSize: 'var(--font-size-body-lg, 16px)', color: 'var(--color-text-medium)' }}>Body Large - Lorem ipsum dolor sit amet</div>
            <div style={{ fontSize: 'var(--font-size-body-md, 14px)', color: 'var(--color-text-light)' }}>Body Medium - Lorem ipsum dolor sit amet</div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default function PreviewPage() {
  const [currentPage, setCurrentPage] = useState<PageId>('home')
  const [initialData, setInitialData] = useState<ThemeEditorType | null>(null)
  const [postMessageTheme, setPostMessageTheme] = useState<ThemeEditorType | null>(null)

  useEffect(() => {
    async function fetchTheme() {
      try {
        const res = await fetch('/api/globals/theme-editor')
        if (res.ok) {
          const data = await res.json()
          setInitialData(data)
        }
      } catch (e) {
        console.error('Failed to fetch theme:', e)
      }
    }
    fetchTheme()
  }, [])

  // Listen for postMessage updates from the theme editor
  const handleMessage = useCallback((event: MessageEvent) => {
    // Verify origin for security
    if (event.origin !== window.location.origin) return

    if (event.data?.type === 'THEME_UPDATE' && event.data?.payload) {
      setPostMessageTheme(event.data.payload)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [handleMessage])

  const { data: livePreviewTheme } = useLivePreview<ThemeEditorType>({
    initialData: initialData || (defaultTheme as ThemeEditorType),
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 1,
  })

  // Prefer postMessage theme (from standalone editor) over live preview (from Payload admin)
  const theme = postMessageTheme || livePreviewTheme

  const cssVars = generateCSSVariables(theme || defaultTheme)

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'product':
        return <ProductPage />
      case 'blog':
        return <BlogPage />
      case 'form':
        return <FormPage />
      case 'components':
        return <ComponentsPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div
      style={{
        ...cssVars,
        minHeight: '100vh',
        fontFamily: 'var(--font-family-body, system-ui)',
        backgroundColor: 'var(--color-surface-light, #ffffff)',
        color: 'var(--color-text-dark, #0b1f22)',
      }}
    >
      <PageSelector currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
      
      {/* Footer */}
      <footer
        style={{
          backgroundColor: 'var(--color-surface-stripe, #f9f8f4)',
          padding: 'var(--spacing-v-mega, 32px) var(--spacing-h-mega, 32px)',
          borderTop: '1px solid var(--color-border-light, #dbdbdb)',
          marginTop: 'auto',
        }}
      >
        <div style={{ maxWidth: 'var(--container-large, 1280px)', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: 'var(--color-text-medium, #405255)' }}>
            Veya Theme Customizer POC — Preview: {PREVIEW_PAGES.find((p) => p.id === currentPage)?.label}
          </p>
        </div>
      </footer>
    </div>
  )
}
