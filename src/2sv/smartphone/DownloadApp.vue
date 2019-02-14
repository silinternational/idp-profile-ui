<template>
  <ProfileWizard>
    <v-alert :value="totp.id" type="warning">
      <span class="layout row align-center justify-center">
        {{ $vuetify.t('$vuetify.2sv.smartphone.warning', totp.label) }}
      </span>
    </v-alert>

    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.2sv.smartphone.download.header') }}
      </template>

      <p>
        {{ $vuetify.t('$vuetify.2sv.smartphone.download.info') }}
      </p>

      <figure class="layout row align-center justify-center mb-5">
        <img src="@/assets/google-authenticator-logo.jpg">

        <figcaption class="headline ml-3">
          {{ $vuetify.t('$vuetify.2sv.smartphone.download.recommended') }}
        </figcaption>
      </figure>

      <figure class="badges layout row align-center justify-center justify-space-around">
        <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" target="_blank" >
          <img src="@/assets/google-play-badge.png">
        </a>
        <a href="https://itunes.apple.com/us/app/google-authenticator/id388497605" target="_blank">
          <img src="@/assets/app-store-badge.png">
        </a>
      </figure>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/smartphone/intro" flat tabindex="-1" outline> 
        {{ $vuetify.t('$vuetify.global.button.back') }}
      </v-btn>
      <v-btn v-if="totp.id" to="/2sv/usb-security-key/intro" color="primary" flat tabindex="-1" outline> 
        {{ $vuetify.t('$vuetify.global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn to="/2sv/smartphone/scan-qr" color="primary" flat outline> 
        {{ $vuetify.t('$vuetify.2sv.smartphone.download.button.ok') }}
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

<style scoped>
img {
  max-height: 7em;
}

/* wanted both to look the same  */
figure.badges > a > img {
  max-height: 40px;
}
</style>
