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

      <v-btn :to="nextStep" color="primary" flat>
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
  },
  computed: {
    nextStep: vm => vm.$user.auth_type == 'reset' ? '/password/reset/complete' : '/password/recovery'
  },
}
</script>
