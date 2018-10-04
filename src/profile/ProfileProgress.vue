<template>
  <v-stepper v-model="currentStep.id">
    <v-stepper-header>
      <template v-for="_step in steps">
        <v-stepper-step :step="_step.id" :complete="_step.id < currentStep.id" :key="`step-${_step.id}`">
          {{ _step.name }}
        </v-stepper-step>

        <v-divider v-if="! isLastStep(_step, steps)" :key="`divider-${_step.id}`" />
      </template>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content :step="currentStep.id">
        <slot />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
  data: vm => ({
    steps: [
      {
        id: 1,
        name: vm.$vuetify.t('$vuetify.profile.progress.pwStep'),
        paths: ['/password/create', '/password/confirm', '/password/saved']
      },
      {
        id: 2,
        name: vm.$vuetify.t('$vuetify.profile.progress.pwRecoverStep'),
        paths: ['/password/recovery']
      },
      {
        id: 3,
        name: vm.$vuetify.t('$vuetify.profile.progress.2svStep'),
        paths: [
          '/2sv/intro',
          '/2sv/smartphone',
          '/2sv/usb-security-key',
          '/2sv/printable-backup-codes'
        ]
      },
      {
        id: 4,
        name: vm.$vuetify.t('$vuetify.profile.progress.completeStep'),
        paths: ['/profile/complete']
      }
    ]
  }),
  computed: {
    currentStep: function() {
      return this.steps.find(step =>
        step.paths.find(path => path === this.$route.path)
      );
    }
  },
  methods: {
    isLastStep: (step, steps) => steps[steps.length - 1].id === step.id
  }
};
</script>
