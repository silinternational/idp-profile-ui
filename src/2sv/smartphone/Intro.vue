<template>
  <ProfileWizard>
    <BasePage>
      <template v-slot:header>
        {{ $vuetify.lang.t('$vuetify.2sv.smartphone.intro.header') }}
      </template>

      <p>
        {{ $vuetify.lang.t('$vuetify.2sv.smartphone.intro.info') }}
      </p>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/intro" tabindex="-1" outlined class="mr-2 mr-sm-4 mb-4 mb-sm-0 "> 
        {{ $vuetify.lang.t('$vuetify.global.button.back') }}
      </v-btn>
      <v-btn to="/2sv/usb-security-key/intro" color="primary" tabindex="-1" outlined> 
        {{ $vuetify.lang.t('$vuetify.global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn to="/2sv/usb-security-key/intro" color="primary" tabindex="-1" outlined class="mr-2 mr-sm-4 "> 
        {{ $vuetify.lang.t('$vuetify.global.button.no') }}
      </v-btn>
      <v-btn to="/2sv/smartphone/download-app" color="primary" outlined> 
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