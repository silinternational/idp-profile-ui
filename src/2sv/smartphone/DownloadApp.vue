<template>
  <ProfileWizard>
    <BasePage>
      <template v-slot:header>
        {{ $vuetify.lang.t('$vuetify.2sv.smartphone.download.header') }}
      </template>

      <p>
        {{ $vuetify.lang.t(`$vuetify.2sv.smartphone.download.recommendation-${preferredAppName}`) }}
      </p>

      <figure class="d-flex align-center justify-center pb-4 my-4">
        <img v-if="isAuthy" :src="authy" />
        <img v-else :src="authenticator" />

        <figcaption class="headline ml-4">
          {{ $vuetify.lang.t(`$vuetify.2sv.smartphone.download.appname-${preferredAppName}`) }}
        </figcaption>
      </figure>

      <figure class="badges d-flex align-center justify-center">
        <a :href="playStoreUrl" target="_blank" class="pr-4">
          <img :src="playBadge" />
        </a>
        <a :href="itunesAppUrl" target="_blank">
          <img :src="appStoreBadge" />
        </a>
      </figure>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/smartphone/intro" tabindex="-1" outlined class="mb-4 mb-sm-0">
        {{ $vuetify.lang.t('$vuetify.global.button.back') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn to="/2sv/smartphone/scan-qr" color="primary" outlined>
        {{ $vuetify.lang.t('$vuetify.2sv.smartphone.download.button.ok') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard.vue'
import authy from '@/assets/authy-logo.jpg'
import authenticator from '@/assets/authenticator-logo.jpg'
import playBadge from '@/assets/google-play-badge.png'
import appStoreBadge from '@/assets/app-store-badge.png'

export default {
  components: {
    ProfileWizard,
  },
  data: () => ({
    authy,
    authenticator,
    playBadge,
    appStoreBadge,
  }),
  computed: {
    isAuthy: () => import.meta.env.VITE_TOTP_APP_RECOMMENDATION === 'authy',
    preferredAppName: (vm) => (vm.isAuthy ? 'authy' : 'authenticator'),
    playStoreId: (vm) => (vm.isAuthy ? 'com.authy.authy' : 'com.google.android.apps.authenticator2'),
    playStoreUrl: (vm) => `https://play.google.com/store/apps/details?id=${vm.playStoreId}`,
    itunesAppId: (vm) => (vm.isAuthy ? 'authy/id494168017' : 'google-authenticator/id388497605'),
    itunesAppUrl: (vm) => `https://itunes.apple.com/us/app/${vm.itunesAppId}`,
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
