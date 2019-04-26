import '@babel/polyfill'
import Vue from 'vue'
import { configuredRouter } from  './plugins'
import App from './App.vue'
import '@/global/components'
import '@/global/filters'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

new Vue({
  data: {
    idpConfig: {}
  },
  async created() {
    this.idpConfig = await this.$API.get('config')
  },
  router: configuredRouter,
  iconfont: 'md',
  render: h => h(App),
}).$mount('#app')
