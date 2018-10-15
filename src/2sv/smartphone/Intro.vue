<template>
  <ProfileWizard>
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.2sv.smartphone.intro.header') }}
      </template>

      <p>
        {{ $vuetify.t('$vuetify.2sv.smartphone.intro.info') }}
      </p>
    </BasePage>

    <ButtonBar>
        <v-btn to="/2sv/intro" color="primary" flat> 
          {{ $vuetify.t('$vuetify.global.button.back') }}
        </v-btn>
        <v-btn to="/2sv/smartphone/usb-security-key/intro" color="primary" flat> 
          {{ $vuetify.t('$vuetify.global.button.skip') }}
        </v-btn>

        <v-spacer></v-spacer>
        
        <v-btn to="/2sv/smartphone/usb-security-key/intro" color="primary" flat> 
          {{ $vuetify.t('$vuetify.global.button.no') }}
        </v-btn>
        <v-btn to="/2sv/smartphone/download-app" color="primary" flat> 
          {{ $vuetify.t('$vuetify.global.button.yes') }}
        </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard';

export default {
  components: {
    ProfileWizard
  }
};
</script>