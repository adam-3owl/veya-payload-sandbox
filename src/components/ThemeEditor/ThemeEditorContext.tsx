'use client'

import { createContext, useContext, useState, useCallback, useRef, useEffect, useMemo, type ReactNode } from 'react'
import type { ThemeEditor as ThemeEditorType } from '@/payload-types'
import { deepClone, deepEqual, getValueByPath, setValueByPath } from '@/utils/objectUtils'

type DraftStatus = 'published' | 'draft' | 'modified'

interface ThemeEditorContextValue {
  data: ThemeEditorType
  originalData: ThemeEditorType
  isDirty: boolean
  isSaving: boolean
  draftStatus: DraftStatus
  getValue: (path: string) => unknown
  updateField: (path: string, value: unknown) => void
  saveDraft: () => Promise<void>
  publish: () => Promise<void>
  reset: () => void
}

const ThemeEditorContext = createContext<ThemeEditorContextValue | null>(null)

export function useThemeEditor() {
  const context = useContext(ThemeEditorContext)
  if (!context) {
    throw new Error('useThemeEditor must be used within a ThemeEditorProvider')
  }
  return context
}

interface ThemeEditorProviderProps {
  initialData: ThemeEditorType | null
  children: ReactNode
  onDataChange?: (data: ThemeEditorType) => void
}

// Default theme values
const defaultTheme: Partial<ThemeEditorType> = {
  styles: {
    brandPrimaryLight: '#2fddd0',
    brandPrimaryLight400: '#bbf2e8',
    brandPrimaryLight200: '#f9f8f4',
    brandPrimaryLight50: '#ffffff',
    brandPrimaryDark: '#0b1f22',
    brandPrimaryDark400: '#133c45',
    brandPrimaryDark200: '#1e5a67',
    brandPrimaryDark50: '#308597',
    brandSecondarySlot1: '#fc5a44',
    brandSecondarySlot2: '#ff784e',
    brandSecondarySlot3: '#ff9a70',
    brandSecondarySlot4: '#ffe029',
    surfaceLight: '#ffffff',
    surfaceStripe: '#f9f8f4',
    surfaceDark: '#0b1f22',
    textDark: '#0b1f22',
    textMedium: '#405255',
    textLight: '#978f6f',
    textAccent: '#fc5a44',
    borderLight: '#dbdbdb',
    borderDark: '#0b1f22',
    borderExtraLight: '#f9f8f4',
    fontFamilyHeading: 'Owners',
    fontFamilyBody: 'Stack Sans Text',
    fontFamilyAccent: 'DM Mono',
    fontFamilyAction: 'Stack Sans Text',
    radiusMedium: '16px',
    radiusSmall: '12px',
    radiusLarge: '24px',
    radiusFull: '1000px',
  },
  settings: {
    enableAnimations: true,
    enableStickyHeader: true,
    enableBreadcrumbs: true,
  },
}

export function ThemeEditorProvider({ initialData, children, onDataChange }: ThemeEditorProviderProps) {
  const mergedInitial = {
    ...defaultTheme,
    ...initialData,
    styles: { ...defaultTheme.styles, ...initialData?.styles },
    settings: { ...defaultTheme.settings, ...initialData?.settings },
  } as ThemeEditorType

  const [data, setData] = useState<ThemeEditorType>(mergedInitial)
  const originalDataRef = useRef<ThemeEditorType>(deepClone(mergedInitial))
  const [isSaving, setIsSaving] = useState(false)
  // Check if initial data was a draft (has _status field from Payload versioning)
  const [draftStatus, setDraftStatus] = useState<DraftStatus>(
    (initialData as { _status?: string })?._status === 'draft' ? 'draft' : 'published'
  )

  const isDirty = useMemo(
    () => !deepEqual(data, originalDataRef.current),
    [data]
  )

  const getValue = useCallback((path: string): unknown => {
    return getValueByPath(data as unknown as Record<string, unknown>, path)
  }, [data])

  const updateField = useCallback((path: string, value: unknown) => {
    setData(prev => {
      const updated = setValueByPath(prev as unknown as Record<string, unknown>, path, value) as unknown as ThemeEditorType
      return updated
    })
  }, [])

  // Notify parent of data changes for live preview
  useEffect(() => {
    onDataChange?.(data)
  }, [data, onDataChange])

  const saveDraft = useCallback(async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/globals/theme-editor?draft=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, _status: 'draft' }),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to save draft')
      }

      // Draft was saved - update the original reference and status
      originalDataRef.current = deepClone(data)
      setDraftStatus('draft')
    } catch (error) {
      console.error('Failed to save draft:', error)
      throw error
    } finally {
      setIsSaving(false)
    }
  }, [data])

  const publish = useCallback(async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/globals/theme-editor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, _status: 'published' }),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to publish theme')
      }

      // Published successfully - update the original reference and status
      originalDataRef.current = deepClone(data)
      setDraftStatus('published')
    } catch (error) {
      console.error('Failed to publish:', error)
      throw error
    } finally {
      setIsSaving(false)
    }
  }, [data])

  const reset = useCallback(() => {
    setData(deepClone(originalDataRef.current))
  }, [])

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      data,
      originalData: originalDataRef.current,
      isDirty,
      isSaving,
      draftStatus,
      getValue,
      updateField,
      saveDraft,
      publish,
      reset,
    }),
    [data, isDirty, isSaving, draftStatus, getValue, updateField, saveDraft, publish, reset]
  )

  return (
    <ThemeEditorContext.Provider value={contextValue}>
      {children}
    </ThemeEditorContext.Provider>
  )
}
