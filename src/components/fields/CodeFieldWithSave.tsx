'use client'

import { useCallback, useState } from 'react'
import { CodeField, useField, useForm, useDocumentInfo } from '@payloadcms/ui'
import type { CodeFieldClientProps } from 'payload'

export default function CodeFieldWithSave(props: CodeFieldClientProps) {
  const { path } = props
  useField<string>({ path })
  const { submit } = useForm()
  useDocumentInfo()
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSave = useCallback(async () => {
    setIsSaving(true)
    setSaveStatus('idle')

    try {
      await submit()
      setSaveStatus('success')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch (error) {
      console.error('Save failed:', error)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } finally {
      setIsSaving(false)
    }
  }, [submit])

  return (
    <div className="code-field-with-save">
      <CodeField {...props} />
      <div className="code-field-with-save__actions">
        <button
          type="button"
          className={`code-field-with-save__btn ${saveStatus === 'success' ? 'code-field-with-save__btn--success' : ''} ${saveStatus === 'error' ? 'code-field-with-save__btn--error' : ''}`}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : saveStatus === 'error' ? 'Error' : 'Save'}
        </button>
      </div>
      <style>{`
        .code-field-with-save {
          position: relative;
        }
        .code-field-with-save__actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 8px;
        }
        .code-field-with-save__btn {
          padding: 8px 16px;
          background: var(--theme-elevation-900);
          color: var(--theme-elevation-0);
          border: none;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .code-field-with-save__btn:hover:not(:disabled) {
          background: var(--theme-elevation-800);
        }
        .code-field-with-save__btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .code-field-with-save__btn--success {
          background: var(--theme-success-500, #22c55e);
        }
        .code-field-with-save__btn--error {
          background: var(--theme-error-500, #ef4444);
        }
      `}</style>
    </div>
  )
}
