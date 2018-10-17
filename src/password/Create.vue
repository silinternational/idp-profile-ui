<template>
  <ProfileWizard>
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.password.create.header', $config.idpName) }}
      </template>

      <v-form @submit.prevent="save" ref="form">
        <BaseTextField 
          type="password" 
          :label="$vuetify.t('$vuetify.password.create.pwInput', $config.idpName)" 
          v-model="password" 
          :rules="rules" 
          validate-on-blur 
          autofocus />
        <!-- TODO: consider password suggestions for the user (https://www.smashingmagazine.com/2011/11/extensive-guide-web-form-usability/index.html#6-validation) -->
      </v-form>

      <v-layout row justify-space-around>
        <PasswordConstraints />

        <!-- TODO: users will not be looking at screen most likely, design this indicator accordingly. -->
        <PasswordStrength :password="password" />
      </v-layout>
    </BasePage>

    <template slot="actions">
      <v-btn to="/profile/intro" flat tabindex="-1">
        {{ $vuetify.t('$vuetify.global.button.back') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn @click="save" color="primary" flat>
        {{ $vuetify.t('$vuetify.global.button.continue') }}
      </v-btn>
    </template>
  </ProfileWizard>
</template>

<script>
import PasswordConstraints from './PasswordConstraints';
import PasswordStrength from './PasswordStrength';
import ProfileWizard from '@/profile/ProfileWizard';

export default {
  components: {
    PasswordConstraints,
    PasswordStrength,
    ProfileWizard
  },
  data: vm => ({
    password: vm.$root.$data.password || '',
    //TODO: need to integrate API call as well as the translations
    rules: [v => v.length > 8 || 'too short']
  }),
  methods: {
    save: async function() {
      if (this.$refs.form.validate()) {
        // TODO: should we make a "verify" call to the api here? (check for reused pw or a pwned one perhaps...)
        this.$root.$data.password = this.password;

        this.$router.push('/password/confirm');
      }
    }
  }
};
</script>
