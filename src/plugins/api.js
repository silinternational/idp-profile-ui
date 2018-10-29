import Vue from 'vue';
import axios from 'axios';

// Full config:  https://github.com/axios/axios#request-config
const api = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}`,
  withCredentials: true
});

api.interceptors.response.use(
  response => response.data,
  error => {
    // if (
    //   !error.response ||
    //   !error.response.status ||
    //   error.response.status == 401
    // ) {
    //   window.location.href = `${process.env.VUE_APP_ADMIN_API_BASE_URL}/login`;
    // }

    return Promise.reject(error);
  }
);

Vue.use(theVue => {
  theVue.prototype.$API = api;
});

export default api; // provided as an export in case other plugins need the api, e.g., ./config.js
