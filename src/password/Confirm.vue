<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.password.confirm.header') }}
      </template>


      <!-- TODO:  review https://www.smashingmagazine.com/2011/11/extensive-guide-web-form-usability/ for form best practices -->
      <v-form @submit.prevent="confirm" ref="form" class="pa-3">
        <p>
          {{ $vuetify.t('$vuetify.password.confirm.explanation') }}
        </p>
        
        <BaseTextField 
          type="password" 
          :label="$vuetify.t('$vuetify.password.confirm.pwInput')" 
          v-model="password" 
          :rules="rules"
          :error-messages="errors" 
          validate-on-blur 
          autofocus />
      </v-form>
    </BasePage>

    <template slot="actions">
      <v-btn to="/password/create" :color="errors.length ? 'primary' : ''" flat tabindex="-1">
        {{ $vuetify.t('$vuetify.global.button.back') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn @click="confirm" color="primary" :disabled="errors.length > 0" flat>
        {{ $vuetify.t('$vuetify.global.button.continue') }}
      </v-btn>
    </template>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard';

export default {
  components: {
    ProfileWizard
  },
  data: vm => ({
    password: '',
    rules: [
      v =>
        v == vm.$root.$data.password ||
        vm.$vuetify.t('$vuetify.password.confirm.noMatch')
    ],
    errors: []
  }),
  beforeRouteLeave(to, from, next) {
    delete this.$root.$data.password;

    next();
  },
  methods: {
    confirm: async function() {
      if (this.$refs.form.validate()) {
        try {
          await this.$API.put('password', {
            password: this.password
          });

          this.$refs.wizard.complete();

          this.$router.push('/password/saved');
        } catch (e) {
          if (e.status == 409) {
            this.errors.push(
              this.$vuetify.t('$vuetify.password.confirm.reused')
            );
          }
        }
      }
    }
  }
};
</script>
