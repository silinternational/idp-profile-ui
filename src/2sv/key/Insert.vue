<template>
  <ProfileWizard>
    <v-alert :value="u2f.id" type="warning">
      <span class="layout row align-center justify-center">
        {{ $vuetify.t('$vuetify.2sv.key.warning', u2f.label) }}
      </span>
    </v-alert>

    <BasePage>
      <template v-if="isSupported" slot="header">
        {{ $vuetify.t('$vuetify.2sv.key.insert.header') }}
      </template>
      <template v-else slot="header">
        {{ $vuetify.t('$vuetify.2sv.key.insert.nosupport.header') }}
      </template>

      <figure v-if="isSupported" class="layout column align-center pa-4">
        <img src="@/assets/insert-usb-security-key.png">
      </figure>
      <p v-else>{{ $vuetify.t('$vuetify.2sv.key.insert.nosupport.info') }}</p>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/usb-security-key/intro" flat tabindex="-1" outline> 
        {{ $vuetify.t('$vuetify.global.button.back') }}
      </v-btn>
      <v-btn v-if="u2f.id" to="/2sv/printable-backup-codes/intro" color="primary" flat tabindex="-1" outline> 
        {{ $vuetify.t('$vuetify.global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn v-if="isSupported" to="/2sv/usb-security-key/touch" color="primary" flat outline> 
        {{ $vuetify.t('$vuetify.2sv.key.insert.button.ok') }}
      </v-btn>
      <v-btn v-else to="/2sv/printable-backup-codes/intro" color="primary" flat outline> 
        {{ $vuetify.t('$vuetify.global.button.skip') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard'
import bowser from 'bowser'

export default {
  components: {
    ProfileWizard
  },
  data: () => ({
    isSupported: (bowser.chrome  && bowser.version >= 41) ||
                 (bowser.firefox && bowser.version >= 58) ||
                 (bowser.opera   && bowser.version >= 39),
    mfas: [],
  }),
  computed: {
    u2f: vm => vm.mfas.find(mfa => mfa.type == 'u2f') || {},
  },
  async created() {
    this.mfas = await this.$API.get(`mfa`)
  }
}
</script>