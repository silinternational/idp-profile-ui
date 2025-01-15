<template>
  <ProfileWizard>
    <BasePage>
      <template #header>
        {{ $t('2sv.smartphone.scanQr.header') }}
      </template>

      <p class="mx-auto">
        {{ $t('2sv.smartphone.scanQr.info') }}
      </p>

      <ol>
        <li>
          <p class="pl-4">
            {{ $t('2sv.smartphone.scanQr.add') }}
          </p>
        </li>
        <li>
          <p class="d-flex flex-column pl-4">
            {{ $t('2sv.smartphone.scanQr.qr') }}
          </p>

          <v-row v-if="newTotp.data" justify="center">
            <v-col cols="auto">
              <v-img :src="newTotp.data.imageUrl" alt="qr code" width="200" />
            </v-col>
          </v-row>
          <v-row v-if="newTotp.data" justify="center">
            <v-col cols="auto">
              {{ $t('2sv.smartphone.scanQr.manual') }}
              <span class="font-mono">{{ newTotp.data.totpKey }}</span>
            </v-col>
          </v-row>
        </li>
      </ol>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/smartphone/download-app" tabindex="-1" variant="outlined" class="mb-4 mb-sm-0">
        {{ $t('global.button.back') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :to="`/2sv/smartphone/verify-qr-code?id=${newTotp.id}`"
        :disabled="!newTotp.id"
        color="primary"
        variant="outlined"
      >
        {{ $t('2sv.smartphone.scanQr.button.ok') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard.vue'
import { add } from '@/global/mfa'

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

.font-mono {
  font-family: monospace;
}
</style>
