<template>
  <ProfileWizard>
    <BasePage>
      <template v-slot:header>
        {{ $vuetify.lang.t('$vuetify.2sv.smartphone.intro.header') }}
      </template>

      <p>
        {{ $vuetify.lang.t('$vuetify.2sv.smartphone.intro.info') }}
      </p>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/intro" tabindex="-1" outlined class="mr-2 mr-sm-4 mb-4 mb-sm-0">
        {{ $vuetify.lang.t('$vuetify.global.button.back') }}
      </v-btn>
      <v-btn :to="nextUrl" color="primary" tabindex="-1" outlined>
        {{ $vuetify.lang.t('$vuetify.global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn :to="nextUrl" color="primary" tabindex="-1" outlined class="mr-2 mr-sm-4">
        {{ $vuetify.lang.t('$vuetify.global.button.no') }}
      </v-btn>
      <v-btn to="/2sv/smartphone/download-app" color="primary" outlined>
        {{ $vuetify.lang.t('$vuetify.global.button.yes') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

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
  if (!hasKey(mfa)) {
    return '/2sv/key/intro'
  }
  if (!hasBackup(mfa)) {
    return '/2sv/printable-backup-codes/intro'
  }
  return '/profile/complete'
})
</script>
