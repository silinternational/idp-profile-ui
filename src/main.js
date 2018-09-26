import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './plugins/router';
import '@/global/components';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
