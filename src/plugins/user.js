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
    let loginUrl = `${
      api.defaults.baseURL
    }/auth/login?client_id=${token.key()}`;

    if (returnTo) {
      loginUrl += `&ReturnTo=${returnTo}`;
    }

    window.location = loginUrl;
  },
  new() {
    return !this.password_meta;
  }
};

Vue.use(theVue => {
  theVue.prototype.$user = user;
});

export default user; // provided as an export in case other plugins need the user, e.g., ./api.js

// TODO: temp stubs, remove once real calls are integrated

// eslint-disable-next-line
const USER_NEW = {
  idp_username: 'n00b_user',
  first_name: 'N00b',
  last_name: 'User'
};

// eslint-disable-next-line
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

// eslint-disable-next-line
const USER_WO_RECOVERY = {
  idp_username: 'user_norecover',
  first_name: 'TestUser',
  last_name: 'NoRecovery',
  password_meta: {
    last_login: '2017-12-07T00:07:31+00:00',
    last_changed: '2017-12-07T00:07:31+00:00',
    expires: '2019-12-07T23:59:59+00:00',
    strength: 4
  },
  methods: [],
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

// eslint-disable-next-line
const USER_WO_TOTP = {
  idp_username: 'user_nototp',
  first_name: 'TestUser',
  last_name: 'NoTotp',
  password_meta: {
    last_login: '2017-12-07T00:07:31+00:00',
    last_changed: '2017-12-07T00:07:31+00:00',
    expires: '2019-12-07T23:59:59+00:00',
    strength: 4
  },
  methods: [
    {
      email: 'personal@example.org'
    }
  ],
  mfa: [
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

// eslint-disable-next-line
const USER_WO_U2F = {
  idp_username: 'user_nou2f',
  first_name: 'TestUser',
  last_name: 'NoU2f',
  password_meta: {
    last_login: '2017-12-07T00:07:31+00:00',
    last_changed: '2017-12-07T00:07:31+00:00',
    expires: '2019-12-07T23:59:59+00:00',
    strength: 4
  },
  methods: [
    {
      email: 'personal@example.org'
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
    }
  ]
};

// eslint-disable-next-line
const USER_WO_CODES = {
  idp_username: 'user_nocodes',
  first_name: 'TestUser',
  last_name: 'NoCodes',
  password_meta: {
    last_login: '2017-12-07T00:07:31+00:00',
    last_changed: '2017-12-07T00:07:31+00:00',
    expires: '2019-12-07T23:59:59+00:00',
    strength: 4
  },
  methods: [
    {
      email: 'personal@example.org'
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
      id: 2225,
      type: 'u2f',
      created_utc: '2017-12-10T19:23:19+00:00',
      label: 'My yubikey',
      last_used_utc: '2018-03-06T21:35:31+00:00'
    }
  ]
};

// eslint-disable-next-line
const USER_W_NOTHING = {
  idp_username: 'user_nothing',
  first_name: 'TestUser',
  last_name: 'Nothing',
  password_meta: {
    last_login: '2017-12-07T00:07:31+00:00',
    last_changed: '2017-12-07T00:07:31+00:00',
    expires: '2019-12-07T23:59:59+00:00',
    strength: 4
  },
  methods: [],
  mfa: []
};
