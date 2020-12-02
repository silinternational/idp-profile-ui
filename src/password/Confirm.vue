<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template v-slot:header>
        {{ $vuetify.lang.t('$vuetify.password.confirm.header') }}
      </template>

      <v-form @submit.prevent="confirm" ref="form" class="pa-4">
        <p>{{ $vuetify.lang.t('$vuetify.password.confirm.explanation') }}</p>
        
        <BaseTextField type="password" :label="$vuetify.lang.t('$vuetify.password.confirm.pwInput')" v-model="password" 
                       :rules="rules" :error-messages="errors" validate-on-blur @keyup.enter="blur" autofocus name="password" />
      </v-form>
    </BasePage>

    <template v-slot:actions>
      <v-btn to="/password/create" :color="errors.length ? 'primary' : ''" tabindex="-1" outlined>
        {{ $vuetify.lang.t('$vuetify.global.button.back') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn @click.once="confirm" color="primary" :disabled="errors.length > 0" outlined>
        {{ $vuetify.lang.t('$vuetify.global.button.continue') }}
      </v-btn>
    </template>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard'

export default {
  components: {
    ProfileWizard,
  },
  data: vm => ({
    password: '',
    rules: [
      v => v == vm.$root.$data.password || vm.$vuetify.lang.t('$vuetify.password.confirm.noMatch')
    ],
    errors: [],
  }),
  beforeRouteLeave(to, from, next) {
    delete this.$root.$data.password

    next()
  },
  methods: {
    async confirm () {
      if (this.$refs.form.validate()) {
        await this.$API.put('password', {
          password: this.password
        })

        this.$refs.wizard.completed()

        this.$router.push('/password/saved')
      }
    },
    blur(event) {
      event.target.blur()
    },
  },
}
</script>
