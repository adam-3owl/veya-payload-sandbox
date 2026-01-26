'use client'

import { useState, useRef, useEffect } from 'react'
import { Monitor, Tablet, Smartphone } from 'lucide-react'
import type { ThemeEditor as ThemeEditorType } from '@/payload-types'

type Breakpoint = 'mobile' | 'tablet' | 'desktop'

interface BreakpointConfig {
  id: Breakpoint
  label: string
  icon: React.ReactNode
  width: number
  height: number
}

const breakpoints: BreakpointConfig[] = [
  { id: 'mobile', label: 'Mobile', icon: <Smartphone size={16} />, width: 375, height: 667 },
  { id: 'tablet', label: 'Tablet', icon: <Tablet size={16} />, width: 768, height: 1024 },
  { id: 'desktop', label: 'Desktop', icon: <Monitor size={16} />, width: 1440, height: 900 },
]

interface PreviewPanelProps {
  themeData: ThemeEditorType | null
}

export function PreviewPanel({ themeData }: PreviewPanelProps) {
  const [activeBreakpoint, setActiveBreakpoint] = useState<Breakpoint>('desktop')
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const currentBreakpoint = breakpoints.find(bp => bp.id === activeBreakpoint) || breakpoints[2]

  // Calculate scale to fit iframe in container
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return
      const containerWidth = containerRef.current.clientWidth - 32 // padding
      const containerHeight = containerRef.current.clientHeight - 80 // header + padding
      const scaleX = containerWidth / currentBreakpoint.width
      const scaleY = containerHeight / currentBreakpoint.height
      // Scale up by 10% for larger preview
      setScale(Math.min(scaleX, scaleY, 1.1))
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [currentBreakpoint.width, currentBreakpoint.height])

  // Send theme data to iframe via postMessage
  useEffect(() => {
    if (iframeRef.current?.contentWindow && themeData) {
      iframeRef.current.contentWindow.postMessage(
        { type: 'THEME_UPDATE', payload: themeData },
        window.location.origin
      )
    }
  }, [themeData])

  return (
    <div className="theme-editor__preview" ref={containerRef}>
      <div className="theme-editor__preview-header">
        <span className="theme-editor__preview-title">Preview</span>
        <div className="theme-editor__breakpoints">
          {breakpoints.map((bp) => (
            <button
              key={bp.id}
              type="button"
              className={`theme-editor__breakpoint-btn ${activeBreakpoint === bp.id ? 'theme-editor__breakpoint-btn--active' : ''}`}
              onClick={() => setActiveBreakpoint(bp.id)}
              title={`${bp.label} (${bp.width}x${bp.height})`}
            >
              {bp.icon}
            </button>
          ))}
        </div>
      </div>
      <div className="theme-editor__preview-container">
        <div
          className="theme-editor__iframe-wrapper"
          style={{
            width: currentBreakpoint.width,
            height: currentBreakpoint.height,
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          <iframe
            ref={iframeRef}
            src="/preview"
            className="theme-editor__iframe"
            title="Theme Preview"
          />
        </div>
      </div>
    </div>
  )
}
