<template>
  <ProfileWizard ref="wizard">
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

      <v-btn @click="next" color="primary" flat outline>
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
  methods: {
    next() {
      if (this.$user.auth_type == 'reset') {
        this.$router.push('/password/reset/complete')
      } else {
        this.$refs.wizard.completeAndContinue()
      }
    }
  },
}
</script>
