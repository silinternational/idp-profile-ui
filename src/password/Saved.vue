<template>
  <ProfileProgress>
    <BasePage>
      <template slot="header">
        Excellent!
      </template>

      <p class="text-xs-center">
        Your new password has been saved.
      </p>
    </BasePage>

    <ButtonBar>
      <v-spacer></v-spacer>

      <v-btn to="/password/recovery" color="primary" flat>Continue</v-btn>
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
  beforeRouteLeave(to, from, next) {
    delete this.$root.$data.password;

    next();
  },
  methods: {
    confirm: async function() {
      if (this.$refs.form.validate()) {
        this.$router.push('/password/saved');
      }
    }
  }
};
</script>
