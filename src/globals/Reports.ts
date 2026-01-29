import type { GlobalConfig } from 'payload'

export const Reports: GlobalConfig = {
  slug: 'reports',
  label: 'Reports',
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  admin: {
    group: 'Analytics',
  },
  fields: [
    {
      name: 'placeholder',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/admin/PlaceholderField',
        },
      },
    },
  ],
}
