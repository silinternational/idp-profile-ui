export default {
  steps: [],
  init(translateFn, user) {
    const password = {
      name: translateFn('$vuetify.profile.progress.pwStep'),
      paths: ['/password/create', '/password/confirm', '/password/saved']
    };

    const recovery = {
      name: translateFn('$vuetify.profile.progress.pwRecoverStep'),
      paths: ['/password/recovery']
    };

    const twosv = {
      name: translateFn('$vuetify.profile.progress.2svStep'),
      paths: [
        '/2sv/intro',
        '/2sv/smartphone',
        '/2sv/usb-security-key',
        '/2sv/printable-backup-codes'
      ]
    };

    const complete = {
      name: translateFn('$vuetify.profile.progress.completeStep'),
      paths: ['/profile/complete']
    };

    const stepsForCurrentUser = [];
    if (user.isNew()) {
      stepsForCurrentUser.push(password, recovery, twosv, complete);
    }

    this.steps = stepsForCurrentUser.map((step, i) =>
      Object.assign({ id: i + 1, state: '' }, step)
    );
  },
  forPath(path) {
    return this.steps.find(step => step.paths.includes(path));
  },
  isLast(step) {
    return this.steps[this.steps.length - 1].id === step.id;
  }
};
