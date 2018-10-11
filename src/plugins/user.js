import Vue from 'vue';
import api from './api';

let user = {
  update: async function update() {
    Object.assign(this, await api.fake('GET /user/me', NEW_USER));
  },
  isNew: function() {
    return !this.password_meta;
  }
};

Vue.use(theVue => {
  theVue.prototype.$user = user;
});

// TODO: temp stubs, remove once real calls are integrated
const NEW_USER = {
  idp_username: 'new_user',
  first_name: 'New',
  last_name: 'User'
};

// const USER_W_PW = {
//   idp_username: 'user_pw',
//   first_name: 'User(pw)',
//   last_name: 'Password',
//   password_meta: {
//     last_changed: "2017-12-07T00:07:31+00:00",
//     expires: "2019-12-07T23:59:59+00:00"
//   }
// };

// const USER_W_RECOVERY = {
//   idp_username: 'user_recovery',
//   first_name: 'User(recovery)',
//   last_name: 'Recovery',
//   password_meta: {
//     last_changed: '2017-12-07T00:07:31+00:00',
//     expires: '2019-12-07T23:59:59+00:00'
//   },
//   methods: [
//     {
//       email: 'personal@example.org'
//     },
//     {
//       email: 'supervisor@example.org'
//     },
//     {
//       email: 'spouse@example.org'
//     }
//   ]
// };

// const USER_W_2SV = {
//   idp_username: 'user_2sv',
//   first_name: 'User(2sv)',
//   last_name: '2SV',
//   password_meta: {
//     last_changed: '2017-12-07T00:07:31+00:00',
//     expires: '2019-12-07T23:59:59+00:00'
//   },
//   methods: [
//     {
//       email: 'personal@example.org'
//     },
//     {
//       email: 'supervisor@example.org'
//     },
//     {
//       email: 'spouse@example.org'
//     }
//   ],
//   mfa: [
//     {
//       id: 293,
//       type: 'backupcode',
//       created_utc: '2017-12-08T19:23:19+00:00',
//       label: '2SV #1',
//       last_used_utc: null
//     },
//     {
//       id: 295,
//       type: 'totp',
//       created_utc: '2017-12-08T19:23:19+00:00',
//       label: '2SV #2',
//       last_used_utc: '2018-09-24T17:23:05+00:00'
//     },
//     {
//       id: 2225,
//       type: 'u2f',
//       created_utc: '2017-12-08T19:23:19+00:00',
//       label: '2SV #3',
//       last_used_utc: '2018-03-06T21:35:31+00:00'
//     }
//   ]
// };
