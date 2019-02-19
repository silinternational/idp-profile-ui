import Vue from 'vue'
import token from '@/global/token'

const user = {
  recoveryMethods: {
    builtIn: [],
    personal: []
  },
  mfas: [],
  refresh: async function () {
    Object.assign(this, await Vue.prototype.$API.get('/user/me'))

    // 'login' scope is the only time extra data can be gathered, e.g, method or mfa calls will return a 403 in 'reset' scope
    if (this.auth_type == 'login') {
      const methodPromise = api.get('method')
      const mfaPromise = api.get('mfa')
  
      const all = await methodPromise
      Object.assign(this.recoveryMethods.builtIn, all.filter(m => m.type != 'email'))
      Object.assign(this.recoveryMethods.personal, all.filter(m => m.type == 'email'))
  
      Object.assign(this.mfas, await mfaPromise)
    }
  },
  isAuthenticated() {
    return !!this.idp_username
  },
  login(returnTo, inviteCode = '') {
    token.reset()

    let loginUrl = `${Vue.prototype.$API.defaults.baseURL}/auth/login?client_id=${token.key()}`

    if (inviteCode) {
      loginUrl += `&invite=${inviteCode}&ReturnToOnError=/profile/invite/expired`
    }

    if (returnTo) {
      loginUrl += `&ReturnTo=${returnTo}`
    }

    window.location = loginUrl
  },
  logout() {
    const logoutUrl = `${Vue.prototype.$API.defaults.baseURL}/auth/logout?access_token=${token.accessToken}`

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
