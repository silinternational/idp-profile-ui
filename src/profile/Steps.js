import Vue from 'vue';

export default new Vue({
  data: vm => ({
    steps: [
      {
        id: 1,
        name: vm.$vuetify.t('$vuetify.profile.progress.pwStep'),
        paths: ['/password/create', '/password/confirm', '/password/saved'],
        state: 'complete'
      },
      {
        id: 2,
        name: vm.$vuetify.t('$vuetify.profile.progress.pwRecoverStep'),
        paths: ['/password/recovery'],
        state: 'skipped'
      },
      {
        id: 3,
        name: vm.$vuetify.t('$vuetify.profile.progress.2svStep'),
        paths: [
          '/2sv/intro',
          '/2sv/smartphone',
          '/2sv/usb-security-key',
          '/2sv/printable-backup-codes'
        ],
        state: ''
      },
      {
        id: 4,
        name: vm.$vuetify.t('$vuetify.profile.progress.completeStep'),
        paths: ['/profile/complete'],
        state: ''
      }
    ]
  }),
  methods: {
    findByPath(path) {
      return this.steps.find(step => step.paths.includes(path));
    },
    isLast(step) {
      return this.steps[this.steps.length - 1].id === step.id;
    }
  }
});
