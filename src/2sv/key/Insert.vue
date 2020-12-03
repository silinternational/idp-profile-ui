<template>
  <ProfileWizard>
    <BasePage>
      <template v-slot:header>
        {{ $vuetify.lang.t('$vuetify.2sv.key.insert.header') }}
      </template>

      <figure class="pa-4">
        <v-img contain src="@/assets/insert-usb-security-key.png" alt="A usb key inserted into a usb port."></v-img>
      </figure>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/usb-security-key/intro" tabindex="-1" outlined> 
        {{ $vuetify.lang.t('$vuetify.global.button.back') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn to="/2sv/usb-security-key/touch" color="primary" outlined> 
        {{ $vuetify.lang.t('$vuetify.2sv.key.insert.button.ok') }}
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