<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template v-slot:header>{{ $vuetify.lang.t('$vuetify.password.recovery.header') }}</template>

      <p>{{ $vuetify.lang.t('$vuetify.password.recovery.explanation') }}</p>

      <p v-if="alternates.length">{{ $vuetify.lang.t('$vuetify.password.recovery.atLeastOneRecovery') }}</p>
      <p v-else>{{ $vuetify.lang.t('$vuetify.password.recovery.info', primary.value) }}</p>

      <p v-if="! alternates.length">
        {{ $vuetify.lang.t('$vuetify.password.recovery.advice') }}
      </p>

      <ul>
        <li class="subtitle-1 grey--text py-2">{{ $vuetify.lang.t('$vuetify.password.recovery.personalHeader') }}</li>

        <li v-for="method in alternates" :key="method.id" class="d-flex pb-2 pl-4">
          {{ method.value }}
          <v-tooltip :disabled="alternates.length > 1" right>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-icon @click.once="remove(method.id)" :disabled="alternates.length == 1" color="error" small class="pl-4">
                  mdi-delete
                </v-icon>
              </div>
            </template>

            {{ $vuetify.lang.t('$vuetify.password.recovery.dontRemoveLastOne') }}
          </v-tooltip>
        </li>
        <li v-if="! alternates.length" class="pl-4">
          <em>{{ $vuetify.lang.t('$vuetify.password.recovery.noPersonalMethods') }}</em>
        </li>
      </ul>

      <v-form @submit.prevent="add" ref="form" class="d-flex pa-4">
        <BaseTextField type="email" :label="$vuetify.lang.t('$vuetify.password.recovery.emailInput')" v-model="newEmail"
          :rules="[
            // this field is never required so it must either be empty or hold a VALID email (W3C's HTML5 type=email regex)
            v => /^$|^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || $vuetify.lang.t('$vuetify.password.recovery.invalidEmail')
          ]" validate-on-blur @keyup.enter="blur" autofocus />

        <v-btn @click="add" :disabled="! newEmail" fab small color="success" class="ma-2-mod ml-4">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-form>
    </BasePage>

    <template v-slot:actions>
      <v-btn v-if="! alternates.length" to="/2sv/intro" @click.once="skip" color="warning" outlined>
        {{ $vuetify.lang.t('$vuetify.global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-tooltip :disabled="!(unsaved || ! alternates.length)" right>
        <template v-slot:activator="{ on }">
          <div v-on="on">
            <v-btn @click.once="complete" :disabled="unsaved || ! alternates.length" color="primary" outlined>
              {{ $vuetify.lang.t('$vuetify.global.button.continue') }}
            </v-btn>
          </div>
        </template>
        
        <span v-if="unsaved">{{ $vuetify.lang.t('$vuetify.password.recovery.unsaved') }}</span>
        <span v-else>{{ $vuetify.lang.t('$vuetify.password.recovery.advice') }}</span>
      </v-tooltip>
    </template>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard'
import { recoveryMethods, add, retrieve, remove } from '@/global/recoveryMethods';

export default {
  components: {
    ProfileWizard,
  },
  data: () => ({
    newEmail: '',
    system: recoveryMethods.system,
    alternates: recoveryMethods.alternates,
  }),
  computed: {
    unsaved: vm => vm.newEmail != '',
    primary: vm => vm.system.find(m => m.type == 'primary') || {},
  },
  methods: {
    async add() {
      if (this.$refs.form.validate()) {
        await add(this.newEmail)

        this.newEmail = ''

        this.$root.$emit('clear-messages')  // listener in App.vue (this is a temporary hack hopefully)
      }
    },
    remove,
    blur(event) {
      event.target.blur()
      event.target.focus()
    },
    skip() {
      this.$refs.wizard.skipped()
      this.$refs.wizard.next()
    },
    complete() {
      this.$refs.wizard.completed()
      this.$refs.wizard.next()
    },
  },
}
</script>

<style scoped>
li {
  list-style-type: none;
}

/* couldn't get input and button vertically aligned using flex alone */
form > button.ma-2-mod {
  margin-top: 10px !important;
}
</style>
