import type { GlobalConfig } from 'payload'

export const AppsIntegrations: GlobalConfig = {
  slug: 'apps-integrations',
  label: 'Apps & Integrations',
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  admin: {
    group: 'Frontend Experiences',
  },
  fields: [
    // Google Group
    {
      type: 'group',
      name: 'google',
      label: 'Google',
      fields: [
        {
          name: 'analyticsId',
          type: 'text',
          label: 'Google Analytics Measurement ID',
          admin: {
            placeholder: 'G-XXXXXXXXXX',
            description: 'Your Google Analytics 4 Measurement ID',
          },
        },
        {
          name: 'metaPixel',
          type: 'text',
          label: 'Meta Pixel ID',
          admin: {
            placeholder: '1234567890',
            description: 'Your Meta (Facebook) Pixel ID',
          },
        },
        {
          name: 'recaptchaSiteKey',
          type: 'text',
          label: 'reCAPTCHA Site Key',
          admin: {
            description: 'Public site key for Google reCAPTCHA',
          },
        },
        {
          name: 'recaptchaSecretKey',
          type: 'text',
          label: 'reCAPTCHA Secret Key',
          admin: {
            description: 'Secret key for server-side verification (keep this private)',
          },
        },
      ],
    },
    // Push Notifications Group
    {
      type: 'group',
      name: 'pushNotifications',
      label: 'Push Notifications',
      fields: [
        {
          name: 'provider',
          type: 'select',
          label: 'Provider',
          admin: {
            description: 'Select your push notification provider',
          },
          options: [
            { label: 'None', value: 'none' },
            { label: 'Attentive', value: 'attentive' },
            { label: 'OneSignal', value: 'onesignal' },
          ],
          defaultValue: 'none',
        },
        // Attentive Fields
        {
          type: 'collapsible',
          label: 'Attentive Settings',
          admin: {
            condition: (_data, siblingData) => siblingData?.provider === 'attentive',
          },
          fields: [
            {
              name: 'attentiveApiKey',
              type: 'text',
              label: 'API Key',
              admin: {
                description: 'Your Attentive API key',
              },
            },
            {
              name: 'attentiveCompanyId',
              type: 'text',
              label: 'Company ID',
              admin: {
                description: 'Your Attentive company identifier',
              },
            },
            {
              name: 'attentiveSignUpSourceId',
              type: 'text',
              label: 'Sign-Up Source ID',
              admin: {
                description: 'Source ID for tracking sign-up origins',
              },
            },
          ],
        },
        // OneSignal Fields
        {
          type: 'collapsible',
          label: 'OneSignal Settings',
          admin: {
            condition: (_data, siblingData) => siblingData?.provider === 'onesignal',
          },
          fields: [
            {
              name: 'oneSignalAppId',
              type: 'text',
              label: 'App ID',
              admin: {
                description: 'Your OneSignal App ID',
              },
            },
            {
              name: 'oneSignalApiKey',
              type: 'text',
              label: 'REST API Key',
              admin: {
                description: 'Your OneSignal REST API Key (keep this private)',
              },
            },
            {
              name: 'oneSignalSafariWebId',
              type: 'text',
              label: 'Safari Web ID',
              admin: {
                description: 'Optional: Safari Web Push ID for Safari browser support',
              },
            },
          ],
        },
      ],
    },
    // Custom Code Group
    {
      type: 'group',
      name: 'customCode',
      label: 'Custom Code',
      fields: [
        {
          name: 'headCode',
          type: 'code',
          label: 'Head Code',
          admin: {
            language: 'html',
            description: 'Code to inject into the <head> section of every page',
            components: {
              Field: '/components/fields/CodeFieldWithSave',
            },
          },
        },
        {
          name: 'footerCode',
          type: 'code',
          label: 'Footer Code',
          admin: {
            language: 'html',
            description: 'Code to inject before the closing </body> tag',
            components: {
              Field: '/components/fields/CodeFieldWithSave',
            },
          },
        },
      ],
    },
  ],
}
