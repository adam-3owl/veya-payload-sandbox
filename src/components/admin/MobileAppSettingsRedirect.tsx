'use client'

import { AdminRedirect } from './AdminRedirect'

export default function MobileAppSettingsRedirect() {
  return (
    <AdminRedirect
      to="/admin/mobile-app-settings"
      message="Redirecting to Mobile App Settings..."
    />
  )
}
