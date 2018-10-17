import Vue from 'vue';
import api from './api';

Vue.use(async theVue => {
  theVue.prototype.$config = await api.fake('GET /config', {
    idpName: 'SIL'
  });
});
