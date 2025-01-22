<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template #header>
        {{ $t('password.reset.complete.header') }}
      </template>

      <p>{{ $t('password.reset.complete.congrats') }}</p>
    </BasePage>

    <ButtonBar>
      <v-spacer></v-spacer>

      <v-btn to="/profile" color="primary" variant="outlined">
        {{ $t('password.reset.complete.button.next') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard.vue'
import steps from '../profile/steps'

export default {
  components: {
    ProfileWizard,
  },
  async created() {
    const step = steps.forPath(this.$route.path)
    step.state = 'complete'
  },
}
</script>
