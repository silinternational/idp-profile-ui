import '@babel/polyfill';
import Vue from 'vue';
import './plugins';
import router from './plugins/router';
import App from './App.vue';
import '@/global/components';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
