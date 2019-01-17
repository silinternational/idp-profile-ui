<template>
  <ProfileWizard>
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.2sv.smartphone.verifyQrCode.header') }}
      </template>

      <v-layout align-center class="px-5">
        <!-- TODO: put something here to ensure the user knows this is an example (text perhaps or maybe the screenshot of the phone with it in there blurring the code prhaps to ensure user does not actually use the code in the sample screenshot) -->
        <img src="@/assets/google-authenticator-6-digit-code.png">

        <v-form @submit.prevent="verify" ref="form" class="pl-5">
          {{ $vuetify.t('$vuetify.2sv.smartphone.verifyQrCode.info') }}
          
          <BaseTextField type="text" :label="$vuetify.t('$vuetify.2sv.smartphone.verifyQrCode.codeInput')" v-model="code" 
                         :rules="rules" validate-on-blur @keyup.enter="blur" autofocus class="mt-4" />
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
import ProfileWizard from '@/profile/ProfileWizard'

export default {
  components: {
    ProfileWizard,
  },
  data: vm => ({
    code: '',
    rules: [
      // users may enter codes that begin with zeros or they might put a space in between digits
      v =>
        /^\d{3} ?\d{3}$/.test(v) ||
        vm.$vuetify.t('$vuetify.2sv.smartphone.verifyQrCode.invalidCode')
    ],
  }),
  methods: {
    async verify() {
      if (this.$refs.form.validate()) {
        await this.$API.put(`mfa/${this.$route.query.id}/verify`, {
          value: this.code.trim()
        })

        this.$router.push('/2sv/smartphone/code-verified')
      }
    },
    blur() {
      document.querySelector('input').blur()
    },
  }
}
</script>
