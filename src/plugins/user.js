import Vue from 'vue'

const user = {
  refresh: async function () {
    Object.assign(this, await Vue.prototype.$API.get('/user/me'))
  },
  isAuthenticated() {
    return !!this.idp_username
  },
  login(returnTo, inviteCode = '') {
    let loginUrl = `${Vue.prototype.$API.defaults.baseURL}/auth/login}`

    if (inviteCode) {
      loginUrl += `&invite=${inviteCode}&ReturnToOnError=/profile/invite/expired`
    }

    if (returnTo) {
      loginUrl += `&ReturnTo=${returnTo}`
    }

    window.location = loginUrl
  },
  logout() {
    const logoutUrl = `${Vue.prototype.$API.defaults.baseURL}/auth/logout}`

    window.location = logoutUrl
  },
  isNew() {
    return !(this.password_meta && this.password_meta.last_changed)
  },
}

Vue.use((theVue) => {
  theVue.prototype.$user = user
})
