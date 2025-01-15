import axios from 'axios'
import user from '@/plugins/user'
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const e = (error.response && error.response.data) || error

    if ([401, 403].includes(e.status)) {
      user.login(location.hash)
    }

    throw e
  },
)

export default api
