<template>
  <ProfileWizard>
    <BasePage>
      <template v-slot:header>
        {{ $vuetify.t('$vuetify.2sv.smartphone.download.header') }}
      </template>

      <p>
        {{ $vuetify.t(`$vuetify.2sv.smartphone.download.recommendation-${preferredAppName}`) }}
      </p>

      <figure class="layout row align-center justify-center pb-4 my-4">
        <img v-if="isAuthy" src="@/assets/authy-logo.jpg">
        <img v-else src="@/assets/authenticator-logo.jpg">

        <figcaption class="headline ml-3">
          {{ $vuetify.t(`$vuetify.2sv.smartphone.download.appname-${preferredAppName}`) }}
        </figcaption>
      </figure>

      <figure class="badges layout row align-center justify-center">
        <a :href="`https://play.google.com/store/apps/details?id=${playStoreId}`" target="_blank" class="pr-3">
          <img src="@/assets/google-play-badge.png">
        </a>
        <a :href="`https://itunes.apple.com/us/app/${itunesAppUrl}`" target="_blank">
          <img src="@/assets/app-store-badge.png">
        </a>
      </figure>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/smartphone/intro" flat tabindex="-1" outline> 
        {{ $vuetify.t('$vuetify.global.button.back') }}
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
    ProfileWizard,
  },
  computed: {
    isAuthy: () => `${process.env.VUE_APP_TOTP_APP_RECOMMENDATION}` === 'authy',
    preferredAppName: vm => vm.isAuthy ? 'authy' : 'authenticator',
    playStoreId: vm => vm.isAuthy ? 'com.authy.authy' : 'com.google.android.apps.authenticator2',
    itunesAppUrl: vm => vm.isAuthy ? 'authy/id494168017' : 'google-authenticator/id388497605',
  },
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
