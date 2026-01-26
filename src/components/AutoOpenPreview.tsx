'use client'

import { useEffect } from 'react'

export const AutoOpenPreview: React.FC = () => {
  useEffect(() => {
    // Collapse the nav sidebar
    const collapseNav = () => {
      const navToggle = document.querySelector('[aria-label="Toggle Navigation"]') as HTMLButtonElement
      const nav = document.querySelector('nav.nav')
      
      // Check if nav is open (visible)
      if (nav && getComputedStyle(nav).display !== 'none') {
        if (navToggle) {
          navToggle.click()
        }
      }
    }

    // Open the live preview
    const openPreview = () => {
      // Check if preview is already open
      const existingPreview = document.querySelector('[class*="live-preview-window"]')
      if (existingPreview) return true

      // Find all buttons and look for one that might be the preview toggle
      const buttons = document.querySelectorAll('button')
      for (const button of buttons) {
        const ariaLabel = button.getAttribute('aria-label') || ''
        const text = button.textContent || ''
        
        if (
          ariaLabel.toLowerCase().includes('preview') ||
          text.toLowerCase().includes('preview')
        ) {
          button.click()
          return true
        }
      }
      return false
    }

    // Run after a short delay to let the page render
    const timer = setTimeout(() => {
      collapseNav()
      
      // Try opening preview a few times
      let attempts = 0
      const tryOpen = setInterval(() => {
        if (openPreview() || attempts >= 5) {
          clearInterval(tryOpen)
        }
        attempts++
      }, 500)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return null
}

export default AutoOpenPreview
