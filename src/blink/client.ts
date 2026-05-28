import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID || 'github-deploy-wizard-3m3fjme8',
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_9KMa8mXvx3wHg2kJLcKwDxBzvT26J3Jk',
  authRequired: false,
  auth: { mode: 'managed' },
})
