<template>
  <ProfileWizard>
    <BasePage>
      <template v-slot:header>
        {{ $vuetify.t('$vuetify.2sv.smartphone.scanQr.header') }}
      </template>

      <p>
        {{ $vuetify.t('$vuetify.2sv.smartphone.scanQr.info') }}
      </p>

      <ol>
        <li>
          <p class="pl-4">
            {{ $vuetify.t('$vuetify.2sv.smartphone.scanQr.add') }}
          </p>
        </li>
        <li>
          <p class="layout column pl-4">
            {{ $vuetify.t('$vuetify.2sv.smartphone.scanQr.qr') }}
            
            <v-layout row justify-center>
              <v-img v-if="newTotp.data" :src="newTotp.data.imageUrl" max-width="200" />
            </v-layout>
          </p>        
        </li>
      </ol>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/smartphone/download-app" flat tabindex="-1" outline> 
        {{ $vuetify.t('$vuetify.global.button.back') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn :to="`/2sv/smartphone/verify-qr-code?id=${newTotp.id}`" :disabled="! newTotp.id" color="primary" flat outline> 
        {{ $vuetify.t('$vuetify.2sv.smartphone.scanQr.button.ok') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard'
import { add } from '@/global/mfa';

export default {
  components: {
    ProfileWizard,
  },
  data: () => ({
    newTotp: {},
  }),
  async created() {
    this.newTotp = await add('totp')
  },
}
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
  display: inline-flex; /* aligns li's content and counter */
}
/* li > p img { */
  /* keep images from stretching because of flex */
  /* align-self: center; */
/* } */
</style>
