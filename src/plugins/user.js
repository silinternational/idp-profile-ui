import Vue from 'vue';
import api from './api';
import token from '@/global/token';

let user = {
  refresh: async function() {
    Object.assign(this, await api.get('/user/me'));
  },
  isAuthenticated() {
    return !!this.idp_username;
  },
  login(returnTo) {
    token.reset();

    let loginUrl = `${
      api.defaults.baseURL
    }/auth/login?client_id=${token.key()}`;

    if (returnTo) {
      loginUrl += `&ReturnTo=${returnTo}`;
    }

    window.location = loginUrl;
  },
  logout() {
    let logoutUrl = `${api.defaults.baseURL}/auth/logout?access_token=${
      token.accessToken
    }`;

    token.reset();

    window.location = logoutUrl;
  },
  isNew() {
    return !this.password_meta;
  }
};

Vue.use(theVue => {
  theVue.prototype.$user = user;
});

export default user; // provided as an export in case other plugins need the user, e.g., ./api.js
