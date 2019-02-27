<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template slot="header">{{ $vuetify.t('$vuetify.password.recovery.header') }}</template>

      <p>{{ $vuetify.t('$vuetify.password.recovery.explanation') }}</p>

      <p v-if="alternates.length">{{ $vuetify.t('$vuetify.password.recovery.atLeastOneRecovery') }}</p>
      <p v-else>
        {{ $vuetify.t('$vuetify.password.recovery.info', primary.value) }}
        <span v-if="mgr.value && ! spouse.value">{{ $vuetify.t('$vuetify.password.recovery.infoWithMgrOnly', mgr.value) }}</span>
        <span v-if="mgr.value && spouse.value">{{ $vuetify.t('$vuetify.password.recovery.infoWithMgrAndSpouse', mgr.value, spouse.value) }}</span>
      </p>

      <p v-if="! alternates.length">
        {{ $vuetify.t('$vuetify.password.recovery.advice') }}
      </p>

      <ul>
        <li class="subheading grey--text py-2">{{ $vuetify.t('$vuetify.password.recovery.personalHeader') }}</li>

        <li v-for="method in alternates" :key="method.id" class="layout row pb-2 pl-3">
          {{ method.value }}
          <v-tooltip :disabled="alternates.length > 1" right>
            <v-icon @click="remove(method.id)" slot="activator" :disabled="alternates.length == 1" color="error" small class="pl-3">
              delete
            </v-icon>
            {{ $vuetify.t('$vuetify.password.recovery.dontRemoveLastOne') }}
          </v-tooltip>
        </li>
        <li v-if="! alternates.length" class="pl-3">
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
      <v-btn v-if="! alternates.length" to="/2sv/intro" @click="skip"
             color="warning" flat outline>
        {{ $vuetify.t('$vuetify.global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-tooltip :disabled="!(unsaved || ! alternates.length)" right>
        <v-btn @click="complete" slot="activator" 
               :disabled="unsaved || ! alternates.length" color="primary" flat outline>
          {{ $vuetify.t('$vuetify.global.button.continue') }}
        </v-btn>
        
        <span v-if="unsaved">{{ $vuetify.t('$vuetify.password.recovery.unsaved') }}</span>
        <span v-else>{{ $vuetify.t('$vuetify.password.recovery.advice') }}</span>
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
    alternates: recoveryMethods.alternates
  }),
  computed: {
    unsaved: vm => vm.newEmail != '',
    primary: vm => vm.system.find(m => m.type == 'primary') || {},
    mgr: vm => vm.system.find(m => m.type == 'supervisor') || {},
    spouse: vm => vm.system.find(m => m.type == 'spouse') || {},
  },
  methods: {
    async add() {
      if (this.$refs.form.validate()) {
        await add(this.newEmail)

        this.newEmail = ''
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
      this.$refs.wizard.complete()
      this.$refs.wizard.next()
    },
  },
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
