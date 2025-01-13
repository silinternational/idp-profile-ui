<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template #header>
        {{ $t('password.confirm.header') }}
      </template>

      <v-form ref="form" class="pa-4" @submit.prevent="confirm">
        <p>{{ $t('password.confirm.explanation') }}</p>

        <div class="password">
          <BaseTextField
            v-model="password"
            :type="passwordIsHidden ? 'password' : 'text'"
            :label="$t('password.confirm.pwInput')"
            :rules="rules"
            :error-messages="errors"
            validate-on-blur
            autofocus
            name="password"
            @keyup.enter="blur"
          />

          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-btn v-bind="props" class="eye" icon tabindex="-1" @click="passwordIsHidden = !passwordIsHidden">
                <v-icon>{{ passwordIsHidden ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
              </v-btn>
            </template>

            <span>{{ passwordIsHidden ? 'Show' : 'Hide' }} password</span>
          </v-tooltip>
        </div>
      </v-form>
    </BasePage>

    <template #actions>
      <v-btn to="/password/create" :color="errors.length ? 'primary' : ''" tabindex="-1" variant="outlined">
        {{ $t('global.button.back') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn color="primary" :disabled="errors.length > 0" variant="outlined" @click.once="confirm">
        {{ $t('global.button.continue') }}
      </v-btn>
    </template>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard.vue'

export default {
  name: 'PasswordConfirm',
  components: {
    ProfileWizard,
  },
  beforeRouteLeave(to, from, next) {
    delete this.$root.$data.password

    next()
  },
  data: (vm) => ({
    password: '',
    passwordIsHidden: true,
    rules: [(v) => v == vm.$data.password || vm.$t('password.confirm.noMatch')],
    errors: [],
  }),
  methods: {
    async confirm() {
      if (this.$refs.form.validate()) {
        await this.$API.put('password', {
          password: this.password,
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
  margin-top: 0.75rem;
}
</style>
