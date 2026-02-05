'use client'

import { SectionRenderer } from '../schema/SectionRenderer'
import { navigationSchema } from '../schema/sections/navigationSchema'

export function NavigationSection() {
  return <SectionRenderer schema={navigationSchema} />
}
