<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template v-slot:header>
        {{ $vuetify.lang.t('$vuetify.password.confirm.header') }}
      </template>

      <v-form @submit.prevent="confirm" ref="form" class="pa-4">
        <p>{{ $vuetify.lang.t('$vuetify.password.confirm.explanation') }}</p>

        <div class="password">
          <BaseTextField v-if="passwordIsHidden" type="password" :label="$vuetify.lang.t('$vuetify.password.confirm.pwInput')" v-model="password" 
          :rules="rules" :error-messages="errors" validate-on-blur @keyup.enter="blur" autofocus name="password" />
          
          <BaseTextField v-else type="text" :label="$vuetify.lang.t('$vuetify.password.confirm.pwInput')" v-model="password" 
          :rules="rules" :error-messages="errors" validate-on-blur @keyup.enter="blur" autofocus name="password" />
          
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-on="on" v-bind="attrs" class="eye" icon @click="passwordIsHidden = !passwordIsHidden" tabindex="-1">
                <v-icon>{{ passwordIsHidden ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
              </v-btn>
            </template>

            <span>{{passwordIsHidden ? 'Show' : 'Hide'}} password</span>
          </v-tooltip>
        </div>
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
    passwordIsHidden: true,
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

<style>
.password {
  display: flex;
}
.eye {
  margin-top: .75rem;
}
</style>
