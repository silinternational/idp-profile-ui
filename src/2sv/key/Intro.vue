<template>
  <ProfileWizard>
    <BasePage>
      <template v-slot:header>
        {{ $vuetify.lang.t('$vuetify.2sv.key.intro.header') }}
      </template>

      <p>
        {{ $vuetify.lang.t('$vuetify.2sv.key.intro.info') }}
      </p>

      <figure class="layout column align-center pa-4">
        <img src="@/assets/usb-security-key-examples.png">
      </figure>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/printable-backup-codes/intro" color="primary" text tabindex="-1" outlined> 
        {{ $vuetify.lang.t('$vuetify.global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn href="https://idphelp.sil.org/2sv-topics/security-key" target="_blank" color="primary" text tabindex="-1" outlined> 
        {{ $vuetify.lang.t('$vuetify.2sv.key.intro.button.no') }}
      </v-btn>
      <v-btn to="/2sv/usb-security-key/insert" color="primary" outlined> 
        {{ $vuetify.lang.t('$vuetify.global.button.yes') }}
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
}
</script>