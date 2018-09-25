<template>
  <ProfileProgress>
    <BasePage>
      <template slot="header">
        Create a password for your <em>{{ idp.name }}</em> Identity
      </template>

      <v-layout row justify-space-around>
        <PasswordRequirements />

        <!-- TODO: users will not be looking at screen most likely, design this indicator accordingly. -->
        <PasswordStrength :password="password.value" />
      </v-layout>

      <!-- TODO:  review https://www.smashingmagazine.com/2011/11/extensive-guide-web-form-usability/ for form best practices -->
      <v-form @submit.prevent="save" ref="form" class="pa-3">
        <!-- TODO: don't forget to consider when to turn autocomplete="off" -->
        <v-text-field label="Your new password" v-model="password.value"
          :append-icon="password.show ? 'visibility_off' : 'visibility'"
          :type="password.show ? 'text' : 'password'"
          @click:append="password.show = !password.show"
          :rules="rules" autofocus outline />
<PasswordInput outline />
      </v-form>

    </BasePage>

    <ButtonBar>
      <v-btn to="/profile/intro" flat>Back</v-btn>

      <v-spacer></v-spacer>

      <v-btn @click="save" color="primary" flat>Continue</v-btn>
    </ButtonBar>
  </ProfileProgress>
</template>

<script>
import BasePage from '@/components/BasePage';
import ButtonBar from '@/components/ButtonBar';
import PasswordInput from '@/components/PasswordInput';
import PasswordRequirements from '@/components/PasswordRequirements';
import PasswordStrength from '@/components/PasswordStrength';
import ProfileProgress from '@/components/ProfileProgress';

export default {
  components: {
    BasePage,
    ButtonBar,
    PasswordInput,
    PasswordRequirements,
    PasswordStrength,
    ProfileProgress
  },
  data() {
    return {
      idp: {
        name: 'SIL'
      },
      password: {
        value: '',
        show: false
      },
      rules: [v => v.length > 8 || 'too short']
    };
  },
  methods: {
    save: async function() {
      if (this.$refs.form.validate()) {
        this.$root.$data.password = this.password;
        this.$router.push('/password/create');
      }
    }
  }
};
</script>
