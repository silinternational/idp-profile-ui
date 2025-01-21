<template>
  <BasePage>
    <template #header> {{ $t('password.forgot.header') }} </template>

    <v-form ref="form" @submit.prevent="usedEnterKey = !usedEnterKey">
      <BaseTextField
        v-model="uname"
        :label="$t('password.forgot.unameInput', [$idpConfig.idpName])"
        :rules="[(v) => !!v || $t('password.forgot.required')]"
        validate-on-blur
        autofocus
      />
    </v-form>

    <ButtonBar>
      <v-spacer />
      <v-tooltip :disabled="!usedEnterKey || !uname" :model-value="usedEnterKey" location="top">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            :disabled="!uname"
            color="primary"
            class="g-recaptcha"
            variant="outlined"
            @click="usedEnterKey = false"
          >
            {{ $t('password.forgot.button.send') }}
          </v-btn>
        </template>

        {{ $t('password.forgot.clickOnly') }}
      </v-tooltip>
    </ButtonBar>
  </BasePage>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data: () => ({
    uname: '',
    recaptchaResponse: '',
    usedEnterKey: false,
  }),
  created() {
    loadRecaptchaApi(this.recaptchaLoaded)
  },
  methods: {
    recaptchaLoaded() {
      grecaptcha.render(document.querySelector('.g-recaptcha'), {
        sitekey: `${import.meta.env.VITE_RECAPTCHA_ID}`,
        callback: this.recaptchad,
        'expired-callback': this.expired,
      })
    },
    recaptchad(response) {
      this.recaptchaResponse = response

      this.send()
    },
    expired() {
      this.recaptchaResponse = ''
    },
    async send() {
      if (this.$refs.form.validate()) {
        try {
          const reset = await this.$API.post('reset', {
            username: this.uname,
            verification_token: this.recaptchaResponse,
          })

          this.$router.push(`/password/forgot/${reset.uid}`)
        } catch (error) {
          grecaptcha.reset()
          throw error
        }
      }
    },
  },
}

function loadRecaptchaApi(cb) {
  window.recaptchaLoaded = cb

  const script = document.createElement('script')

  script.setAttribute('src', 'https://www.google.com/recaptcha/api.js?onload=recaptchaLoaded&render=explicit')
  script.async = true
  script.defer = true

  document.head.appendChild(script)
}
</script>
