'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface SectionGroupProps {
  title: string
  sectionId: string
  isOpen: boolean
  onToggle: (sectionId: string) => void
  children: ReactNode
}

export function SectionGroup({ title, sectionId, isOpen, onToggle, children }: SectionGroupProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0)

  useEffect(() => {
    if (!contentRef.current) return

    if (isOpen) {
      const contentHeight = contentRef.current.scrollHeight
      setHeight(contentHeight)
      // After animation completes, set to auto for dynamic content
      const timer = setTimeout(() => setHeight(undefined), 250)
      return () => clearTimeout(timer)
    } else {
      // First set to current height, then animate to 0
      const contentHeight = contentRef.current.scrollHeight
      setHeight(contentHeight)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setHeight(0)
        })
      })
    }
  }, [isOpen])

  return (
    <div className={`te-section ${isOpen ? 'te-section--open' : ''}`}>
      <button
        type="button"
        className="te-section__header"
        onClick={() => onToggle(sectionId)}
      >
        <span className="te-section__title">{title}</span>
        <ChevronDown
          size={18}
          className={`te-section__icon ${isOpen ? 'te-section__icon--open' : ''}`}
        />
      </button>
      <div
        ref={contentRef}
        className="te-section__content-wrapper"
        style={{
          height: height === undefined ? 'auto' : height,
          overflow: 'hidden',
          transition: 'height 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="te-section__content">{children}</div>
      </div>
    </div>
  )
}
