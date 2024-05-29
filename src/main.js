import App from './App.vue'
import '@babel/polyfill'
import '@/global/components'
import '@/global/filters'
import { configuredRouter as router, configuredVuetify } from './plugins'
import * as Sentry from '@sentry/vue'
import Vue from 'vue'

const environment = process.env.NODE_ENV || 'development'
const dsn = process.env.VUE_APP_SENTRY_DSN
const release = process.env.VUE_APP_VERSION

console.debug('Environment:', environment, 'Release:', release, 'DSN:', dsn)
Sentry.init({
  Vue,
  dsn,
  integrations: [Sentry.browserTracingIntegration({ router }), Sentry.replayIntegration()],
  environment,
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
})

new Vue({
  data: {
    idpConfig: {},
  },
  async created() {
    this.idpConfig = await this.$API.get('config')
  },
  vuetify: configuredVuetify,
  router,
  render: (h) => h(App),
}).$mount('#app')
