'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export function ImageUpload({ label, value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('alt', file.name.replace(/\.[^/.]+$/, ''))

      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to upload image')
      }

      const data = await response.json()

      // Get the URL from the uploaded media
      const imageUrl = data.doc?.url || data.url
      if (imageUrl) {
        onChange(imageUrl)
      } else {
        throw new Error('No URL returned from upload')
      }
    } catch (err) {
      console.error('Upload failed:', err)
      setError('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
      // Reset the input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = () => {
    onChange('')
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="mas-field">
      <label className="mas-field__label">{label}</label>
      <div className="mas-image-upload">
        {value ? (
          <div className="mas-image-upload__preview-container">
            <div className="mas-image-upload__preview">
              <img src={value} alt="Background preview" />
            </div>
            <div className="mas-image-upload__actions">
              <button
                type="button"
                className="mas-image-upload__btn mas-image-upload__btn--change"
                onClick={handleClick}
                disabled={isUploading}
              >
                <Upload size={14} />
                Change
              </button>
              <button
                type="button"
                className="mas-image-upload__btn mas-image-upload__btn--remove"
                onClick={handleRemove}
                disabled={isUploading}
              >
                <X size={14} />
                Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="mas-image-upload__dropzone"
            onClick={handleClick}
            disabled={isUploading}
          >
            <ImageIcon size={32} className="mas-image-upload__icon" />
            <span className="mas-image-upload__text">
              {isUploading ? 'Uploading...' : 'Click to upload image'}
            </span>
            <span className="mas-image-upload__hint">
              JPG, PNG, GIF up to 10MB
            </span>
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="mas-image-upload__input"
        />
        {error && (
          <p className="mas-image-upload__error">{error}</p>
        )}
      </div>
    </div>
  )
}
