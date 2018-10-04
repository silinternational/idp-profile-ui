<template>
  <ProfileProgress>
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.password.create.header', idp.name) }}
      </template>

      <v-form @submit.prevent="save" ref="form">
        <BaseTextField 
          type="password" 
          :label="$vuetify.t('$vuetify.password.create.pwInput', idp.name)" 
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

    <ButtonBar>
      <v-btn to="/profile/intro" flat tabindex="-1">
        {{ $vuetify.t('$vuetify.global.button.back') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn @click="save" color="primary" flat>
        {{ $vuetify.t('$vuetify.global.button.continue') }}
      </v-btn>
    </ButtonBar>
  </ProfileProgress>
</template>

<script>
import PasswordConstraints from './PasswordConstraints';
import PasswordStrength from './PasswordStrength';
import ProfileProgress from '@/profile/ProfileProgress';

export default {
  components: {
    PasswordConstraints,
    PasswordStrength,
    ProfileProgress
  },
  data: vm => ({
    idp: {
      name: 'SIL'
    },
    password: vm.$root.$data.password || '',
    //TODO: need to integrate API call as well as the translations
    rules: [v => v.length > 8 || 'too short']
  }),
  methods: {
    save: async function() {
      if (this.$refs.form.validate()) {
        this.$root.$data.password = this.password;

        this.$router.push('/password/confirm');
      }
    }
  }
};
</script>
