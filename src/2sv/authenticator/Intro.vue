<template>
  <ProfileWizard>
    <BasePage>
      <template #header>
        {{ $t('2sv.authenticator.intro.header') }}
      </template>

      <p>
        {{ $t('2sv.authenticator.intro.info') }}
      </p>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/intro" tabindex="-1" variant="outlined" class="mr-2 mr-sm-4 mb-4 mb-sm-0">
        {{ $t('global.button.back') }}
      </v-btn>
      <v-btn :to="nextUrl" color="primary" tabindex="-1" variant="outlined">
        {{ $t('global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn :to="nextUrl" color="primary" tabindex="-1" variant="outlined" class="mr-2 mr-sm-4">
        {{ $t('global.button.no') }}
      </v-btn>
      <v-btn to="/2sv/authenticator/download-app" color="primary" variant="outlined">
        {{ $t('global.button.yes') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
export default {
  name: 'AuthenticatorIntro',
}
</script>

<script setup>
import ProfileWizard from '@/profile/ProfileWizard.vue'
import { mfa as globalMfa } from '@/global/mfa'
import { computed, reactive } from 'vue'

const mfa = reactive(globalMfa)

const hasKey = (m) => {
  return m?.keys?.data?.length > 0 || m?.u2f?.id
}

const hasBackup = (m) => {
  return m?.backup?.id
}

const nextUrl = computed(() => {
  if (!hasKey(mfa) || mfa.numVerified < 3) {
    return '/2sv/usb-security-key/intro'
  }
  if (!hasBackup(mfa)) {
    return '/2sv/printable-backup-codes/intro'
  }
  return '/profile/complete'
})
</script>
