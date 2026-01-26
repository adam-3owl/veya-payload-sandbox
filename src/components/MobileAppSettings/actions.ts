'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import type { MobileAppSetting } from '@/payload-types'

async function getAuthenticatedUser() {
  const payload = await getPayload({ config })

  // Get the cookie store
  const cookieStore = await cookies()

  // Build headers with the cookie for authentication
  const cookieHeader = cookieStore.getAll()
    .map(c => `${c.name}=${c.value}`)
    .join('; ')

  const headers = new Headers()
  headers.set('Cookie', cookieHeader)

  // Find the user from the token
  const { user } = await payload.auth({ headers })

  return { payload, user }
}

export async function saveMobileAppSettings(data: MobileAppSetting): Promise<{ success: boolean; error?: string }> {
  try {
    const { payload, user } = await getAuthenticatedUser()

    if (!user) {
      return { success: false, error: 'You must be logged in to save settings' }
    }

    // Update the global with user context - publish
    await payload.updateGlobal({
      slug: 'mobile-app-settings',
      data: { ...data, _status: 'published' },
      user,
      overrideAccess: false,
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to publish mobile app settings:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to publish settings'
    }
  }
}

export async function saveMobileAppSettingsDraft(data: MobileAppSetting): Promise<{ success: boolean; error?: string }> {
  try {
    const { payload, user } = await getAuthenticatedUser()

    if (!user) {
      return { success: false, error: 'You must be logged in to save settings' }
    }

    // Update the global with user context - save as draft
    await payload.updateGlobal({
      slug: 'mobile-app-settings',
      data: { ...data, _status: 'draft' },
      user,
      overrideAccess: false,
      draft: true,
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to save mobile app settings draft:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save draft'
    }
  }
}
