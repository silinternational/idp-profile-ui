<template>
  <ProfileWizard>
    <BasePage>
      <template #header>
        {{ $t('2sv.smartphone.verifyQrCode.header') }}
      </template>

      <v-row align="center" class="px-5">
        <v-form ref="form" class="pl-2 d-flex flex-column align-center" @submit.prevent="verify">
          <p>{{ $t('2sv.smartphone.verifyQrCode.info') }}</p>

          <BaseTextField
            v-model="code"
            type="text"
            :label="$t('2sv.smartphone.verifyQrCode.codeInput')"
            :rules="rules"
            :error-messages="errors"
            validate-on-blur
            autofocus
            class="mt-4"
            @keyup.enter="blur"
          />
        </v-form>
      </v-row>
    </BasePage>

    <ButtonBar>
      <v-btn to="/2sv/smartphone/scan-qr" tabindex="-1" variant="outlined">
        {{ $t('global.button.back') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn color="primary" variant="outlined" @click.once="verify">
        {{ $t('global.button.verify') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard.vue'
import { verify } from '@/global/mfa'

export default {
  components: {
    ProfileWizard,
  },
  data: (vm) => ({
    code: '',
    rules: [
      // users may enter codes that begin with zeros or they might put a space in between digits
      (v) => /^\d{3} ?\d{3}$/.test(v) || vm.$t('2sv.smartphone.verifyQrCode.invalidCode'),
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
            this.errors.push(this.$t('2sv.smartphone.verifyQrCode.hint'))
          }
        }
      }
    },
    blur(event) {
      event.target.blur()
    },
  },
}
</script>
<style scoped>
div.v-input.v-text-field {
  max-width: 30%;
}

@media only screen and (max-width: 480px) {
  div.v-input.v-text-field {
    max-width: 60%;
  }
}
</style>
