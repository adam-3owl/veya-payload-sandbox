'use client'

import { SectionRenderer } from '../schema/SectionRenderer'
import { menuSchema } from '../schema/sections/menuSchema'

export function MenuSection() {
  return <SectionRenderer schema={menuSchema} />
}
