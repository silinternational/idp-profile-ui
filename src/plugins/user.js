import Vue from 'vue'
import token from '@/global/token'

const user = {
  mfas: [],
  refresh: async function () {
    Object.assign(this, await Vue.prototype.$API.get('/user/me'))
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
