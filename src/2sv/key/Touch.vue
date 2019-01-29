<template>
  <ProfileWizard>
    <v-alert :value="u2f.id" type="warning">
      <span class="layout row align-center justify-center">
        {{ $vuetify.t('$vuetify.2sv.key.warning', u2f.label) }}
      </span>
    </v-alert>

    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.2sv.key.touch.header') }}
      </template>

      <p>
        {{ $vuetify.t('$vuetify.2sv.key.touch.info') }}
      </p>

      <figure class="layout column align-center pa-4">
        <img v-if="! touched" src="@/assets/touch-usb-security-key.png">
        <v-icon v-else color="success" x-large>check</v-icon>
      </figure>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/usb-security-key/insert" flat tabindex="-1"> 
        {{ $vuetify.t('$vuetify.global.button.back') }}
      </v-btn>
      <v-btn v-if="u2f.id" to="/2sv/printable-backup-codes/intro" color="primary" flat tabindex="-1"> 
        {{ $vuetify.t('$vuetify.global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard'
import u2f from './u2f-api.js'

export default {
  components: {
    ProfileWizard
  },
  data: () => ({
    mfa: {},
    touched: false
  }),
  computed: {
    u2f: vm => vm.$user.mfas.find(mfa => mfa.type == 'u2f') || {}
  },
  async created() {
    this.mfa = await this.$API.post('mfa', { type: 'u2f' })

    u2f.register(
      this.mfa.data.challenge.appId,
      [this.mfa.data.challenge],
      [],
      this.handleKeyResponse
    )
  },
  methods: {
    handleKeyResponse: async function(response) {
      await this.$API.put(`mfa/${this.mfa.id}/verify`, { value: response })

      this.touched = true

      // pause for a moment so user can see the checkmark.
      setTimeout(
        () => this.$router.push('/2sv/usb-security-key/confirmed'),
        500
      )
    }
  }
}
</script>