<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.password.recovery.header') }}
      </template>

      <p>
        {{ $vuetify.t('$vuetify.password.recovery.explanation') }}
      </p>

      <p v-if="methods.personal.length">
        {{ $vuetify.t('$vuetify.password.recovery.atLeastOneRecovery') }}
      </p>
      <p v-else>
        {{ $vuetify.t('$vuetify.password.recovery.advice') }}
      </p>
      
      <ul>
        <li class="subheading grey--text py-2">{{ $vuetify.t('$vuetify.password.recovery.systemHeader') }}</li>
        <li v-for="method in methods.builtIn" :key="method.type" class="pl-3">
          {{ method.value }}
        </li>
      </ul>

      <ul>
        <li class="subheading grey--text py-2">
          {{ $vuetify.t('$vuetify.password.recovery.personalHeader') }}
        </li>
        <li v-for="method in methods.personal" :key="method.id" class="layout row pb-2 pl-3">
          {{ method.value }}

          <v-tooltip :disabled="methods.personal.length > 1" right>
            <v-icon @click="remove(method.id)" slot="activator" :disabled="methods.personal.length == 1" color="error" small class="pl-3">
              delete
            </v-icon>
            {{ $vuetify.t('$vuetify.password.recovery.dontRemoveLastOne') }}
          </v-tooltip>
        </li>
        <li v-if="! methods.personal.length" class="pl-3">
          <em>{{ $vuetify.t('$vuetify.password.recovery.noPersonalMethods') }}</em>
        </li>
      </ul>

      <v-form @submit.prevent="add" ref="form" class="layout row pa-3">
        <!-- TODO: "bug" still when a user hits enter and there's a validation error, the form will not mark itself invalid -->
        <BaseTextField
          type="email"
          :label="$vuetify.t('$vuetify.password.recovery.emailInput')" 
          v-model="newEmail"
          :rules="[
            // this field is never required so it must either be empty or hold a VALID email (W3C's HTML5 type=email regex)
            v => /^$|^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || $vuetify.t('$vuetify.password.recovery.invalidEmail')
          ]"
          validate-on-blur
          autofocus />
      
        <v-btn @click="add" color="success" icon class="ma-2-mod ml-3">
          <v-icon>add</v-icon>
        </v-btn>
      </v-form>
    </BasePage>

    <template slot="actions">
      <v-btn v-if="!methods.personal.length" to="/2sv/intro" @click="$refs.wizard.skipped()" color="warning" flat>
        {{ $vuetify.t('$vuetify.global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-tooltip :disabled="!(unsaved || !methods.personal.length)" right>
        <v-btn to="/2sv/intro" 
               @click="$refs.wizard.complete()" 
               slot="activator" 
               :disabled="unsaved || !methods.personal.length" 
               color="primary" 
               flat>
          {{ $vuetify.t('$vuetify.global.button.continue') }}
        </v-btn>
        <span v-if="unsaved">{{ $vuetify.t('$vuetify.password.recovery.unsaved') }}</span>
        <span v-else>{{ $vuetify.t('$vuetify.password.recovery.advice') }}</span>
      </v-tooltip>
    </template>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard';

export default {
  components: {
    ProfileWizard
  },
  data: () => ({
    methods: {
      builtIn: [],
      personal: []
    },
    newEmail: ''
  }),
  computed: {
    unsaved: vm => vm.newEmail != ''
  },
  async created() {
    const all = await this.$API.get('method');

    all.reduce((methods, m) => {
      // no need to worry whether methods are verified or not in this context, that's addressed on the profile page.
      m.type == 'email' ? methods.personal.push(m) : methods.builtIn.push(m);

      return methods;
    }, this.methods);
  },
  methods: {
    add: async function() {
      if (this.$refs.form.validate()) {
        const newMethod = await this.$API.post('method', {
          value: this.newEmail
        });

        this.newEmail = '';

        this.methods.personal.push(newMethod);
      }
    },
    remove: async function(id) {
      await this.$API.delete(`method/${id}`);

      const i = this.methods.personal.findIndex(m => m.id == id);

      this.methods.personal.splice(i, 1);
    }
  }
};
</script>

<style scoped>
li {
  list-style-type: none;
}
</style>
