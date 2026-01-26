import { getPayload } from 'payload'
import config from '@payload-config'
import { MobileAppSettingsClient } from '@/components/MobileAppSettings'

export default async function MobileAppSettingsPage() {
  const payload = await getPayload({ config })

  let data = null
  try {
    data = await payload.findGlobal({
      slug: 'mobile-app-settings',
    })
  } catch (error) {
    // Global may not exist yet, that's okay
    console.log('Mobile App Settings not found, using defaults')
  }

  return <MobileAppSettingsClient initialData={data} />
}
