import App from './App.vue'
import registerComponents from '@/global/components'
import { api, i18n, returnTo, router, user, vuetify } from './plugins'
import { createApp } from 'vue'
import * as Sentry from '@sentry/vue'
import VueSanitize from 'vue-sanitize-directive'

const dsn = import.meta.env.VITE_SENTRY_DSN
const release = __APP_VERSION__

const app = createApp(App)

app.config.globalProperties.$idpConfig = {}
;(async () => {
  try {
    const config = await api.get('config')
    app.config.globalProperties.$idpConfig = config
  } catch (error) {
    console.error('Failed to load IDP configuration:', error)
  }
})()

app.config.globalProperties.$API = api
app.config.globalProperties.$user = user

registerComponents(app)
app.use(i18n)
app.use(returnTo)
app.use(router)
app.use(vuetify)
app.use(VueSanitize)

if (location.hostname !== 'profile.gtis.guru') {
  console.debug('Environment:', location.hostname, 'Release:', release, 'DSN:', dsn)

  Sentry.init({
    app,
    dsn,
    integrations: [Sentry.browserTracingIntegration({ router }), Sentry.replayIntegration()],
    environment: location.hostname,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,

    // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
    // tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    beforeSend(event, hint) {
      const status = hint.originalException?.status
      if (status === 404 || status === 401 || status === 403) {
        return null
      }
      return event
    },
  })
}

app.mount('#app')

export { app }
