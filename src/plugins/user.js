import Vue from 'vue';
import api from './api';

let user = {
  update: async function update() {
    Object.assign(this, await api.fake('GET /user/me', USER_W_ALL));
  },
  new() {
    return !this.password_meta;
  }
};

Vue.use(theVue => {
  theVue.prototype.$user = user;
});

// TODO: temp stubs, remove once real calls are integrated
// const NEW_USER = {
//   idp_username: 'n00b_user',
//   first_name: 'N00b',
//   last_name: 'User'
// };

const USER_W_ALL = {
  idp_username: 'user_all',
  first_name: 'TestUser',
  last_name: 'WithAll',
  password_meta: {
    last_login: '2017-12-07T00:07:31+00:00',
    last_changed: '2017-12-07T00:07:31+00:00',
    expires: '2019-12-07T23:59:59+00:00',
    strength: 4
  },
  methods: [
    {
      email: 'personal@example.org'
    },
    {
      email: 'supervisor@example.org'
    }
  ],
  mfa: [
    {
      id: 295,
      type: 'totp',
      created_utc: '2017-12-09T19:23:19+00:00',
      label: 'My moto x4',
      last_used_utc: '2018-09-24T17:23:05+00:00'
    },
    {
      id: 293,
      type: 'backupcode',
      created_utc: '2017-12-08T19:23:19+00:00',
      label: 'My backup codes',
      last_used_utc: null,
      data: {
        count: 10
      }
    },
    {
      id: 2225,
      type: 'u2f',
      created_utc: '2017-12-10T19:23:19+00:00',
      label: 'My yubikey',
      last_used_utc: '2018-03-06T21:35:31+00:00'
    }
  ]
};
