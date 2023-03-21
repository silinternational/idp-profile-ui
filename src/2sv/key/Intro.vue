<template>
  <ProfileWizard>
    <BasePage>
      <template v-slot:header>
        {{ $vuetify.lang.t('$vuetify.2sv.key.intro.header') }}
      </template>

      <p>
        {{ $vuetify.lang.t('$vuetify.2sv.key.intro.info') }}
      </p>

      <figure class="pa-4">
        <v-img src="@/assets/usb-security-key-examples.png" contain alt="Three sizes of USB keys."/>
      </figure>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/printable-backup-codes/intro" color="primary" tabindex="-1" outlined class="mr-4 mb-4 mb-sm-0"> 
        {{ $vuetify.lang.t('$vuetify.global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn href="https://idphelp.sil.org/2sv-issues/security-key" target="_blank" color="primary" tabindex="-1" outlined class="mr-4 mb-4 mb-sm-0"> 
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