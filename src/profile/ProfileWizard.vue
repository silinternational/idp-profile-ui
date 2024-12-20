<template>
  <v-stepper v-if="currentStep.id" v-model="currentStep.id">
    <v-stepper-header>
      <template v-for="_step in steps" :key="`step-${_step.id}`">
        <v-stepper-item :value="_step.id" :complete="_step.state !== ''" :title="$t(`${_step.nameKey}`)">
          <template #icon>
            <v-icon :icon="toIcon(_step.state)" :color="toColor(_step.state)"></v-icon>
          </template>
        </v-stepper-item>

        <v-divider v-if="hasMoreSteps(_step)" :key="`divider-${_step.id}`" />
      </template>
    </v-stepper-header>

    <v-stepper-window :value="currentStep.id">
      <v-stepper-window-item :value="currentStep.id" class="px-2 px-sm-6">
        <slot />

        <ButtonBar>
          <slot name="actions" />
        </ButtonBar>
      </v-stepper-window-item>
    </v-stepper-window>
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
    hasMoreSteps: (step) => !Steps.isLast(step),
    toColor: (state) => {
      const map = {
        complete: 'success',
        skipped: 'warning',
      }

      return map[state] || 'primary'
    },
    toIcon: (state) => {
      const map = {
        complete: '$complete',
        skipped: '$warning',
      }
      return map[state] || '$complete'
    },
    completed: function () {
      this.currentStep.state = 'complete'
    },
    next: function () {
      this.$router.push(Steps.next(this.currentStep).paths[0]) // this assumes the first path in step's config is the right one.
    },
    skipped: function () {
      this.currentStep.state = 'skipped'
    },
    allDone() {
      Steps.clear()
    },
  },
}
</script>
