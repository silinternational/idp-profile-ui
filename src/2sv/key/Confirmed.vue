<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template v-slot:header>
        {{ $t('2sv.key.confirmed.header') }}
      </template>

      <p class="text-xs-center">
        {{ $t('2sv.key.confirmed.info') }}
      </p>
    </BasePage>

    <ButtonBar>
      <v-spacer></v-spacer>

      <v-btn to="/2sv/printable-backup-codes/intro" color="primary" outlined>
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
