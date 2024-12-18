<template>
  <ProfileWizard>
    <BasePage>
      <template v-slot:header>
        {{ $t('2sv.key.intro.header') }}
      </template>

      <p>
        {{ $t('2sv.key.intro.info') }}
      </p>

      <figure class="pa-4">
        <v-img :src="securityKeys" contain alt="Three sizes of USB keys." />
      </figure>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/printable-backup-codes/intro" color="primary" tabindex="-1" outlined class="mr-4 mb-4 mb-sm-0">
        {{ $t('global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        href="https://idphelp.sil.org/2sv-issues/security-key"
        target="_blank"
        color="primary"
        tabindex="-1"
        outlined
        class="mr-4 mb-4 mb-sm-0"
      >
        {{ $t('2sv.key.intro.button.no') }}
      </v-btn>
      <v-btn to="/2sv/usb-security-key/insert" color="primary" outlined>
        {{ $t('global.button.yes') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard.vue'
import securityKeys from '@/assets/usb-security-key-examples.png'

export default {
  components: {
    ProfileWizard,
  },
  data: () => ({
    securityKeys,
  }),
}
</script>
