<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.profile.complete.header', $root.idpConfig.idpName) }}
      </template>

      <p>
        {{ $vuetify.t('$vuetify.profile.complete.congrats', $root.idpConfig.idpName, $user.first_name) }}
      </p>
    </BasePage>

    <ButtonBar>
      <v-spacer></v-spacer>
      
      <v-btn to="/profile" color="primary" flat>
        {{ $vuetify.t('$vuetify.profile.complete.button.newProfile') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard'

export default {
  components: {
    ProfileWizard
  },
  mounted() {
    this.$refs.wizard.complete()
  }
}
</script>

