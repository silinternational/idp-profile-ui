import Vue from 'vue'
import { recoveryMethods, retrieve as retrieveMethods } from '@/global/recoveryMethods'
import { mfa, retrieve as retrieveMfa } from '@/global/mfa'

const store = {
  steps: [],
}

export default {
  steps: store.steps,
  async init() {
    if (Vue.prototype.$user.auth_type === 'login') {
      await Promise.all([retrieveMethods(), retrieveMfa()])
    }

    // Retain all steps but mark relevant ones
    allSteps.forEach((step, index) => {
      const isRelevant = step.isRelevant(Vue.prototype.$user, recoveryMethods.alternates, mfa)
      const isComplete = step.state === 'complete'
      const isNotDuplicate = !store.steps.some((s) => s.nameKey === step.nameKey)
      if (isNotDuplicate && (isRelevant || !isComplete)) {
        store.steps.push({
          ...step,
          id: index + 1,
          state: '',
        })
      }
    })
  },
  forPath(path) {
    return this.steps.find((step) => step.paths.includes(path))
  },
  isLast(step) {
    return this.steps[this.steps.length - 1].id === step.id
  },
  next(step) {
    // since the id is +1 of the position, we can simply use the id of the passed step to get the next array position
    return this.steps[step.id]
  },
  clear() {
    store.steps.splice(0)
  },
}

const isRequested = (paths) => paths.some((path) => location.hash.includes(path))

const password = {
  nameKey: 'profile.steps.pwStep',
  paths: ['/password/create', '/password/confirm', '/password/saved'],
  isRelevant(user) {
    return isRequested(this.paths) || user.isNew()
  },
}

const recovery = {
  nameKey: 'profile.steps.pwRecoverStep',
  paths: ['/password/recovery'],
  isRelevant(user, recoveryMethods) {
    return user.auth_type === 'login' && (isRequested(this.paths) || recoveryMethods.filter(isAlternate).length < 1)
  },
}
const isAlternate = (method) => method.type === 'email'

const twosv = {
  nameKey: 'profile.steps.2svStep',
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
    '/2sv/printable-backup-codes/new',
  ],
  isRelevant(user, recoveryMethods, mfa) {
    return user.auth_type === 'login' && (isRequested(this.paths) || mfa.numVerified < 3)
  },
}

const complete = {
  nameKey: 'profile.steps.completeStep',
  paths: ['/profile/complete', '/password/reset/complete'],
  isRelevant() {
    return true
  },
}

const allSteps = [password, recovery, twosv, complete]
