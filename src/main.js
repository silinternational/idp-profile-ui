import App from './App.vue'
import '@babel/polyfill'
import '@/global/components'
import '@/global/filters'
import { configuredRouter, configuredVuetify } from './plugins'
import * as Sentry from '@sentry/vue'
import Vue from 'vue'

Sentry.init({
  Vue,
  dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
  integrations: [Sentry.browserTracingIntegration({ configuredVuetify }), Sentry.replayIntegration()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],

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
  router: configuredRouter,
  render: (h) => h(App),
}).$mount('#app')
