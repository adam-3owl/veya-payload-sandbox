'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import { useEffect, useState, useCallback } from 'react'
import type { ThemeEditor as ThemeEditorType } from '@/payload-types'
import './preview.css'

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
    borderDark: '#0b1f22',
    borderLight: '#dbdbdb',
    fieldBorderActive: '#0b1f22',
    overlayDark: 'rgba(11, 31, 34, 0.4)',
    fontFamilyHeading: 'Owners',
    fontFamilyBody: 'Stack Sans Text',
    radiusMedium: '16px',
    radiusSmall: '12px',
    radiusExtraSmall: '8px',
    radiusFull: '1000px',
    strokeMedium: '2px',
    desktopSpacingVertical: {
      tiny: '4px',
      small: '6px',
      large: '12px',
      xlarge: '16px',
      xxlarge: '20px',
      jumbo: '24px',
      mega: '32px',
      ultra: '40px',
      giga: '48px',
      titan: '60px',
    },
    desktopSpacingHorizontal: {
      small: '6px',
      medium: '8px',
      large: '12px',
      xlarge: '16px',
      mega: '32px',
    },
    desktopFontSizeDisplay: {
      xl: '68px',
    },
    desktopFontSizeHeadline: {
      sm: '24px',
      xs: '16px',
    },
    desktopFontSizeBody: {
      lg: '16px',
      md: '14px',
      sm: '12px',
    },
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

  // Form Field Colors
  if (styles.fieldBorderActive) vars['--color-field-border-active'] = styles.fieldBorderActive
  if (styles.fieldBorderInactive) vars['--color-field-border-inactive'] = styles.fieldBorderInactive

  // Overlay
  if (styles.overlayDark) vars['--color-overlay-dark'] = styles.overlayDark

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

  // Spacing - Vertical
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
  // Spacing - Horizontal
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

// ============================================================================
// SVG Icons
// ============================================================================

const ChevronDownIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const MenuIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.5 7H24.5M3.5 14H24.5M3.5 21H24.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
  </svg>
)

const BagIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6H16C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6H6C4.9 6 4 6.9 4 8V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8C20 6.9 19.1 6 18 6ZM12 4C13.1 4 14 4.9 14 6H10C10 4.9 10.9 4 12 4ZM18 20H6V8H8V10C8 10.55 8.45 11 9 11C9.55 11 10 10.55 10 10V8H14V10C14 10.55 14.45 11 15 11C15.55 11 16 10.55 16 10V8H18V20Z" fill="currentColor"/>
  </svg>
)

const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2C6.69 2 4 4.69 4 8C4 12.5 10 18 10 18C10 18 16 12.5 16 8C16 4.69 13.31 2 10 2ZM10 10.5C8.62 10.5 7.5 9.38 7.5 8C7.5 6.62 8.62 5.5 10 5.5C11.38 5.5 12.5 6.62 12.5 8C12.5 9.38 11.38 10.5 10 10.5Z" fill="currentColor"/>
  </svg>
)

