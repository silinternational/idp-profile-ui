<template>
  <ProfileProgress>
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
  </ProfileProgress>
</template>

<script>
import ProfileProgress from '@/profile/ProfileProgress';

export default {
  components: {
    ProfileProgress
  }
};
</script>