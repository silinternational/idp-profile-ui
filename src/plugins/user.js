import Vue from 'vue'
import api from './api'
import token from '@/global/token'

let user = {
  recoveryMethods: {
    builtIn: [],
    personal: []
  },
  mfas: [],
  refresh: async function () {
    Object.assign(this, await api.get('/user/me'))

    const methodPromise = api.get('method')
    const mfaPromise = api.get('mfa')

    const all = await methodPromise
    Object.assign(this.recoveryMethods.builtIn, all.filter(m => m.type != 'email'))
    Object.assign(this.recoveryMethods.personal, all.filter(m => m.type == 'email'))

    Object.assign(this.mfas, await mfaPromise)
  },
  isAuthenticated() {
    return !!this.idp_username
  },
  login(returnTo, inviteCode = '') {
    token.reset()

    let loginUrl = `${api.defaults.baseURL}/auth/login?client_id=${token.key()}`

    if (inviteCode) {
      loginUrl += `&invite=${inviteCode}&ReturnToOnError=/profile/invite/expired`
    }

    if (returnTo) {
      loginUrl += `&ReturnTo=${returnTo}`
    }

    window.location = loginUrl
  },
  logout() {
    let logoutUrl = `${api.defaults.baseURL}/auth/logout?access_token=${token.accessToken}`

    token.reset()

    window.location = logoutUrl
  },
  isNew() {
    return !this.password_meta
  },
}

Vue.use(theVue => {
  theVue.prototype.$user = user
})

export default user // provided as an export in case other plugins need the user, e.g., ./api.js
