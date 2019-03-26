<template>
  <ProfileWizard>
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.2sv.smartphone.verifyQrCode.header') }}
      </template>

      <v-layout align-center class="px-5">
        <v-form @submit.prevent="verify" ref="form" class="pl-5 layout column align-center">
          <p>{{ $vuetify.t('$vuetify.2sv.smartphone.verifyQrCode.info') }}</p>
          
          <BaseTextField type="text" :label="$vuetify.t('$vuetify.2sv.smartphone.verifyQrCode.codeInput')" v-model="code" 
                         :rules="rules" :error-messages="errors" validate-on-blur @keyup.enter="blur" autofocus class="mt-4" />
        </v-form>
      </v-layout>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/smartphone/scan-qr" flat tabindex="-1" outline> 
        {{ $vuetify.t('$vuetify.global.button.back') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn @click="verify" color="primary" flat outline> 
        {{ $vuetify.t('$vuetify.global.button.verify') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard'
import { verify } from '@/global/mfa';

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
    errors: [],
  }),
  methods: {
    async verify() {
      if (this.$refs.form.validate()) {
        try {
          await verify(this.$route.query.id, this.code.trim())
  
          this.$router.push('/2sv/smartphone/code-verified')
        } catch (error) {
          if (error.status == 400) {
            this.errors.push(this.$vuetify.t('$vuetify.2sv.smartphone.verifyQrCode.hint'))
          }
        }
      }
    },
    blur(event) {
      event.target.blur()
    },
  }
}
</script>
<style scoped>
div.v-input.v-text-field {
  max-width: 30%;
}
</style>