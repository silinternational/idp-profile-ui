<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template v-slot:header>
        {{ $vuetify.lang.t('$vuetify.password.create.header', $root.idpConfig.idpName) }}
      </template>

      <v-form @submit.prevent="save" ref="form">
        <p>
          {{ $vuetify.lang.t('$vuetify.password.create.username', $root.idpConfig.idpName) }} <strong class="body-2">{{ $user.idp_username }}</strong>
        </p>

        <BaseTextField type="password" :label="$vuetify.lang.t('$vuetify.password.create.pwInput')" v-model="password" 
                       :rules="rules" :error-messages="errors" validate-on-blur @keyup.enter="blur" autofocus name="password" />

        <v-alert :value="!!(showFeedback && password)" :type="strength.feedback.warning ? 'error' : 'info'" outlined>
          <header class="body-2">{{ strength.feedback.warning }}</header>
          
          <ul>
            <li v-for="suggestion in strength.feedback.suggestions" :key="suggestion">{{ suggestion }}</li>
          </ul>

          <footer class="d-flex align-center justify-end">
            <a href="https://idphelp.sil.org/logging-in/password/password-recommendations" target="_blank" class="caption">
              {{ $vuetify.lang.t('$vuetify.global.learnMore') }}
            </a>
          </footer>
        </v-alert>

        <v-alert :value="!!isGood" type="success" outlined>
          <header class="body-2">{{ $vuetify.lang.t('$vuetify.password.create.goodPassword') }}</header>
        </v-alert>
      </v-form>
    </BasePage>

    <template v-slot:actions>
      <v-btn v-if="$user.isNew()" to="/profile/intro" tabindex="-1" outlined>
        {{ $vuetify.lang.t('$vuetify.global.button.back') }}
      </v-btn>
      <v-btn v-else @click.once="skip" tabindex="-1" outlined>
        {{ $vuetify.lang.t('$vuetify.global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn @click.once="save" color="primary" outlined>
        {{ $vuetify.lang.t('$vuetify.global.button.continue') }}
      </v-btn>
    </template>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard'
import zxcvbn from 'zxcvbn'

export default {
  components: {
    ProfileWizard,
  },
  data: vm => ({
    password: vm.$root.$data.password || '',
    rules: [
      v => required(v, vm),
      v => minLength(v, vm),
      v => maxLength(v, vm),
      v => strong(v, vm),
    ],
    errors: [],
  }),
  computed: {
    strength: vm => zxcvbn(vm.password),
    showFeedback: vm => vm.strength.feedback.warning || vm.strength.feedback.suggestions.length,
    isGood: vm => vm.password && vm.$refs.form && vm.$refs.form.validate(),
  },
  methods: {
    async save() {
      if (this.$refs.form.validate()) {
        try {
          await this.$API.put('password/assess', {
            password: this.password
          })

          this.$root.$data.password = this.password

          this.$router.push('/password/confirm')
        } catch (e) {
          this.errors.push(this.$vuetify.lang.t('$vuetify.password.create.noGood'))

          this.password = ''

          if (e.code === 1554734183) {
            this.$ga.event('password', 'pwned')
          }
        }
      }
    },
    blur(event) {
      event.target.blur()
    },
    skip() {
      this.$refs.wizard.next()
    },
  },
  watch: {
    password: function () {
      if (this.isGood) {
        this.errors.splice(0)
      }
    },
  },
}

const required = (v, vm) => !!v || vm.$vuetify.lang.t('$vuetify.password.create.required')
const minLength = (v, vm) => v.length >= vm.$root.idpConfig.passwordRules.minLength || vm.$vuetify.lang.t('$vuetify.password.create.tooShort', vm.$root.idpConfig.passwordRules.minLength)
const maxLength = (v, vm) => v.length < vm.$root.idpConfig.passwordRules.maxLength || vm.$vuetify.lang.t('$vuetify.password.create.tooLong', vm.$root.idpConfig.passwordRules.maxLength)
const strong = (v, vm) => vm.strength.score >= vm.$root.idpConfig.passwordRules.minScore || vm.$vuetify.lang.t('$vuetify.password.create.tooWeak')
</script>
