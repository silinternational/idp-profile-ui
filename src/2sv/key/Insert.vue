<template>
  <ProfileWizard>
    <BasePage>
      <template v-if="isSupported" v-slot:header>
        {{ $vuetify.lang.t('$vuetify.2sv.key.insert.header') }}
      </template>
      <template v-else v-slot:header>
        {{ $vuetify.lang.t('$vuetify.2sv.key.insert.nosupport.header') }}
      </template>

      <figure v-if="isSupported" class="pa-4">
        <v-img contain src="@/assets/insert-usb-security-key.png" alt="A usb key inserted into a usb port."/>
      </figure>
      <p v-else>{{ $vuetify.lang.t('$vuetify.2sv.key.insert.nosupport.info') }}</p>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/usb-security-key/intro" tabindex="-1" outlined> 
        {{ $vuetify.lang.t('$vuetify.global.button.back') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn v-if="isSupported" to="/2sv/usb-security-key/touch" color="primary" outlined>
        {{ $vuetify.lang.t('$vuetify.2sv.key.insert.button.ok') }}
      </v-btn>
      <v-btn v-else to="/2sv/printable-backup-codes/intro" color="primary" outlined> 	
        {{ $vuetify.lang.t('$vuetify.global.button.skip') }}	
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard'
import { isSupported } from './u2f-api'

export default {
  components: {
    ProfileWizard,
  },
  data: () => ({	
    isSupported: isSupported(),
  }),
}
</script>