<template>
  <BasePage>
    <template v-slot:header>{{ $vuetify.lang.t('$vuetify.password.forgot.header') }}</template>

    <v-form @submit.prevent="usedEnterKey = !usedEnterKey" ref="form">
      <BaseTextField :label="$vuetify.lang.t('$vuetify.password.forgot.unameInput', $root.idpConfig.idpName)"
                     v-model="uname"
                     :rules="[
                       v => !!v || $vuetify.lang.t('$vuetify.password.forgot.required')
                     ]" validate-on-blur autofocus />
    </v-form>

    <ButtonBar>
      <v-spacer></v-spacer>
      <v-tooltip :disabled="! usedEnterKey || ! uname" :value="usedEnterKey" top>
        <template v-slot:activator="{ on }">
          <div v-on="on">
            <v-btn :disabled="! uname" @click="usedEnterKey = false" color="primary" class="g-recaptcha" outlined>
              {{ $vuetify.lang.t('$vuetify.password.forgot.button.send') }}
            </v-btn>
          </div>
        </template>

        {{ $vuetify.lang.t('$vuetify.password.forgot.clickOnly') }}
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
      grecaptcha.render(document.querySelector('.g-recaptcha'), {
        sitekey: `${process.env.VUE_APP_RECAPTCHA_ID}`,
        callback: this.recaptchad,
        'expired-callback': this.expired
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
            verification_token: this.recaptchaResponse
          })

          this.$router.push(`/password/forgot/${reset.uid}`)
        } catch (error) {
          grecaptcha.reset()          
        }
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
