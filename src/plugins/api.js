import Vue from 'vue';
import axios from 'axios';
import token from '@/global/token';
import user from '@/plugins/user';

// Full config:  https://github.com/axios/axios#request-config
const api = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}`,
  headers: {
    Authorization: token.authzHeader()
  },
  withCredentials: true
});

api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response && error.response.status == 401) {
      user.login();
    }

    throw error;
  }
);

Vue.use(theVue => {
  theVue.prototype.$API = api;
});

export default api; // provided as an export in case other plugins need the api, e.g., ./config.js
