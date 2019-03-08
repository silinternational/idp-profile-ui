import Vue from 'vue'
import axios from 'axios'
import token from '@/global/token'

// Full config:  https://github.com/axios/axios#request-config
const api = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}`,
  withCredentials: true,
})

api.interceptors.request.use(
  config => {
    config.headers.Authorization = token.authzHeader()

    return config
  },
  error => {
    const e = (error.response && error.response.data) || error

    throw e
  }
)

api.interceptors.response.use(
  response => response.data,
  error => {
    const e = (error.response && error.response.data) || error

    if ([401, 403].includes(e.status)) {
      Vue.prototype.$user.login(location.hash)
    }

    throw e
  }
)

Vue.use(theVue => {
  theVue.prototype.$API = api
})
