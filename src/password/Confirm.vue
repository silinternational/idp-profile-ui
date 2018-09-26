<template>
  <ProfileProgress>
    <BasePage>
      <template slot="header">
        Confirm your new password
      </template>

      <p>
        Just to make sure the password is correct, please enter it one more time.
      </p>

      <!-- TODO:  review https://www.smashingmagazine.com/2011/11/extensive-guide-web-form-usability/ for form best practices -->
      <v-form @submit.prevent="confirm" ref="form" class="pa-3">
        <!-- TODO: don't forget to consider when to turn autocomplete="off" -->
        <v-text-field label="Your new password again" type="password" v-model="password" :rules="rules" autofocus outline />
      </v-form>
    </BasePage>

    <ButtonBar>
      <v-btn to="/password/create" flat>Back</v-btn>

      <v-spacer></v-spacer>

      <v-btn @click="confirm" color="primary" flat>Continue</v-btn>
    </ButtonBar>
  </ProfileProgress>
</template>

<script>
import ProfileProgress from '@/profile/ProfileProgress';

export default {
  components: {
    ProfileProgress
  },
  data: vm => ({
    password: '',
    rules: [v => v == vm.$root.$data.password || 'does not match']
  }),
  methods: {
    confirm: async function() {
      if (this.$refs.form.validate()) {
        delete this.$root.$data.password;
        this.$router.push('/password/saved');
      }
    }
  }
};
</script>
