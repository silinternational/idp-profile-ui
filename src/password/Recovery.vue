<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template slot="header">{{ $vuetify.t('$vuetify.password.recovery.header') }}</template>

      <p>{{ $vuetify.t('$vuetify.password.recovery.explanation') }}</p>

      <p v-if="$user.recoveryMethods.personal.length">{{ $vuetify.t('$vuetify.password.recovery.atLeastOneRecovery') }}</p>
      <p v-else>{{ $vuetify.t('$vuetify.password.recovery.advice') }}</p>

      <ul>
        <li class="subheading grey--text py-2">{{ $vuetify.t('$vuetify.password.recovery.systemHeader') }}</li>
        <li v-for="method in $user.recoveryMethods.builtIn" :key="method.type" class="pl-3">{{ method.value }}</li>
      </ul>

      <ul>
        <li class="subheading grey--text py-2">{{ $vuetify.t('$vuetify.password.recovery.personalHeader') }}</li>
        <li v-for="method in $user.recoveryMethods.personal" :key="method.id" class="layout row pb-2 pl-3">
          {{ method.value }}
          <v-tooltip :disabled="$user.recoveryMethods.personal.length > 1" right>
            <v-icon @click="remove(method.id)" slot="activator" :disabled="$user.recoveryMethods.personal.length == 1"
                    color="error" small class="pl-3">
              delete
            </v-icon>
            {{ $vuetify.t('$vuetify.password.recovery.dontRemoveLastOne') }}
          </v-tooltip>
        </li>
        <li v-if="! $user.recoveryMethods.personal.length" class="pl-3">
          <em>{{ $vuetify.t('$vuetify.password.recovery.noPersonalMethods') }}</em>
        </li>
      </ul>

      <v-form @submit.prevent="add" ref="form" class="layout row pa-3">
        <BaseTextField type="email" :label="$vuetify.t('$vuetify.password.recovery.emailInput')" v-model="newEmail"
          :rules="[
            // this field is never required so it must either be empty or hold a VALID email (W3C's HTML5 type=email regex)
            v => /^$|^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || $vuetify.t('$vuetify.password.recovery.invalidEmail')
          ]" validate-on-blur @keyup.enter="blur" autofocus />

        <v-btn @click="add" color="success" icon class="ma-2-mod ml-3">
          <v-icon>add</v-icon>
        </v-btn>
      </v-form>
    </BasePage>

    <template slot="actions">
      <v-btn v-if="!$user.recoveryMethods.personal.length" to="/2sv/intro" @click="$refs.wizard.skipped()"
             color="warning" flat outline>
             {{ $vuetify.t('$vuetify.global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-tooltip :disabled="!(unsaved || !$user.recoveryMethods.personal.length)" right>
        <v-btn @click="next" slot="activator" 
               :disabled="unsaved || !$user.recoveryMethods.personal.length" color="primary" flat outline>
          {{ $vuetify.t('$vuetify.global.button.continue') }}
        </v-btn>
        
        <span v-if="unsaved">{{ $vuetify.t('$vuetify.password.recovery.unsaved') }}</span>
        <span v-else>{{ $vuetify.t('$vuetify.password.recovery.advice') }}</span>
      </v-tooltip>
    </template>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from "@/profile/ProfileWizard"

export default {
  components: {
    ProfileWizard,
  },
  data: () => ({
    newEmail: '',
  }),
  computed: {
    unsaved: vm => vm.newEmail != '',
  },
  methods: {
    async add() {
      if (this.$refs.form.validate()) {
        const newMethod = await this.$API.post('method', {
          value: this.newEmail
        })

        this.newEmail = ''

        this.$user.recoveryMethods.personal.push(newMethod)
      }
    },
    async remove(id) {
      await this.$API.delete(`method/${id}`)

      const i = this.$user.recoveryMethods.personal.findIndex(m => m.id == id)
      this.$user.recoveryMethods.personal.splice(i, 1)
      
      // couldn't get reactivity system to work for this on its own.
      this.$forceUpdate()
    },
    blur(event) {
      event.target.blur()
      event.target.focus()
    },
    next() {
      this.$refs.wizard.completeAndContinue()
    },
  }
}
</script>

<style scoped>
li {
  list-style-type: none;
}

form > button.ma-2-mod {
  margin-top: 11px !important;
  margin-bottom: 11px !important;
}
</style>
