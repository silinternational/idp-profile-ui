<template>
  <v-stepper v-if="currentStep.id" v-model="currentStep.id">
    <v-stepper-header>
      <template v-for="_step in steps">
        <v-stepper-step :step="_step.id" 
                        :complete="_step.state != ''"
                        :complete-icon="toIcon(_step.state)" 
                        :color="toColor(_step.state)" 
                        :key="`step-${_step.id}`">
          {{ _step.name }}
        </v-stepper-step>

        <v-divider v-if="hasMoreSteps(_step)" :key="`divider-${_step.id}`" />
      </template>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content :step="currentStep.id">
        <slot />

        <ButtonBar >
          <slot name="actions" />
        </ButtonBar>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import Steps from './steps'

export default {
  data: () => ({
    steps: Steps.steps,
    currentStep: {},
  }),
  async created() {
    await Steps.init()

    this.currentStep = Steps.forPath(this.$route.path)
  },
  methods: {
    hasMoreSteps: step => !Steps.isLast(step),
    toColor: state => {
      const map = {
        complete: 'success',
        skipped: 'warning'
      }

      return map[state] || 'primary'
    },
    toIcon: state => {
      const map = {
        skipped: '$vuetify.icons.warning'
      }

      return map[state] || '$vuetify.icons.complete'
    },
    complete: function() {
      this.currentStep.state = 'complete'
    },
    completeAndContinue: function() {
      this.complete()
      
      this.$router.push(Steps.next(this.currentStep).paths[0])
    },
    skipped: function() {
      this.currentStep.state = 'skipped'
    }
  }
}
</script>
