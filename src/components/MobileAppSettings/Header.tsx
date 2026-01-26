'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, CloudUpload, X, CheckCircle, AlertCircle } from 'lucide-react'
import { useMobileAppSettings } from './MobileAppSettingsContext'

export function Header() {
  const router = useRouter()
  const { isDirty, isSaving, draftStatus, notification, saveDraft, publish, reset, clearNotification } = useMobileAppSettings()
  const [showDiscardModal, setShowDiscardModal] = useState(false)

  const handleExit = () => {
    if (isDirty) {
      setShowDiscardModal(true)
    } else {
      router.push('/admin')
    }
  }

  const handleDiscard = () => {
    reset()
    setShowDiscardModal(false)
    router.push('/admin')
  }

  const handleSaveDraft = async () => {
    try {
      await saveDraft()
    } catch (error) {
      console.error('Save draft failed:', error)
    }
  }

  const handlePublish = async () => {
    try {
      await publish()
    } catch (error) {
      console.error('Publish failed:', error)
    }
  }

  // Determine what actions are available
  const canSaveDraft = isDirty && !isSaving
  const canPublish = (isDirty || draftStatus === 'draft') && !isSaving

  return (
    <>
      {/* Notification Toast */}
      {notification && (
        <div className={`mobile-app-settings__toast mobile-app-settings__toast--${notification.type}`}>
          {notification.type === 'success' ? (
            <CheckCircle size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          <span>{notification.message}</span>
          <button
            className="mobile-app-settings__toast-close"
            onClick={clearNotification}
            type="button"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <header className="mobile-app-settings__header">
        <div className="mobile-app-settings__header-left">
          <button
            className="mobile-app-settings__exit-btn"
            onClick={handleExit}
            type="button"
          >
            <ArrowLeft size={16} />
            Exit
          </button>
          <h1 className="mobile-app-settings__title">Mobile App Settings</h1>
          {draftStatus === 'draft' && (
            <span className="mobile-app-settings__status mobile-app-settings__status--draft">
              Draft
            </span>
          )}
        </div>

        <div className="mobile-app-settings__header-right">
          <button
            className="mobile-app-settings__btn mobile-app-settings__btn--secondary"
            onClick={() => reset()}
            disabled={!isDirty || isSaving}
            type="button"
          >
            Discard
          </button>
          <button
            className="mobile-app-settings__btn mobile-app-settings__btn--outline"
            onClick={handleSaveDraft}
            disabled={!canSaveDraft}
            title="Save changes without publishing to live app"
            type="button"
          >
            <Save size={16} />
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            className="mobile-app-settings__btn mobile-app-settings__btn--primary"
            onClick={handlePublish}
            disabled={!canPublish}
            title="Publish changes to live app"
            type="button"
          >
            <CloudUpload size={16} />
            {isSaving ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </header>

      {showDiscardModal && (
        <div className="mobile-app-settings__modal-overlay">
          <div className="mobile-app-settings__modal">
            <h2 className="mobile-app-settings__modal-title">Unsaved Changes</h2>
            <p className="mobile-app-settings__modal-text">
              You have unsaved changes. Are you sure you want to leave?
            </p>
            <div className="mobile-app-settings__modal-actions">
              <button
                className="mobile-app-settings__btn mobile-app-settings__btn--secondary"
                onClick={() => setShowDiscardModal(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="mobile-app-settings__btn mobile-app-settings__btn--danger"
                onClick={handleDiscard}
                type="button"
              >
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
