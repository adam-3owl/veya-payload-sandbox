'use client'

import { SectionRenderer } from '../schema/SectionRenderer'
import { homeScreenSchema } from '../schema/sections/homeScreenSchema'

export function HomeScreenSection() {
  return <SectionRenderer schema={homeScreenSchema} />
}
