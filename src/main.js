import { configuredRouter, configuredVuetify } from './plugins'
import App from './App.vue'
import '@/global/components'
import '@/global/filters'

import { createApp } from 'vue'

const app = createApp({
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