// Social Icons
const InstagramIcon = () => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5 2.1C13.2 2.1 13.5 2.1 14.6 2.2C15.6 2.2 16.2 2.4 16.6 2.5C17.1 2.7 17.5 3 17.9 3.4C18.3 3.8 18.6 4.2 18.8 4.7C18.9 5.1 19.1 5.7 19.1 6.7C19.2 7.8 19.2 8.1 19.2 10.8C19.2 13.5 19.2 13.8 19.1 14.9C19.1 15.9 18.9 16.5 18.8 16.9C18.6 17.4 18.3 17.8 17.9 18.2C17.5 18.6 17.1 18.9 16.6 19.1C16.2 19.2 15.6 19.4 14.6 19.4C13.5 19.5 13.2 19.5 10.5 19.5C7.8 19.5 7.5 19.5 6.4 19.4C5.4 19.4 4.8 19.2 4.4 19.1C3.9 18.9 3.5 18.6 3.1 18.2C2.7 17.8 2.4 17.4 2.2 16.9C2.1 16.5 1.9 15.9 1.9 14.9C1.8 13.8 1.8 13.5 1.8 10.8C1.8 8.1 1.8 7.8 1.9 6.7C1.9 5.7 2.1 5.1 2.2 4.7C2.4 4.2 2.7 3.8 3.1 3.4C3.5 3 3.9 2.7 4.4 2.5C4.8 2.4 5.4 2.2 6.4 2.2C7.5 2.1 7.8 2.1 10.5 2.1ZM10.5 0C7.7 0 7.4 0 6.3 0.1C5.2 0.1 4.4 0.3 3.7 0.6C3 0.9 2.4 1.3 1.8 1.9C1.2 2.5 0.8 3.1 0.5 3.8C0.2 4.5 0 5.3 0 6.4C0 7.5 0 7.8 0 10.6C0 13.4 0 13.7 0.1 14.8C0.1 15.9 0.3 16.7 0.6 17.4C0.9 18.1 1.3 18.7 1.9 19.3C2.5 19.9 3.1 20.3 3.8 20.6C4.5 20.9 5.3 21.1 6.4 21.1C7.5 21.2 7.8 21.2 10.6 21.2C13.4 21.2 13.7 21.2 14.8 21.1C15.9 21.1 16.7 20.9 17.4 20.6C18.1 20.3 18.7 19.9 19.3 19.3C19.9 18.7 20.3 18.1 20.6 17.4C20.9 16.7 21.1 15.9 21.1 14.8C21.2 13.7 21.2 13.4 21.2 10.6C21.2 7.8 21.2 7.5 21.1 6.4C21.1 5.3 20.9 4.5 20.6 3.8C20.3 3.1 19.9 2.5 19.3 1.9C18.7 1.3 18.1 0.9 17.4 0.6C16.7 0.3 15.9 0.1 14.8 0.1C13.7 0 13.3 0 10.5 0Z" fill="currentColor"/>
    <path d="M10.5 5.1C7.5 5.1 5.1 7.5 5.1 10.5C5.1 13.5 7.5 15.9 10.5 15.9C13.5 15.9 15.9 13.5 15.9 10.5C15.9 7.5 13.5 5.1 10.5 5.1ZM10.5 14C8.6 14 7 12.4 7 10.5C7 8.6 8.6 7 10.5 7C12.4 7 14 8.6 14 10.5C14 12.4 12.4 14 10.5 14Z" fill="currentColor"/>
    <circle cx="16.1" cy="4.9" r="1.2" fill="currentColor"/>
  </svg>
)

const TikTokIcon = () => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.1 4.2C14.3 3.3 13.9 2.2 13.9 1H10.7V14C10.7 15.5 9.5 16.7 8 16.7C6.5 16.7 5.3 15.5 5.3 14C5.3 12.5 6.5 11.3 8 11.3C8.3 11.3 8.6 11.4 8.9 11.5V8.2C8.6 8.1 8.3 8.1 8 8.1C4.7 8.1 2 10.8 2 14.1C2 17.4 4.7 20.1 8 20.1C11.3 20.1 14 17.4 14 14.1V7.2C15.3 8.1 16.8 8.6 18.4 8.6V5.4C17.1 5.4 15.9 4.9 15.1 4.2Z" fill="currentColor"/>
  </svg>
)

const TwitterIcon = () => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 9L19.2 1H17.5L11.8 7.9L7.2 1H1.5L8.5 11.5L1.5 20H3.2L9.2 12.6L14.1 20H19.8L12.5 9ZM10 11.4L9.3 10.4L3.7 2.2H6.5L10.6 8.2L11.3 9.2L17.5 18.9H14.7L10 11.4Z" fill="currentColor"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 2.5C4.5 3.6 3.6 4.5 2.5 4.5C1.4 4.5 0.5 3.6 0.5 2.5C0.5 1.4 1.4 0.5 2.5 0.5C3.6 0.5 4.5 1.4 4.5 2.5ZM4.5 6H0.5V20H4.5V6ZM11 6H7V20H11V12.5C11 8.5 16 8.2 16 12.5V20H20V11.1C20 4.5 12.5 4.8 11 8.1V6Z" fill="currentColor"/>
  </svg>
)

