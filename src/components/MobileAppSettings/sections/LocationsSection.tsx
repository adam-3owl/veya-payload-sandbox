'use client'

import { SectionRenderer } from '../schema/SectionRenderer'
import { locationsSchema } from '../schema/sections/locationsSchema'

export function LocationsSection() {
  return <SectionRenderer schema={locationsSchema} />
}
