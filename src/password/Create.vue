<template>
  <ProfileWizard>
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.password.create.header', $root.idpConfig.idpName) }}
      </template>

      <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/WTMZYuoztoM?rel=0" 
              frameborder="0" allow="autoplay; encrypted-media;" allowfullscreen class="pa-3" /> -->

      <v-form @submit.prevent="save" ref="form">
        <p>{{ $vuetify.t('$vuetify.password.create.username', $root.idpConfig.idpName) }} <strong class="body-2">{{ $user.idp_username }}</strong></p>

        <BaseTextField type="password" :label="$vuetify.t('$vuetify.password.create.pwInput')" v-model="password" 
                       :rules="rules" validate-on-blur @keyup.enter="blur" autofocus />

        <v-alert v-if="password" :value="showFeedback" :type="strength.feedback.warning ? 'error' : 'info'" outline>
          <header class="body-2">{{ strength.feedback.warning }}</header>
          
          <ul>
            <li v-for="suggestion in strength.feedback.suggestions" :key="suggestion">{{ suggestion }}</li>
          </ul>

          <footer class="layout row align-center justify-end">
            <a href="https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/wheeler" target="_blank" class="caption">
              {{ $vuetify.t('$vuetify.global.learnMore') }}
            </a>
          </footer>
        </v-alert>

        <v-alert :value="isGood" type="success" outline>
          <header class="body-2">{{ $vuetify.t('$vuetify.password.create.goodPassword') }}</header>
        </v-alert>
      </v-form>
    </BasePage>

    <template slot="actions">
      <v-btn v-if="$user.auth_type == 'login'" to="/profile/intro" flat tabindex="-1" outline>
        {{ $vuetify.t('$vuetify.global.button.back') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn @click="save" color="primary" flat outline>
        {{ $vuetify.t('$vuetify.global.button.continue') }}
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
      v => strong(v, vm)
    ],
  }),
  computed: {
    strength: vm => zxcvbn(vm.password),
    showFeedback: vm =>
      vm.strength.feedback.warning || vm.strength.feedback.suggestions.length,
    isGood: vm => vm.password && vm.$refs.form && vm.$refs.form.validate()
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        this.$root.$data.password = this.password

        this.$router.push('/password/confirm')
      }
    },
    blur(event) {
      event.target.blur()
    },
  }
}

const required = (v, vm) =>
  !!v || vm.$vuetify.t('$vuetify.password.create.required')

const minLength = (v, vm) =>
  v.length >= vm.$root.idpConfig.passwordRules.minLength ||
  vm.$vuetify.t(
    '$vuetify.password.create.tooShort',
    vm.$root.idpConfig.passwordRules.minLength
  )

const maxLength = (v, vm) =>
  v.length < vm.$root.idpConfig.passwordRules.maxLength ||
  vm.$vuetify.t(
    '$vuetify.password.create.tooLong',
    vm.$root.idpConfig.passwordRules.maxLength
  )

const strong = (v, vm) =>
  vm.strength.score >= vm.$root.idpConfig.passwordRules.minScore ||
  vm.$vuetify.t('$vuetify.password.create.tooWeak')
</script>
