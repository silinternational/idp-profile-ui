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

      <!-- TODO: Add translations for this label -->
      <label v-if="showModal">
        {{ $vuetify.lang.t('$vuetify.2sv.key.insert.label') }}
        <v-text-field v-model="input" required outlined autofocus/>
      </label>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/usb-security-key/intro" tabindex="-1" outlined> 
        {{ $vuetify.lang.t('$vuetify.global.button.back') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn v-if="isSupported && showModal" @click="onContinue" color="primary" outlined>
        {{ $vuetify.lang.t('$vuetify.global.button.continue') }}
      </v-btn>

      <v-btn v-else-if="isSupported  && !showModal" @click="onOk" color="primary" outlined>
        {{ $vuetify.lang.t('$vuetify.2sv.key.insert.button.ok') }}
      </v-btn>
      <v-btn v-else to="/2sv/printable-backup-codes/intro" color="primary" outlined> 	
        {{ $vuetify.lang.t('$vuetify.global.button.skip') }}	
      </v-btn>
    </ButtonBar>

    <v-snackbar
      v-model="snackbarIsOpen"
    >
      {{ $vuetify.lang.t('$vuetify.2sv.key.insert.label') }}
    </v-snackbar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard'
import { browserSupportsWebauthn } from '@simplewebauthn/browser';
import { newKeyName } from '@/global/mfa'

export default {
  components: {
    ProfileWizard,
  },
  data: () => ({	
    isSupported: browserSupportsWebauthn(),
    showModal: false,
    input: '',
    newKeyName,
    snackbarIsOpen: false,
  }),
  methods: {
    onOk: function() {
      this.showModal = true
    },
    onContinue: function() {
      if(!this.input.trim()) {
        this.snackbarIsOpen = true
        return
      }
      this.newKeyName.set(this.input)
      this.$router.push("/2sv/usb-security-key/touch")
    },
  },
}
</script>