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

export default {
  components: {
    ProfileWizard,
  },
  async created() {
    await this.$nextTick() // best option I could figure out to ensure this.$refs.wizard was available
    this.$refs.wizard.completed()
  },
}
</script>
