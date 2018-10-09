import Vue from 'vue';
import api from './api';

let user = {
  cached: false
};

Vue.prototype.$getUser = getUser;

async function getUser() {
  return new Promise(async resolve => {
    if (!user.cached) {
      user = await api.fake({
        idp_username: 'cam_townsend',
        new: true,
        name: 'Uncle Cam'
      });

      user.isAuthenticated = user.cached = !!user.idp_username;
    }

    resolve(user);
  });
}
