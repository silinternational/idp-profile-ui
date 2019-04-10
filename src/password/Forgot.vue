<template>
  <BasePage>
    <template slot="header">{{ $vuetify.t('$vuetify.password.forgot.header') }}</template>

    <v-form @submit.prevent="usedEnterKey = !usedEnterKey" ref="form">
      <BaseTextField :label="$vuetify.t('$vuetify.password.forgot.unameInput', $root.idpConfig.idpName)"
                     v-model="uname"
                     :rules="[
                       v => !!v || $vuetify.t('$vuetify.password.forgot.required')
                     ]" validate-on-blur autofocus />
    </v-form>

    <ButtonBar>
      <v-spacer></v-spacer>
      <v-tooltip :disabled="! usedEnterKey" :value="usedEnterKey" top>
        <v-btn color="primary" slot="activator" class="g-recaptcha" outline>
          {{ $vuetify.t('$vuetify.password.forgot.button.send') }}
        </v-btn>
        {{ $vuetify.t('$vuetify.password.forgot.clickOnly') }}
      </v-tooltip>
    </ButtonBar>
  </BasePage>
</template>

<script>
export default {
  data: () => ({
    uname: '',
    recaptchaResponse: '',
    usedEnterKey: false
  }),
  created() {
    loadRecaptchaApi(this.recaptchaLoaded)
  },
  methods: {
    recaptchaLoaded() {
      // TODO: needed a quick fix for UX testing but this needs to be done more elegantly.
      setTimeout(() => {
        grecaptcha.render(document.querySelector('.g-recaptcha'), {
          sitekey: this.$root.idpConfig.recaptchaKey,
          callback: this.recaptchad,
          'expired-callback': this.expired
        })
      }, this.$root.idpConfig.recaptchaKey ? 0 : 1000)
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
        const reset = await this.$API.post('reset', {
          username: this.uname,
          verification_token: this.recaptchaResponse
        })

        this.$router.push(`/password/forgot/${reset.uid}`)
      }
    },
  }
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
