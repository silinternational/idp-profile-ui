import '@babel/polyfill'
import Vue from 'vue'
import { configuredRouter } from  './plugins'
import App from './App.vue'
import '@/global/components'
import '@/global/filters'

new Vue({
  data: {
    idpConfig: {}
  },
  async created() {
    this.idpConfig = await this.$API.get('config')
  },
  router: configuredRouter,
  render: h => h(App)
}).$mount('#app')
