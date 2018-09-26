<template>
  <v-stepper>
    <v-stepper-header>
      <template v-for="_step in steps">
        <v-stepper-step :step="_step.id" :key="`step-${_step.id}`">{{ _step.name }}</v-stepper-step>
        <v-divider v-if="! isLastStep(_step, steps)" :key="_step.id" /> <!-- not needed on the last one -->
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
  data: () => ({
    steps: [
      {
        id: 1,
        name: 'Password',
        paths: ['/password/create', '/password/confirm', '/password/saved']
      },
      {
        id: 2,
        name: 'Password recovery',
        path: '/password/recovery'
      },
      {
        id: 3,
        name: '2-step verification',
        paths: [
          '/2sv/intro',
          '/2sv/smartphone',
          '/2sv/usb-security-key',
          '/2sv/printable-backup-codes'
        ]
      },
      {
        id: 4,
        name: 'Complete',
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
