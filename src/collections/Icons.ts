import type { CollectionConfig } from 'payload'

export const Icons: CollectionConfig = {
  slug: 'icons',
  labels: {
    singular: 'Icon',
    plural: 'Icons',
  },
  admin: {
    group: 'Media',
    description: 'SVG icons for navigation and UI elements',
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'e.g., Home, Menu, Cart',
        description: 'A descriptive name for this icon',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Navigation', value: 'navigation' },
        { label: 'Actions', value: 'actions' },
        { label: 'Status', value: 'status' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'navigation',
      admin: {
        description: 'Category to organize icons',
      },
    },
  ],
  upload: {
    staticDir: 'icons',
    mimeTypes: ['image/svg+xml'],
    adminThumbnail: 'thumbnail',
    focalPoint: false,
  },
}
