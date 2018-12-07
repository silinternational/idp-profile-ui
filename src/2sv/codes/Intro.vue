<template>
  <ProfileWizard>
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.2sv.codes.intro.header') }}
      </template>

      <p>
        {{ $vuetify.t('$vuetify.2sv.codes.intro.info') }}
      </p>
    </BasePage>

    <ButtonBar>
      <v-btn to="/profile/complete" flat color="warning" tabindex="-1"> 
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
import ProfileWizard from '@/profile/ProfileWizard'

export default {
  components: {
    ProfileWizard
  }
}
</script>