<template>
  <ProfileWizard>
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.2sv.key.touch.header') }}
      </template>

      <p>
        {{ $vuetify.t('$vuetify.2sv.key.touch.info') }}
      </p>

      <figure class="layout column align-center pa-4">
        <img v-if="! touched" src="@/assets/touch-usb-security-key.png">
        <v-icon v-else color="success" x-large>check</v-icon>
      </figure>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/usb-security-key/insert" flat tabindex="-1"> 
        {{ $vuetify.t('$vuetify.global.button.back') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn @click="signed" color="warning" flat tabindex="-1"> 
        simulate touch
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard';

export default {
  components: {
    ProfileWizard
  },
  data: () => ({
    touched: false
  }),
  methods: {
    signed: function() {
      this.touched = true;

      setTimeout(() => {
        this.$router.push('/2sv/usb-security-key/confirmed');
      }, 500);
    }
  }
};
</script>