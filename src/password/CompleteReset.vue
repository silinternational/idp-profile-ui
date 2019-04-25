<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template v-slot:header>
        {{ $vuetify.t('$vuetify.password.reset.complete.header') }}
      </template>

      <p>{{ $vuetify.t('$vuetify.password.reset.complete.congrats') }}</p>
    </BasePage>

    <ButtonBar>
      <v-spacer></v-spacer>
      
      <v-btn to="/profile" color="primary" flat outline>
        {{ $vuetify.t('$vuetify.password.reset.complete.button.next') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard'
import token from '@/global/token'

export default {
  components: {
    ProfileWizard,
  },
  async created() {
    await this.$nextTick() // best option I could figure out to ensure this.$refs.wizard was available
    this.$refs.wizard.completed()
    
    token.reset()
  },
}
</script>

