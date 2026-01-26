'use client'

import { createContext, useContext, useState, useCallback, useRef, useMemo, ReactNode } from 'react'
import type { MobileAppSetting } from '@/payload-types'
import { saveMobileAppSettings, saveMobileAppSettingsDraft } from './actions'
import { deepClone, deepEqual, getValueByPath, setValueByPath } from '@/utils/objectUtils'

type DraftStatus = 'published' | 'draft' | 'modified'
type NotificationType = 'success' | 'error' | null

interface Notification {
  type: NotificationType
  message: string
}

interface MobileAppSettingsContextType {
  data: MobileAppSetting | null
  originalData: MobileAppSetting | null
  isDirty: boolean
  isSaving: boolean
  draftStatus: DraftStatus
  notification: Notification | null
  getValue: (path: string) => unknown
  updateField: (path: string, value: unknown) => void
  saveDraft: () => Promise<void>
  publish: () => Promise<void>
  reset: () => void
  clearNotification: () => void
}

const MobileAppSettingsContext = createContext<MobileAppSettingsContextType | null>(null)

interface ProviderProps {
  children: ReactNode
  initialData: MobileAppSetting | null
}

export function MobileAppSettingsProvider({ children, initialData }: ProviderProps) {
  const [data, setData] = useState<MobileAppSetting | null>(initialData ? deepClone(initialData) : null)
  const originalDataRef = useRef<MobileAppSetting | null>(initialData ? deepClone(initialData) : null)
  const [isSaving, setIsSaving] = useState(false)
  const [notification, setNotification] = useState<Notification | null>(null)
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Check if initial data was a draft (has _status field from Payload versioning)
  const [draftStatus, setDraftStatus] = useState<DraftStatus>(
    (initialData as { _status?: string })?._status === 'draft' ? 'draft' : 'published'
  )

  const isDirty = useMemo(
    () => !deepEqual(data, originalDataRef.current),
    [data]
  )

  const showNotification = useCallback((type: 'success' | 'error', message: string) => {
    // Clear any existing timeout
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current)
    }

    setNotification({ type, message })

    // Auto-dismiss after 4 seconds
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null)
    }, 4000)
  }, [])

  const clearNotification = useCallback(() => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current)
    }
    setNotification(null)
  }, [])

  const getValue = useCallback((path: string) => {
    return getValueByPath(data as Record<string, unknown> | null, path)
  }, [data])

  const updateField = useCallback((path: string, value: unknown) => {
    setData(prev => {
      if (!prev) return prev
      return setValueByPath(prev as unknown as Record<string, unknown>, path, value) as unknown as MobileAppSetting
    })
  }, [])

  const saveDraft = useCallback(async () => {
    if (!data) return

    setIsSaving(true)
    try {
      const result = await saveMobileAppSettingsDraft(data)

      if (!result.success) {
        throw new Error(result.error || 'Failed to save draft')
      }

      // Draft was saved - update the original reference and status
      originalDataRef.current = deepClone(data)
      setDraftStatus('draft')
      showNotification('success', 'Draft saved successfully')
    } catch (error) {
      console.error('Save draft failed:', error)
      showNotification('error', error instanceof Error ? error.message : 'Failed to save draft')
    } finally {
      setIsSaving(false)
    }
  }, [data, showNotification])

  const publish = useCallback(async () => {
    if (!data) return

    setIsSaving(true)
    try {
      const result = await saveMobileAppSettings(data)

      if (!result.success) {
        throw new Error(result.error || 'Failed to publish')
      }

      // Published successfully - update the original reference and status
      originalDataRef.current = deepClone(data)
      setDraftStatus('published')
      showNotification('success', 'Published successfully')
    } catch (error) {
      console.error('Publish failed:', error)
      showNotification('error', error instanceof Error ? error.message : 'Failed to publish')
    } finally {
      setIsSaving(false)
    }
  }, [data, showNotification])

  const reset = useCallback(() => {
    setData(originalDataRef.current ? deepClone(originalDataRef.current) : null)
  }, [])

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      data,
      originalData: originalDataRef.current,
      isDirty,
      isSaving,
      draftStatus,
      notification,
      getValue,
      updateField,
      saveDraft,
      publish,
      reset,
      clearNotification,
    }),
    [data, isDirty, isSaving, draftStatus, notification, getValue, updateField, saveDraft, publish, reset, clearNotification]
  )

  return (
    <MobileAppSettingsContext.Provider value={contextValue}>
      {children}
    </MobileAppSettingsContext.Provider>
  )
}

export function useMobileAppSettings() {
  const context = useContext(MobileAppSettingsContext)
  if (!context) {
    throw new Error('useMobileAppSettings must be used within MobileAppSettingsProvider')
  }
  return context
}
