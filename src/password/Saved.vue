<template>
  <ProfileProgress>
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.password.saved.header') }}
      </template>

      <p class="text-xs-center">
        {{ $vuetify.t('$vuetify.password.saved.info') }}
      </p>
    </BasePage>

    <ButtonBar>
      <v-spacer></v-spacer>

      <v-btn to="/password/recovery" color="primary" flat>
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
