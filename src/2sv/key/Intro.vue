<template>
  <ProfileWizard>
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.2sv.key.intro.header') }}
      </template>

      <p>
        {{ $vuetify.t('$vuetify.2sv.key.intro.info') }}
      </p>

      <figure class="layout column align-center pa-4">
        <img src="@/assets/usb-security-key-examples.png">
      </figure>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/printable-backup-codes/intro" color="primary" flat tabindex="-1" outline> 
        {{ $vuetify.t('$vuetify.global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn href="https://idphelp.sil.org/2sv-topics/security-key" target="_blank" color="primary" flat tabindex="-1" outline> 
        {{ $vuetify.t('$vuetify.2sv.key.intro.button.no') }}
      </v-btn>
      <v-btn to="/2sv/usb-security-key/insert" color="primary" flat outline> 
        {{ $vuetify.t('$vuetify.global.button.yes') }}
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