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
      <label v-if="showLabelInput">
        {{ $vuetify.lang.t('$vuetify.2sv.key.insert.label') }}
        <v-text-field v-model="input" @keyup="onKeyup" required outlined autofocus/>
      </label>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/usb-security-key/intro" tabindex="-1" outlined> 
        {{ $vuetify.lang.t('$vuetify.global.button.back') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn v-if="isSupported && showLabelInput" @click="onContinue" color="primary" outlined>
        {{ $vuetify.lang.t('$vuetify.global.button.continue') }}
      </v-btn>

      <v-btn v-else-if="isSupported  && !showLabelInput" @click="onOk" color="primary" outlined>
        {{ $vuetify.lang.t('$vuetify.2sv.key.insert.button.ok') }}
      </v-btn>
      <v-btn v-else to="/2sv/printable-backup-codes/intro" color="primary" outlined> 	
        {{ $vuetify.lang.t('$vuetify.global.button.skip') }}	
      </v-btn>
    </ButtonBar>

    <v-snackbar v-model="snackbarIsOpen">
      {{ snackBarMessage }}
      
      <template v-slot:action="{ attrs }">
        <v-btn
          color="warning"
          text
          v-bind="attrs"
          @click="snackbarIsOpen = false"
        >
           {{ $vuetify.lang.t('$vuetify.global.button.close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard'
import { browserSupportsWebauthn } from '@simplewebauthn/browser';
import { newKeyName, mfa } from '@/global/mfa'

export default {
  components: {
    ProfileWizard,
  },
  data: () => ({	
    isSupported: browserSupportsWebauthn(),
    showLabelInput: false,
    input: '',
    newKeyName,
    snackbarIsOpen: false,
    snackBarMessage: '',
  }),
  methods: {
    onOk: function() {
      this.showLabelInput = true
    },
    onKeyup: function(event) {
      if(event.key == 'Enter') {
        this.onContinue()
      }
    },
    onContinue: function() {
      if(!this.input.trim()) {
        this.snackBarMessage = this.$vuetify.lang.t('$vuetify.2sv.key.insert.label')
        this.snackbarIsOpen = true
        return
      } else if (mfa.keys.data?.find(key => key.label == this.input.trim())) {
        this.snackbarIsOpen = true
        this.snackBarMessage = this.$vuetify.lang.t('$vuetify.2sv.key.insert.duplicate')
        this.input = ''
        return
      }
      this.newKeyName.set(this.input)
      this.$router.push("/2sv/usb-security-key/touch")
    },
  },
}
</script>