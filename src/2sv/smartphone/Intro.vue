<template>
  <ProfileWizard>
    <v-alert :value="totp.id" type="warning">
      <span class="layout row align-center justify-center">
        {{ $vuetify.t('$vuetify.2sv.smartphone.warning', totp.label) }}
      </span>
    </v-alert>

    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.2sv.smartphone.intro.header') }}
      </template>

      <p>
        {{ $vuetify.t('$vuetify.2sv.smartphone.intro.info') }}
      </p>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/intro" flat tabindex="-1" outline> 
        {{ $vuetify.t('$vuetify.global.button.back') }}
      </v-btn>
      <v-btn to="/2sv/usb-security-key/intro" color="primary" flat tabindex="-1" outline> 
        {{ $vuetify.t('$vuetify.global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn to="/2sv/usb-security-key/intro" color="primary" flat tabindex="-1" outline> 
        {{ $vuetify.t('$vuetify.global.button.no') }}
      </v-btn>
      <v-btn to="/2sv/smartphone/download-app" color="primary" flat outline> 
        {{ $vuetify.t('$vuetify.global.button.yes') }}
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
    totp: vm => vm.$user.mfas.find(mfa => mfa.type == 'totp') || {}
  }
}
</script>