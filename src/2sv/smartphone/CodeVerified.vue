<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template #header>
        {{ $t('2sv.smartphone.codeVerified.header') }}
      </template>

      <p class="text-center">
        {{ $t('2sv.smartphone.codeVerified.info') }}
      </p>
    </BasePage>

    <ButtonBar>
      <v-spacer></v-spacer>

      <v-btn to="/2sv/usb-security-key/intro" color="primary" variant="outlined">
        {{ $t('global.button.continue') }}
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
