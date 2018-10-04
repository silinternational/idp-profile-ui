<template>
  <ProfileProgress>
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.password.recovery.header') }}
      </template>

      <p>
        {{ $vuetify.t('$vuetify.password.recovery.explanation') }}
      </p>

      <p>
        {{ $vuetify.t('$vuetify.password.recovery.advice') }}
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
