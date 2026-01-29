import type { GlobalConfig } from 'payload'

export const Overview: GlobalConfig = {
  slug: 'overview',
  label: 'Overview',
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  admin: {
    group: 'Analytics',
    hideAPIURL: true,
    components: {
      views: {
        edit: {
          root: {
            Component: '/components/admin/AnalyticsOverviewView',
          },
        },
      },
    },
  },
  fields: [
    // No fields needed - this is a dashboard view
    {
      name: 'lastViewed',
      type: 'date',
      admin: {
        hidden: true,
      },
    },
  ],
}
