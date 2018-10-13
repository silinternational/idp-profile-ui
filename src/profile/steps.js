import Vue from 'vue';

const store = {
  steps: []
};

export default {
  steps: store.steps,
  init(user) {
    if (store.steps.length == 0) {
      if (user.new) {
        store.steps.push(password, recovery, twosv, complete);
      }

      for (let i = 0; i < store.steps.length; i++) {
        Object.assign(store.steps[i], { id: i + 1, state: '' });
      }
    }
  },
  forPath(path) {
    return this.steps.find(step => step.paths.includes(path));
  },
  isLast(step) {
    return this.steps[this.steps.length - 1].id === step.id;
  }
};

const t = Vue.prototype.$vuetify.t;

const password = {
  name: t('$vuetify.profile.progress.pwStep'),
  paths: ['/password/create', '/password/confirm', '/password/saved']
};

const recovery = {
  name: t('$vuetify.profile.progress.pwRecoverStep'),
  paths: ['/password/recovery']
};

const twosv = {
  name: t('$vuetify.profile.progress.2svStep'),
  paths: [
    '/2sv/intro',
    '/2sv/smartphone',
    '/2sv/usb-security-key',
    '/2sv/printable-backup-codes'
  ]
};

const complete = {
  name: t('$vuetify.profile.progress.completeStep'),
  paths: ['/profile/complete']
};
