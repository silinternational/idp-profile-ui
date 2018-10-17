<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.2sv.codes.new.header') }}
      </template>
    </BasePage>

    <ButtonBar>
      <v-spacer></v-spacer>
      
      <v-btn @click="finish" color="primary" flat> 
        {{ $vuetify.t('$vuetify.2sv.codes.new.button.ok') }}
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
  methods: {
    finish: function() {
      this.$refs.wizard.complete();

      this.$router.push('/profile/complete');
    }
  }
};
</script>