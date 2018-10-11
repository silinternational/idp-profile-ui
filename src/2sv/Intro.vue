<template>
  <ProfileWizard>
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.2sv.intro.header') }}
      </template>

      <p>
        {{ $vuetify.t('$vuetify.2sv.intro.info') }}
      </p>

      <!-- TODO: find another intro video without the vendor lock-in -->
      <iframe width="560" height="315" 
              src="https://www.youtube.com/embed/0mvCeNsTa1g" 
              frameborder="0" allow="autoplay; encrypted-media" allowfullscreen class="pa-3"/>

    </BasePage>

    <ButtonBar>
        <v-spacer></v-spacer>
        
        <v-btn to="TBD" color="primary" flat> 
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