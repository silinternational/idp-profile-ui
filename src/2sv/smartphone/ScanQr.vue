<template>
  <ProfileWizard>
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.2sv.smartphone.scanQr.header') }}
      </template>

      <p>
        {{ $vuetify.t('$vuetify.2sv.smartphone.scanQr.info') }}
      </p>

      <ol class="pt-4">
        <li>
          <p class="layout column pl-4">
            {{ $vuetify.t('$vuetify.2sv.smartphone.scanQr.add') }}
            <!-- TODO: consider animation here and don't forget, if the user just downloaded the app, it will start with a "BEGIN SETUP" screen -->
            <img src="@/assets/google-authenticator-scan-screenshot.png" class="pa-4">
          </p>
        </li>
        <li>
          <p class="layout column pl-4">
            {{ $vuetify.t('$vuetify.2sv.smartphone.scanQr.qr') }}
            
            <v-layout row justify-center>
              <v-img v-if="mfa.data" :src="mfa.data.imageUrl" max-width="200" />
            </v-layout>
          </p>        
        </li>
      </ol>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/smartphone/download-app" flat tabindex="-1"> 
        {{ $vuetify.t('$vuetify.global.button.back') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn :to="`/2sv/smartphone/verify-qr-code?id=${mfa.id}`" :disabled="! mfa.id" color="primary" flat> 
        {{ $vuetify.t('$vuetify.2sv.smartphone.scanQr.button.ok') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard';

export default {
  components: {
    ProfileWizard
  },
  data: () => ({
    mfa: {}
  }),
  async created() {
    this.mfa = await this.$API.post('mfa', { type: 'totp' });
  }
};
</script>

<style scoped>
ol {
  list-style-type: none;
  counter-reset: elementcounter;
}
li:before {
  content: 'Step ' counter(elementcounter);
  counter-increment: elementcounter;
  font-weight: bold;
}
li > p {
  display: inline-flex; /* aligns counter with top of li's content */
}
li > p img {
  /* keep images from stretching because of flex */
  align-self: center;
}
</style>
