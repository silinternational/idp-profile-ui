<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.2sv.codes.new.header') }}
      </template>

      {{ codes }}
    </BasePage>
<!-- TODO: might be useful for "copy" function (https://github.com/30-seconds/30-seconds-of-code#copytoclipboard-) -->

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
  data: () => ({
    codes: []
  }),
  async created() {
    const newCodes = await this.$API.post('mfa', { type: 'backupcode' });

    this.codes = newCodes.data;
  },
  methods: {
    finish: function() {
      this.$refs.wizard.complete();

      this.$router.push('/profile/complete');
    }
  }
};
</script>