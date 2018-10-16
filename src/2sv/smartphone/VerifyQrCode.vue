<template>
  <ProfileWizard>
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.2sv.smartphone.verifyQrCode.header') }}
      </template>

      <v-layout align-center class="px-5">
        <img src="@/assets/google-authenticator-6-digit-code.png">

        <v-form @submit.prevent="verify" ref="form" class="pl-5">
          {{ $vuetify.t('$vuetify.2sv.smartphone.verifyQrCode.info') }}
          
          <BaseTextField 
            type="text" 
            :label="$vuetify.t('$vuetify.2sv.smartphone.verifyQrCode.codeInput')" 
            v-model="code" 
            :rules="rules" 
            validate-on-blur 
            autofocus 
            class="mt-4" />
        </v-form>
      </v-layout>
    </BasePage>

    <ButtonBar>
        <v-btn to="/2sv/smartphone/scan-qr" flat tabindex="-1"> 
          {{ $vuetify.t('$vuetify.global.button.back') }}
        </v-btn>

        <v-spacer></v-spacer>
        
        <v-btn @click="verify" color="primary" flat> 
          {{ $vuetify.t('$vuetify.global.button.verify') }}
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
  data: vm => ({
    code: '',
    rules: [
      // users may enter codes that begin with zeros or they might put a space in between digits
      v =>
        /^\d{3} ?\d{3}$/.test(v) ||
        vm.$vuetify.t('$vuetify.2sv.smartphone.verifyQrCode.invalidCode')
    ]
  }),
  methods: {
    verify: async function() {
      if (this.$refs.form.validate()) {
        const code = this.code.trim();
        await this.$API.fake('PUT or POST /method', code);

        this.$router.push('/2sv/smartphone/code-verified');
      }
    }
  }
};
</script>

<style scoped>
</style>
