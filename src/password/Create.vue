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

      <!-- TODO: users will not be looking at screen most likely, design this indicator accordingly. -->
      <PasswordStrength :password="password" />
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
import PasswordStrength from './PasswordStrength';
import ProfileWizard from '@/profile/ProfileWizard';

export default {
  components: {
    PasswordStrength,
    ProfileWizard
  },
  data: vm => ({
    password: vm.$root.$data.password || '',
    rules: [
      v => !!v || vm.$vuetify.t('$vuetify.password.create.required'),
      v =>
        v.length > vm.$config.password.minLength.value ||
        vm.$vuetify.t(
          '$vuetify.password.create.tooShort',
          vm.$config.password.minLength.value
        ),
      v =>
        v.length < vm.$config.password.maxLength.value ||
        vm.$vuetify.t(
          '$vuetify.password.create.tooLong',
          vm.$config.password.maxLength.value
        )
    ]
  }),
  methods: {
    save: function() {
      if (this.$refs.form.validate()) {
        this.$root.$data.password = this.password;

        this.$router.push('/password/confirm');
      }
    }
  }
};
</script>
