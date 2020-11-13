<template>
  <ProfileWizard>
    <BasePage>
      <template v-if="isSupported" v-slot:header>
        {{ $vuetify.lang.t('$vuetify.2sv.key.insert.header') }}
      </template>
      <template v-else v-slot:header>
        {{ $vuetify.lang.t('$vuetify.2sv.key.insert.nosupport.header') }}
      </template>

      <figure v-if="isSupported" class="layout column align-center pa-4">
        <img src="@/assets/insert-usb-security-key.png">
      </figure>
      <p v-else>{{ $vuetify.lang.t('$vuetify.2sv.key.insert.nosupport.info') }}</p>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/usb-security-key/intro" text tabindex="-1" outlined> 
        {{ $vuetify.lang.t('$vuetify.global.button.back') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn v-if="isSupported" to="/2sv/usb-security-key/touch" color="primary" text outlined> 
        {{ $vuetify.lang.t('$vuetify.2sv.key.insert.button.ok') }}
      </v-btn>
      <v-btn v-else to="/2sv/printable-backup-codes/intro" color="primary" text outlined> 
        {{ $vuetify.lang.t('$vuetify.global.button.skip') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard'
import bowser from 'bowser'

export default {
  components: {
    ProfileWizard,
  },
  data: () => ({
    isSupported: (bowser.chrome   && bowser.version >= 41) ||
                 (bowser.chromium && bowser.version >= 41) ||
                 (bowser.firefox  && bowser.version >= 58) ||
                 (bowser.opera    && bowser.version >= 39),
    bowser,
  }),
}
</script>