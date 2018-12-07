<template>
  <ProfileWizard>
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.password.create.header', $config.idpName) }}
      </template>

      <v-form @submit.prevent="save" ref="form">
        <BaseTextField 
          type="password" 
          :label="$vuetify.t('$vuetify.password.create.pwInput', $config.idpName)" 
          v-model="password" 
          :rules="rules" 
          validate-on-blur 
          autofocus />

        <v-alert v-if="password" :value="showFeedback" :type="strength.feedback.warning ? 'error' : 'info'" outline>
          <header class="body-2">
            {{ strength.feedback.warning }}
          </header>
          
          <ul>
            <li v-for="suggestion in strength.feedback.suggestions" :key="suggestion">
              {{ suggestion }}
            </li>
          </ul>

          <footer class="layout row align-center justify-end">
            <a href="https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/wheeler" target="_blank" class="caption">
              {{ $vuetify.t('$vuetify.global.learnMore') }}
            </a>
          </footer>
        </v-alert>
      </v-form>
    </BasePage>

    <template slot="actions">
      <v-btn to="/profile/intro" flat tabindex="-1">
        {{ $vuetify.t('$vuetify.global.button.back') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn @click="save" color="primary" flat>
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
    ProfileWizard
  },
  data: vm => ({
    password: vm.$root.$data.password || '',
    rules: [
      v => required(v, vm),
      v => minLength(v, vm),
      v => maxLength(v, vm),
      v => strong(v, vm)
    ]
  }),
  computed: {
    strength: vm => zxcvbn(vm.password),
    showFeedback: vm =>
      vm.strength.feedback.warning || vm.strength.feedback.suggestions.length
  },
  methods: {
    save: function() {
      if (this.$refs.form.validate()) {
        this.$root.$data.password = this.password

        this.$router.push('/password/confirm')
      }
    }
  }
}

const required = (v, vm) =>
  !!v || vm.$vuetify.t('$vuetify.password.create.required')

const minLength = (v, vm) =>
  v.length > vm.$config.password.minLength.value ||
  vm.$vuetify.t(
    '$vuetify.password.create.tooShort',
    vm.$config.password.minLength.value
  )

const maxLength = (v, vm) =>
  v.length < vm.$config.password.maxLength.value ||
  vm.$vuetify.t(
    '$vuetify.password.create.tooLong',
    vm.$config.password.maxLength.value
  )

const strong = (v, vm) =>
  vm.strength.score >= vm.$config.password.zxcvbn.minScore ||
  vm.$vuetify.t('$vuetify.password.create.tooWeak')
</script>
