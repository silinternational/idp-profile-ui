<template>
  <ProfileWizard ref="wizard" :key="wizardKey">
    <BasePage>
      <template #header>
        {{ $t('password.create.header', $idpConfig.idpName) }}
      </template>

      <v-form ref="form" @submit.prevent="save">
        <p>
          {{ $t('password.create.username', $idpConfig.idpName) }}
          <strong class="text-body-2">{{ $user.idp_username }}</strong>
        </p>

        <div class="password">
          <BaseTextField
            v-model="password"
            :type="passwordIsHidden ? 'password' : 'text'"
            :label="$t('password.create.pwInput')"
            :rules="rules"
            :error-messages="errors"
            validate-on-input
            autofocus
            name="password"
            @keyup.enter="blur"
          />

          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-btn class="eye" icon tabindex="-1" v-bind="props" @click="passwordIsHidden = !passwordIsHidden">
                <v-icon>{{ passwordIsHidden ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
              </v-btn>
            </template>
            <span>{{ passwordIsHidden ? 'Show' : 'Hide' }} password</span>
          </v-tooltip>
        </div>

        <v-alert
          :value="!!(showFeedback && password)"
          :type="strength.feedback.warning ? 'error' : 'info'"
          variant="outlined"
        >
          <header class="text-body-2">
            {{ strength.feedback.warning }}
          </header>

          <ul>
            <li v-for="suggestion in strength.feedback.suggestions" :key="suggestion">
              {{ suggestion }}
            </li>
          </ul>

          <footer class="d-flex align-center justify-end">
            <a
              href="https://idphelp.sil.org/logging-in/password/password-recommendations"
              target="_blank"
              class="text-caption"
            >
              {{ $t('global.learnMore') }}
            </a>
          </footer>
        </v-alert>

        <v-alert :value="!!isGood" type="success" variant="outlined">
          <header class="text-body-2">
            {{ $t('password.create.goodPassword') }}
          </header>
        </v-alert>
      </v-form>
    </BasePage>

    <template #actions>
      <v-btn v-if="$user.isNew()" to="/profile/intro" tabindex="-1" variant="outlined">
        {{ $t('global.button.back') }}
      </v-btn>
      <v-btn v-else tabindex="-1" variant="outlined" @click.once="skip">
        {{ $t('global.button.skip') }}
      </v-btn>

      <v-spacer />

      <v-btn color="primary" variant="outlined" @click.once="save">
        {{ $t('global.button.continue') }}
      </v-btn>
    </template>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard.vue'
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core'
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en'

export default {
  name: 'CreatePassword',
  components: {
    ProfileWizard,
  },
  data: (vm) => ({
    wizardKey: 0, // This is used to refresh the form, instead of leaving it frozen after a re-used password
    password: vm.$root.$data.password || '',
    passwordIsHidden: true,
    rules: [
      (v) => required(v, vm),
      (v) => minLength(v, vm),
      (v) => maxLength(v, vm),
      (v) => strong(v, vm),
      (v) => requireAlphaAndNumeric(v, vm),
    ],
    errors: [],
  }),
  computed: {
    strength: (vm) => zxcvbn(vm.password),
    showFeedback: (vm) => vm.strength.feedback.warning || vm.strength.feedback.suggestions.length,
    isGood: (vm) => vm.password && vm.$refs.form && vm.$refs.form.validate(),
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
          this.errors.push(this.$t('password.create.noGood'))

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
}

const required = (v, vm) => !!v || vm.$t('password.create.required')
const minLength = (v, vm) =>
  v.length >= vm.$idpConfig.passwordRules.minLength ||
  vm.$t('password.create.tooShort', vm.$idpConfig.passwordRules.minLength)
const maxLength = (v, vm) =>
  v.length < vm.$idpConfig.passwordRules.maxLength ||
  vm.$t('password.create.tooLong', vm.$idpConfig.passwordRules.maxLength)
const strong = (v, vm) => vm.strength.score >= vm.$idpConfig.passwordRules.minScore || vm.$t('password.create.tooWeak')
const requireAlphaAndNumeric = (v, vm) =>
  !vm.$idpConfig.passwordRules.requireAlphaAndNumeric ||
  (/\p{L}/u.test(vm.password) && /\p{N}/u.test(vm.password)) ||
  vm.$t('password.create.requireAlphaAndNumeric')
const options = {
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
  translations: zxcvbnEnPackage.translations,
}

zxcvbnOptions.setOptions(options)
</script>

<style>
.password {
  display: flex;
}
.eye {
  margin-top: 0.75rem;
}
</style>
