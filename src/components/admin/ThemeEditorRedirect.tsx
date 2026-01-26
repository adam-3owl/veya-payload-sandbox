'use client'

import { AdminRedirect } from './AdminRedirect'

export default function ThemeEditorRedirect() {
  return (
    <AdminRedirect
      to="/admin/theme-editor"
      message="Redirecting to Theme Editor..."
    />
  )
}
