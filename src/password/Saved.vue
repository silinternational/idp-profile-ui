<template>
  <ProfileWizard>
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.password.saved.header') }}
      </template>

      <p class="text-xs-center">
        {{ $vuetify.t('$vuetify.password.saved.info') }}
      </p>
    </BasePage>

    <ButtonBar>
      <v-spacer></v-spacer>

      <v-btn to="/password/recovery" color="primary" flat>
        {{ $vuetify.t('$vuetify.global.button.continue') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard'

export default {
  components: {
    ProfileWizard
  }
}
</script>
