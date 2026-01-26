'use client'

import { ArrowLeft, CloudUpload, Save } from 'lucide-react'
import { useThemeEditor } from './ThemeEditorContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function Header() {
  const { isDirty, isSaving, draftStatus, saveDraft, publish, reset } = useThemeEditor()
  const router = useRouter()
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false)

  const handleExit = () => {
    if (isDirty) {
      setShowUnsavedWarning(true)
    } else {
      router.push('/admin')
    }
  }

  const handleConfirmExit = () => {
    router.push('/admin')
  }

  const handleCancelExit = () => {
    setShowUnsavedWarning(false)
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
      <header className="theme-editor__header">
        <div className="theme-editor__header-left">
          <button
            type="button"
            className="theme-editor__exit-btn"
            onClick={handleExit}
          >
            <ArrowLeft size={18} />
            <span>Exit</span>
          </button>
          <h1 className="theme-editor__title">Theme Editor</h1>
          {draftStatus === 'draft' && (
            <span className="theme-editor__status theme-editor__status--draft">
              Draft
            </span>
          )}
        </div>
        <div className="theme-editor__header-right">
          <button
            type="button"
            className="theme-editor__btn theme-editor__btn--secondary"
            onClick={reset}
            disabled={!isDirty || isSaving}
          >
            Discard
          </button>
          <button
            type="button"
            className="theme-editor__btn theme-editor__btn--outline"
            onClick={handleSaveDraft}
            disabled={!canSaveDraft}
            title="Save changes without publishing to live site"
          >
            <Save size={16} />
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            type="button"
            className="theme-editor__btn theme-editor__btn--primary"
            onClick={handlePublish}
            disabled={!canPublish}
            title="Publish changes to live site"
          >
            <CloudUpload size={16} />
            {isSaving ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </header>

      {showUnsavedWarning && (
        <div className="theme-editor__modal-overlay">
          <div className="theme-editor__modal">
            <h2 className="theme-editor__modal-title">Unsaved Changes</h2>
            <p className="theme-editor__modal-text">
              You have unsaved changes. Are you sure you want to exit?
            </p>
            <div className="theme-editor__modal-actions">
              <button
                type="button"
                className="theme-editor__btn theme-editor__btn--secondary"
                onClick={handleCancelExit}
              >
                Keep Editing
              </button>
              <button
                type="button"
                className="theme-editor__btn theme-editor__btn--danger"
                onClick={handleConfirmExit}
              >
                Discard & Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
