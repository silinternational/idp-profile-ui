import Vue from 'vue'
import token from '@/global/token'

const user = {
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
    const logoutUrl = `${Vue.prototype.$API.defaults.baseURL}/auth/logout?access_token=${token.apiToken()}`

    token.reset()

    window.location = logoutUrl
  },
  isNew() {
    return ! (this.password_meta && this.password_meta.last_changed)
  },
}

Vue.use(theVue => {
  theVue.prototype.$user = user
})
