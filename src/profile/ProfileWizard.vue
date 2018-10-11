<template>
  <v-stepper v-model="currentStep.id">
    <v-stepper-header>
      <template v-for="_step in steps">
        <v-stepper-step :step="_step.id" 
                        :complete="_step.state != ''"
                        :complete-icon="toIcon(_step.state)" 
                        :color="toColor(_step.state)" 
                        :key="`step-${_step.id}`">
          {{ _step.name }}
        </v-stepper-step>

        <v-divider v-if="moreSteps(_step)" :key="`divider-${_step.id}`" />
      </template>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content :step="currentStep.id">
        <slot />

        <ButtonBar>
          <slot name="actions" />
        </ButtonBar>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import Steps from './Steps';

export default {
  components: {
    Steps
  },
  computed: {
    steps: () => Steps.steps,
    currentStep: vm => Steps.findByPath(vm.$route.path)
  },
  methods: {
    moreSteps: step => !Steps.isLast(step),
    toColor: state => {
      const map = {
        complete: 'success',
        skipped: 'warning'
      };

      return map[state] || 'primary';
    },
    toIcon: state => {
      const map = {
        skipped: '$vuetify.icons.warning'
      };

      return map[state] || '$vuetify.icons.complete';
    }
  }
};
</script>
