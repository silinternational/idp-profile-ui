<template>
  <ProfileWizard ref="wizard" :key="wizardKey">
    <BasePage>
      <template v-slot:header>
        {{ $vuetify.lang.t('$vuetify.password.create.header', $root.idpConfig.idpName) }}
      </template>

      <v-form @submit.prevent="save" ref="form">
        <p>
          {{ $vuetify.lang.t('$vuetify.password.create.username', $root.idpConfig.idpName) }}
          <strong class="body-2">{{ $user.idp_username }}</strong>
        </p>

        <div class="password">
          <BaseTextField
            :type="passwordIsHidden ? 'password' : 'text'"
            :label="$vuetify.lang.t('$vuetify.password.create.pwInput')"
            v-model="password"
            :rules="rules"
            :error-messages="errors"
            validate-on-input
            @keyup.enter="blur"
            autofocus
            name="password"
          />

          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-on="on"
                v-bind="attrs"
                class="eye"
                icon
                @click="passwordIsHidden = !passwordIsHidden"
                tabindex="-1"
              >
                <v-icon>{{ passwordIsHidden ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
              </v-btn>
            </template>
            <span>{{ passwordIsHidden ? 'Show' : 'Hide' }} password</span>
          </v-tooltip>
        </div>

        <v-alert :value="!!(showFeedback && password)" :type="strength.feedback.warning ? 'error' : 'info'" outlined>
          <header class="body-2">{{ strength.feedback.warning }}</header>

          <ul>
            <li v-for="suggestion in strength.feedback.suggestions" :key="suggestion">{{ suggestion }}</li>
          </ul>

          <footer class="d-flex align-center justify-end">
            <a
              href="https://idphelp.sil.org/logging-in/password/password-recommendations"
              target="_blank"
              class="caption"
            >
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
  data: (vm) => ({
    wizardKey: 0, // This is used to refresh the form, instead of leaving it frozen after a re-used password
    password: vm.$root.$data.password || '',
    passwordIsHidden: true,
    rules: [(v) => required(v, vm), (v) => minLength(v, vm), (v) => maxLength(v, vm), (v) => strong(v, vm)],
    errors: [],
  }),
  computed: {
    strength: (vm) => zxcvbn(vm.password),
    showFeedback: (vm) => vm.strength.feedback.warning || vm.strength.feedback.suggestions.length,
    isGood: (vm) => vm.password && vm.$refs.form && vm.$refs.form.validate(),
  },
  methods: {
    forceRerender() {
      // This is used to refresh the form, instead of leaving it frozen after a re-used password
      this.wizardKey += 1
    },
    async save() {
      if (this.$refs.form.validate()) {
        try {
          await this.$API.put('password/assess', {
            password: this.password,
          })

          this.$root.$data.password = this.password

          this.$router.push('/password/confirm')
        } catch (e) {
          this.errors.push(this.$vuetify.lang.t('$vuetify.password.create.noGood'))

          this.password = ''

          if (e.code === 1554734183) {
            window.gtag('event', 'pwned', {
              event_category: 'password',
              event_label: 'Password Compromise Detected',
            })
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
      // This is used to refresh the form, instead of leaving it frozen after a re-used password
      if (this.password == '') {
        this.forceRerender()
      }

      if (this.isGood) {
        this.errors.splice(0)
      }
    },
  },
}

const required = (v, vm) => !!v || vm.$vuetify.lang.t('$vuetify.password.create.required')
const minLength = (v, vm) =>
  v.length >= vm.$root.idpConfig.passwordRules.minLength ||
  vm.$vuetify.lang.t('$vuetify.password.create.tooShort', vm.$root.idpConfig.passwordRules.minLength)
const maxLength = (v, vm) =>
  v.length < vm.$root.idpConfig.passwordRules.maxLength ||
  vm.$vuetify.lang.t('$vuetify.password.create.tooLong', vm.$root.idpConfig.passwordRules.maxLength)
const strong = (v, vm) =>
  vm.strength.score >= vm.$root.idpConfig.passwordRules.minScore ||
  vm.$vuetify.lang.t('$vuetify.password.create.tooWeak')
</script>

<style>
.password {
  display: flex;
}
.eye {
  margin-top: 0.75rem;
}
</style>
