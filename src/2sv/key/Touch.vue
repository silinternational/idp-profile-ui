<template>
  <ProfileWizard>
    <v-alert :value="error" type="error">
      <span class="d-flex align-center justify-center">
        {{ $vuetify.lang.t('$vuetify.2sv.key.touch.error') }}
      </span>
    </v-alert>

    <BasePage>
      <template v-slot:header>
        {{ $vuetify.lang.t('$vuetify.2sv.key.touch.header') }}
      </template>

      <p>
        {{ $vuetify.lang.t('$vuetify.2sv.key.touch.info') }}
      </p>

      <figure class="pa-4 d-flex flex-column">
        <v-img v-if="! touched" contained src="@/assets/touch-usb-security-key.png" alt="A finger touching the top of a usb key."/>
        <v-icon v-else color="success" x-large>mdi-check</v-icon>
      </figure>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/usb-security-key/insert" tabindex="-1" outlined> 
        {{ $vuetify.lang.t('$vuetify.global.button.back') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn v-if="isSupported && error" @click="error = false; create()" color="error" outlined> 
        {{ $vuetify.lang.t('$vuetify.2sv.key.touch.button.retry') }}
      </v-btn>

      <v-btn v-if="error" to="/2sv/printable-backup-codes/intro" color="warning" outlined class="ml-4">
        {{ $vuetify.lang.t('$vuetify.global.button.skip') }}	
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard'
import u2f, { isSupported } from './u2f-api.js'
import { add, verify } from '@/global/mfa'

let absTimeout

export default {
  components: {
    ProfileWizard,
  },
  data: () => ({
    newU2f: {},
    touched: false,
    error: false,
    isSupported: isSupported(),
  }),
  async created() {
    this.create()
  },
  methods: {
    handleKeyResponse: async function(response) {
      if (isValid(response)) {
        clearTimeout(absTimeout)

        await verify(this.newU2f.id, response)
        
        this.touched = true
  
        // pause for a moment so user can see the checkmark.
        setTimeout(
          () => this.$router.push('/2sv/usb-security-key/confirmed'),
          500
        )
      } else {
        this.error = true
      }
    },
    async create() {
      if (this.isSupported) {
        this.newU2f = await add('u2f')
      }
  
      const TEN_SECS = 10000
      absTimeout && clearTimeout(absTimeout)
      absTimeout = setTimeout(() => {
        this.error = true
      }, TEN_SECS)

      if (this.isSupported) {
        u2f.register(
          this.newU2f.data.challenge.appId,
          [this.newU2f.data.challenge],
          [],
          this.handleKeyResponse
        )
      }
    },
  },
}

function isValid(u2fResponse) {
  return u2fResponse.clientData && u2fResponse.registrationData
}
</script>