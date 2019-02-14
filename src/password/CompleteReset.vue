<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template slot="header">
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
    ProfileWizard
  },
  mounted() {
    this.$refs.wizard.complete()
    
    token.reset()
  }
}
</script>