// Veya Logo SVG
const VeyaLogo = ({ className }: { className?: string }) => (
  <svg className={className} width="95" height="22" viewBox="0 0 95 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_veya_logo)">
      <path d="M7.83426 9.04217C6.9962 9.04217 6.45175 8.60568 6.36441 7.36012V0.62278H0V7.69434H0.00929111V9.1134C0.00929111 13.0985 2.22987 14.7933 5.71961 14.7933C11.9595 14.7933 20.1747 9.94255 20.1747 0.62278H13.7211C13.7211 6.6168 9.70549 9.04217 7.83426 9.04217Z" fill="#FC5A44"/>
      <path d="M31.6678 0C25.4613 0 20.8455 2.63357 20.8455 7.38021C20.8455 12.1268 25.1826 14.7933 31.8778 14.7933C36.003 14.7933 39.2475 13.997 41.4309 12.6127L40.0911 9.45858C38.0824 10.359 35.6518 10.7754 32.831 10.7754C29.6925 10.7754 27.3995 9.87498 27.0836 8.28059H39.5299C40.4237 8.28059 41.141 7.93541 41.5591 7.36012C41.6279 7.26698 41.6892 7.16835 41.7412 7.06243V7.05878C41.7412 7.05878 41.7412 7.05512 41.7449 7.05512C41.8862 6.76291 41.9642 6.42869 41.9642 6.0616C41.9642 4.87448 41.4346 3.59605 40.2491 2.51669C38.664 1.07571 35.9064 0 31.6697 0L31.6678 0ZM35.2969 5.9575H27.1542C27.4366 4.71194 29.0923 3.84443 31.6659 3.84443C34.2396 3.84443 35.8265 4.81239 35.8265 5.64519C35.8265 5.85157 35.6853 5.9575 35.2969 5.9575Z" fill="#FC5A44"/>
      <path d="M52.2364 8.59107C51.0992 8.59107 50.3671 7.92628 50.3373 6.59671V0.281254H43.9878V9.07687C43.9878 12.9925 46.1749 14.8316 49.7353 14.7933C53.6487 14.7586 56.8913 12.125 58.6176 8.52349C58.5488 8.93989 58.5117 9.42387 58.5117 9.80375V11.747C58.5117 15.8708 56.6107 17.8104 51.7775 17.8104C49.2763 17.8104 47.1598 17.394 45.151 16.6324L44.0584 20.3727C46.3496 21.4119 49.2763 22.0018 52.7307 22.0018C60.9459 22.0018 64.8575 18.2944 64.8575 12.3716V0.622778H58.7588C56.8541 6.06342 54.5629 8.59107 52.2364 8.59107Z" fill="#FC5A44"/>
      <path d="M92.7791 9.42388C92.3202 9.80375 91.7571 10.0814 91.1569 10.0814C90.0643 10.0814 89.4994 9.35448 89.4994 8.00299V1.76789C86.4333 0.589905 82.9064 0 78.8183 0C71.5545 0 67.2193 3.46273 67.2193 8.28059C67.2193 12.3698 70.0754 14.7933 74.5872 14.7933C78.1141 14.7933 81.2173 13.0638 83.1554 10.0138C83.2242 13.4089 85.48 14.7933 88.8323 14.7933C91.0528 14.7933 92.8869 14.1029 94.1914 13.1313L92.7791 9.42388ZM83.1573 6.16752C81.5703 8.86867 79.032 9.90785 76.7408 9.90785C74.8362 9.90785 73.5688 9.00747 73.5688 7.48431C73.5688 5.57945 75.5776 4.29553 78.783 4.29553C80.3012 4.29553 81.745 4.46904 83.1573 4.81421V6.16752Z" fill="#FC5A44"/>
    </g>
    <defs>
      <clipPath id="clip0_veya_logo">
        <rect width="94.2857" height="22" fill="white"/>
      </clipPath>
    </defs>
  </svg>
)

// ============================================================================
// Figma Assets
// ============================================================================

// Category Icons from Figma
const CATEGORY_ICONS: Record<string, string> = {
  mezze: 'https://www.figma.com/api/mcp/asset/075e543c-7a34-4e12-a78a-0d7970da0d68',
  wraps: 'https://www.figma.com/api/mcp/asset/c951be7e-53a7-44b0-9d08-7fb41b240cbe',
  bowls: 'https://www.figma.com/api/mcp/asset/19869c2d-f241-4337-9c6a-a0b67f683513',
  sandwiches: 'https://www.figma.com/api/mcp/asset/0a9b90c4-13c6-4dd1-bda3-430666a9dcca',
  sides: 'https://www.figma.com/api/mcp/asset/ff5b43e5-49ff-4a5e-8fc8-89cbe3202cff',
  soups: 'https://www.figma.com/api/mcp/asset/e7ab0f0f-6e5e-46f0-aada-975d04abc780',
}

// Product placeholder image from Figma
const PRODUCT_IMAGE = 'https://www.figma.com/api/mcp/asset/5a169503-394b-4ae1-9104-afa487a8528f'

// Hero background image from Figma
const HERO_IMAGE = 'https://www.figma.com/api/mcp/asset/1300ae33-b856-4499-8a5f-a30e99e4c394'

