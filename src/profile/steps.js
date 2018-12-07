import Vue from 'vue'

const store = {
  steps: []
}

export default {
  steps: store.steps,
  init(user) {
    if (store.steps.length == 0) {
      store.steps.push(...allSteps.filter(step => step.isRelevant(user)))

      for (let i = 0; i < store.steps.length; i++) {
        Object.assign(store.steps[i], { id: i + 1, state: '' })
      }
    }
  },
  forPath(path) {
    return this.steps.find(step => step.paths.includes(path))
  },
  isLast(step) {
    return this.steps[this.steps.length - 1].id === step.id
  }
}

function isRequested(paths) {
  return paths.includes(location.pathname)
}

const t = Vue.prototype.$vuetify.t

const password = {
  name: t('$vuetify.profile.progress.pwStep'),
  paths: ['/password/create', '/password/confirm', '/password/saved'],
  isRelevant(user) {
    return isRequested(this.paths) || user.isNew()
  }
}

const recovery = {
  name: t('$vuetify.profile.progress.pwRecoverStep'),
  paths: ['/password/recovery'],
  isRelevant(user) {
    return isRequested(this.paths) || user.recoveryMethods.personal.length < 1
  }
}

const twosv = {
  name: t('$vuetify.profile.progress.2svStep'),
  paths: [
    '/2sv/intro',
    '/2sv/smartphone/intro',
    '/2sv/smartphone/download-app',
    '/2sv/smartphone/scan-qr',
    '/2sv/smartphone/verify-qr-code',
    '/2sv/smartphone/code-verified',
    '/2sv/usb-security-key/intro',
    '/2sv/usb-security-key/insert',
    '/2sv/usb-security-key/touch',
    '/2sv/usb-security-key/confirmed',
    '/2sv/printable-backup-codes/intro',
    '/2sv/printable-backup-codes/new'
  ],
  isRelevant(user) {
    return isRequested(this.paths) || user.mfas.length < 3
  }
}

const complete = {
  name: t('$vuetify.profile.progress.completeStep'),
  paths: ['/profile/complete'],
  isRelevant() {
    return true
  }
}

const allSteps = [password, recovery, twosv, complete]
