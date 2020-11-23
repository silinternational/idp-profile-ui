<template>
  <ProfileWizard>
    <BasePage>
      <template v-slot:header>
        {{ $vuetify.lang.t('$vuetify.2sv.intro.header') }}
      </template>

      <p>
        {{ $vuetify.lang.t('$vuetify.2sv.intro.info') }}
      </p>

      <iframe width="560" height="315" src="https://www.youtube.com/embed/N1CNo4AZLRQ?rel=0" 
              frameborder="0" allow="autoplay; encrypted-media;" allowfullscreen class="pa-3" />

      <p class="ma-0 body-2 layout row">
        <v-icon color="info" class="mr-2">mdi-information</v-icon>
        {{ $vuetify.lang.t('$vuetify.2sv.intro.incentive') }}
      </p>
    </BasePage>

    <ButtonBar>
        <v-spacer></v-spacer>
        
        <v-btn to="/2sv/smartphone/intro" color="primary" outlined> 
          {{ $vuetify.lang.t('$vuetify.global.button.continue') }}
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