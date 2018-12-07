import Vue from 'vue'
import axios from 'axios'
import token from '@/global/token'

// Full config:  https://github.com/axios/axios#request-config
const api = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}`,
  headers: {
    Authorization: token.authzHeader()
  },
  withCredentials: true
})

api.interceptors.response.use(
  response => response.data,
  error => {
    const e = (error.response && error.response.data) || error

    if (e.status == 401) {
      Vue.prototype.$user.login(location.pathname)
    }

    throw e
  }
)

Vue.use(theVue => {
  theVue.prototype.$API = api
})

export default api // provided as an export in case other plugins need the api, e.g., ./config.js
