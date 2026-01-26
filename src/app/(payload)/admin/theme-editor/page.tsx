import { getPayload } from 'payload'
import config from '@payload-config'
import { ThemeEditorClient } from '@/components/ThemeEditor'
import type { ThemeEditor as ThemeEditorType } from '@/payload-types'

export default async function ThemeEditorPage() {
  const payload = await getPayload({ config })

  let initialData: ThemeEditorType | null = null

  try {
    initialData = await payload.findGlobal({
      slug: 'theme-editor',
    })
  } catch (error) {
    console.error('Failed to fetch theme data:', error)
  }

  return <ThemeEditorClient initialData={initialData} />
}
