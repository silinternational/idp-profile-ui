<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.profile.complete.header') }}
      </template>

      <p class="layout row">
        <v-icon color="success" class="mr-3">done</v-icon> 
        {{ $vuetify.t('$vuetify.profile.complete.info', $user.first_name, $root.idpConfig.idpName) }}
      </p>

      <p v-if="unverifiedEmails.length" class="layout row">
        <v-icon color="warning" class="mr-3">email</v-icon> 
        <span>
          {{ $vuetify.t('$vuetify.profile.complete.unverifiedEmails') }}
          <span class="font-weight-bold">({{ unverifiedEmails | joined }})</span>
        </span>
      </p>
    </BasePage>

    <ButtonBar>
      <v-spacer></v-spacer>
      
      <v-btn to="/profile" color="primary" flat outline>
        {{ $vuetify.t('$vuetify.profile.complete.button.profile') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard'
import recoveryMethods from '@/global/recoveryMethods';

export default {
  components: {
    ProfileWizard
  },
  filters: {
    joined: emails => emails.map(email => email.value).join(', ')
  },
  data: () => ({
    alternates: recoveryMethods.alternates,
  }),
  computed: {
    unverifiedEmails: vm => vm.alternates.filter(m => ! m.verified),
  },
  mounted() {
    this.$refs.wizard.complete()
  }
}
</script>