// App Store buttons from Figma
const APP_STORE_ICON = 'https://www.figma.com/api/mcp/asset/1d0471ee-c2bb-4eb5-8098-86a5a57fd986'
const GOOGLE_PLAY_ICON = 'https://www.figma.com/api/mcp/asset/f5a0f280-3eb9-4c4a-be87-9a0e70e7e81c'
const GOOGLE_PLAY_TEXT = 'https://www.figma.com/api/mcp/asset/9446e4ce-8af1-4a31-8a1e-ae3e6982edea'

const CategoryIcon = ({ name }: { name: string }) => {
  const iconUrl = CATEGORY_ICONS[name]
  if (iconUrl) {
    return <img src={iconUrl} alt={name} style={{ width: '32px', height: '32px' }} />
  }
  return <span style={{ fontSize: '24px' }}>🍽️</span>
}

// ============================================================================
// Components
// ============================================================================

// Top Navigation Component
function TopNavigation() {
  return (
    <div className="top-navigation">
      {/* Main Nav Bar */}
      <div className="nav-main">
        <div className="nav-left">
          <div className="nav-mobile-menu">
            <MenuIcon />
          </div>
          <div className="nav-menu-list">
            <div className="nav-item active">
              <span>Menu</span>
            </div>
            <div className="nav-item">
              <span>Locations</span>
            </div>
            <div className="nav-item">
              <span>Catering</span>
            </div>
            <div className="nav-item dropdown">
              <span>About</span>
              <ChevronDownIcon />
            </div>
          </div>
        </div>

        {/* Center Logo */}
        <div className="nav-logo">
          <VeyaLogo className="logo-image" />
        </div>

        <div className="nav-right">
          <div className="nav-account">
            <UserIcon />
            <span>Sign in</span>
          </div>
          <div className="nav-cart">
            <BagIcon />
          </div>
        </div>
      </div>

      {/* Conveyance Bar */}
      <div className="nav-conveyance">
        <LocationIcon />
        <div className="location-info">
          <span>Pickup</span>
          <span className="dot">•</span>
          <span>Today, ASAP (20-30 Min)</span>
          <span className="dot">•</span>
          <span className="location-name">Main Street</span>
          <div className="dropdown-icon">
            <ChevronDownIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

// Hero Section
function HeroSection() {
  return (
    <div className="hero-section">
      <div className="hero-background">
        <img src={HERO_IMAGE} alt="" className="hero-image" />
        <div className="hero-overlay" />
      </div>
      <h1 className="hero-title">Menu</h1>
    </div>
  )
}

// Menu Categories
const CATEGORIES = [
  { id: 'mezze', name: 'Mezze & Small Plates', icon: 'mezze' },
  { id: 'wraps', name: 'Wraps & Pitas', icon: 'wraps' },
  { id: 'bowls', name: 'Bowls', icon: 'bowls' },
  { id: 'sandwiches', name: 'Sandwiches & Mains', icon: 'sandwiches' },
  { id: 'sides', name: 'Sides', icon: 'sides' },
  { id: 'soups', name: 'Soups & Salads', icon: 'soups' },
]

function MenuCategories({ activeCategory, onCategoryChange }: { activeCategory: string; onCategoryChange: (id: string) => void }) {
  return (
    <div className="menu-categories">
      {CATEGORIES.map((category) => (
        <button
          key={category.id}
          className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
        >
          <div className="category-icon">
            <CategoryIcon name={category.icon} />
          </div>
          <span className="category-name">{category.name}</span>
        </button>
      ))}
    </div>
  )
}

// Menu Card Component
interface MenuCardProps {
  title: string
  description: string
  calories: string
  price: string
  tag?: string
  imageUrl?: string
}

function MenuCard({ title, description, calories, price, tag, imageUrl }: MenuCardProps) {
  return (
    <div className="menu-card">
      <div className="card-image-wrapper">
        <div className="card-image">
          {imageUrl ? (
            <img src={imageUrl} alt={title} />
          ) : (
            <div className="card-image-placeholder" />
          )}
        </div>
      </div>
      <div className="card-content">
        <div className="card-title-section">
          <h3 className="card-title">{title}</h3>
          {tag && (
            <div className="card-tag-wrapper">
              <span className="card-tag">{tag}</span>
            </div>
          )}
        </div>
        <div className="card-divider" />
        <div className="card-details">
          <p className="card-description">{description}</p>
          <div className="card-meta">
            <span>{calories}</span>
            <span className="dot">•</span>
            <span>{price}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Menu Grid
const SAMPLE_MENU_ITEMS: MenuCardProps[] = [
  { title: 'Hummus Plate', description: 'Lorem ipsum dolor sit amet consectetur. Quis sem in odio in porta viverra non egestas tincidunt.', calories: '560 Cal', price: '$13.99', tag: 'SEASONAL' },
  { title: 'Falafel Bowl', description: 'Lorem ipsum dolor sit amet consectetur. Quis sem in odio in porta viverra non egestas tincidunt.', calories: '480 Cal', price: '$14.99', tag: 'POPULAR' },
  { title: 'Shawarma Wrap', description: 'Lorem ipsum dolor sit amet consectetur. Quis sem in odio in porta viverra non egestas tincidunt.', calories: '620 Cal', price: '$15.99' },
  { title: 'Greek Salad', description: 'Lorem ipsum dolor sit amet consectetur. Quis sem in odio in porta viverra non egestas tincidunt.', calories: '320 Cal', price: '$12.99' },
  { title: 'Lamb Kebab', description: 'Lorem ipsum dolor sit amet consectetur. Quis sem in odio in porta viverra non egestas tincidunt.', calories: '580 Cal', price: '$17.99', tag: 'NEW' },
  { title: 'Chicken Pita', description: 'Lorem ipsum dolor sit amet consectetur. Quis sem in odio in porta viverra non egestas tincidunt.', calories: '510 Cal', price: '$14.49' },
  { title: 'Veggie Bowl', description: 'Lorem ipsum dolor sit amet consectetur. Quis sem in odio in porta viverra non egestas tincidunt.', calories: '390 Cal', price: '$13.49' },
  { title: 'Beef Shawarma', description: 'Lorem ipsum dolor sit amet consectetur. Quis sem in odio in porta viverra non egestas tincidunt.', calories: '650 Cal', price: '$16.99' },
]

function MenuGrid() {
  return (
    <div className="menu-grid-section">
      <div className="menu-grid">
        {SAMPLE_MENU_ITEMS.map((item, index) => (
          <MenuCard key={index} {...item} imageUrl={PRODUCT_IMAGE} />
        ))}
      </div>
    </div>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo Column */}
        <div className="footer-column footer-brand">
          <div className="footer-logo">
            <VeyaLogo className="footer-logo-image" />
          </div>
          <p className="footer-copyright">©2026 Built on Veya. All Rights Reserved.</p>
          <div className="footer-social">
            <a href="#" className="social-icon"><InstagramIcon /></a>
            <a href="#" className="social-icon"><TikTokIcon /></a>
            <a href="#" className="social-icon"><TwitterIcon /></a>
            <a href="#" className="social-icon"><LinkedInIcon /></a>
          </div>
          <div className="footer-apps">
            <a href="#" className="app-badge app-store">
              <img src={APP_STORE_ICON} alt="" className="app-badge-icon" />
              <div className="app-badge-content">
                <span className="app-badge-subtext">Download on the</span>
                <span className="app-badge-title">App Store</span>
              </div>
            </a>
            <a href="#" className="app-badge google-play">
              <img src={GOOGLE_PLAY_ICON} alt="" className="app-badge-icon" />
              <div className="app-badge-content">
                <span className="app-badge-subtext">GET IT ON</span>
                <img src={GOOGLE_PLAY_TEXT} alt="Google Play" className="google-play-text" />
              </div>
            </a>
          </div>
        </div>

        {/* Spacer columns */}
        <div className="footer-column footer-spacer" />
        <div className="footer-column footer-spacer" />

        {/* About Us Column */}
        <div className="footer-column">
          <h4 className="footer-heading">About Us</h4>
          <ul className="footer-links">
            <li><a href="#">Careers</a></li>
            <li><a href="#">Investor Relations</a></li>
            <li><a href="#">Locations</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>

        {/* Support Column */}
        <div className="footer-column">
          <h4 className="footer-heading">Support & Services</h4>
          <ul className="footer-links">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Gift Cards</a></li>
            <li><a href="#">Store</a></li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="footer-column">
          <h4 className="footer-heading">Legal</h4>
          <ul className="footer-links">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Consumer Health Data Notice</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

// ============================================================================
// Main Preview Page
// ============================================================================

export default function PreviewPage() {
  const [activeCategory, setActiveCategory] = useState('mezze')
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

  return (
    <div className="preview-page" style={cssVars as React.CSSProperties}>
      <TopNavigation />
      <HeroSection />
      <MenuCategories activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <MenuGrid />
      <MenuGrid />
      <Footer />
    </div>
  )
}
