<template>
  <ProfileWizard>
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.2sv.codes.intro.header') }}
      </template>

      <p>
        {{ $vuetify.t('$vuetify.2sv.codes.intro.info') }}
      </p>

      <p>
        –OR–
      </p>

      <p>
        {{ $vuetify.t('$vuetify.2sv.codes.intro.warning') }}
      </p>
    </BasePage>

    <ButtonBar>
      <!-- TODO: the color of this button may need to change depending on state of 2sv so far or it could always be yellow with a tooltip about the improtance of having backup codes even if you have other 2sv options. -->
      <v-btn to="/profile/complete" flat tabindex="-1"> 
        {{ $vuetify.t('$vuetify.global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn to="/2sv/printable-backup-codes/new" color="primary" flat> 
        {{ $vuetify.t('$vuetify.global.button.continue') }}
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