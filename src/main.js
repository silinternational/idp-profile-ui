import '@babel/polyfill'
import Vue from 'vue'
import './plugins'
import router from './plugins/router'
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
  router,
  render: h => h(App)
}).$mount('#app')
