<template>
  <ProfileWizard>
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.2sv.key.insert.header') }}
      </template>

      <figure class="layout column align-center pa-4">
        <img src="@/assets/insert-usb-security-key.png">
      </figure>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/usb-security-key/intro" flat tabindex="-1"> 
        {{ $vuetify.t('$vuetify.global.button.back') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn to="/2sv/usb-security-key/touch" color="primary" flat tabindex="-1"> 
        {{ $vuetify.t('$vuetify.2sv.key.insert.button.ok') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard'

export default {
  components: {
    ProfileWizard
  }
}
</script>