import Vue from 'vue';
import api from './api';

let config = {};

Vue.prototype.$getConfig = getConfig;

async function getConfig() {
  return new Promise(async resolve => {
    if (!config.cached) {
      config = await api.fake({
        idpName: 'SIL'
      });

      config.cached = true;
    }

    resolve(config);
  });
}
