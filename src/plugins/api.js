import Vue from 'vue'
import axios from 'axios'

// Full config:  https://github.com/axios/axios#request-config
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const e = (error.response && error.response.data) || error

    if ([401, 403].includes(e.status)) {
      Vue.prototype.$user.login(location.hash)
    }

    throw e
  },
)

Vue.use((theVue) => {
  theVue.prototype.$API = api
})
