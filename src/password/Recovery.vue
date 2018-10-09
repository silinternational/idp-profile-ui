<template>
  <ProfileProgress>
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.password.recovery.header') }}
      </template>

      <p>
        {{ $vuetify.t('$vuetify.password.recovery.explanation') }}
      </p>

      <p v-if="methods.length">
        {{ $vuetify.t('$vuetify.password.recovery.atLeastOneRecovery') }}
      </p>
      <p v-else>
        {{ $vuetify.t('$vuetify.password.recovery.advice') }}
      </p>
      
      <ul class="body-2">
        <li v-for="(method, i) in methods" :key="i" class="layout row pb-2">
          {{ method.email }}

          <v-tooltip :disabled="methods.length > 1" right>
            <v-icon @click="remove(i)" slot="activator" :disabled="methods.length == 1" color="error" small class="pl-3">delete</v-icon>
            {{ $vuetify.t('$vuetify.password.recovery.dontRemoveLastOne') }}
          </v-tooltip>
        </li>
      </ul>

      <v-form @submit.prevent="add" ref="form" class="layout row pa-3">
        <!-- TODO: "bug" still when a user hits enter and there's a validation error, the form will not mark itself invalid -->
        <BaseTextField
          type="email"
          :label="$vuetify.t('$vuetify.password.recovery.emailInput')" 
          v-model="newEmail"
          :rules="[
            // W3C's HTML5 type=email regex
            v => /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || $vuetify.t('$vuetify.password.recovery.invalidEmail')
          ]"
          validate-on-blur
          autofocus />
      
        <v-btn @click="add" color="success" icon class="ma-2-mod ml-3">
          <v-icon>add</v-icon>
        </v-btn>
      </v-form>
    </BasePage>

    <ButtonBar>
      <v-btn v-if="!methods.length" to="/2sv/intro" color="warning" flat>
        {{ $vuetify.t('$vuetify.global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-tooltip :disabled="!(unsaved || !methods.length)" right>
        <v-btn to="/2sv/intro" slot="activator" :disabled="unsaved || !methods.length" color="primary" flat>
          {{ $vuetify.t('$vuetify.global.button.continue') }}
        </v-btn>
        <span v-if="unsaved">{{ $vuetify.t('$vuetify.password.recovery.unsaved') }}</span>
        <span v-else>{{ $vuetify.t('$vuetify.password.recovery.advice') }}</span>
      </v-tooltip>
    </ButtonBar>
  </ProfileProgress>
</template>

<script>
import ProfileProgress from '@/profile/ProfileProgress';

export default {
  components: {
    ProfileProgress
  },
  data: () => ({
    methods: [],
    newEmail: ''
  }),
  computed: {
    unsaved: vm => vm.newEmail != ''
  },
  async created() {
    this.methods = await this.$API.fake([
      {
        email: 'YHWH@example.org'
      }
    ]);
  },
  methods: {
    add: async function() {
      if (this.$refs.form.validate()) {
        this.methods.push(
          await this.$API.fake({
            email: this.newEmail
          })
        );

        this.newEmail = '';
      }
    },
    remove: async function(i) {
      this.methods.splice(await this.$API.fake(i), 1);
    }
  }
};
</script>

<style scoped>
li {
  list-style-type: none;
}
/* had to modify vuetify's ma-2 in order to vertically center the icon button on the "outlined" version of the text-field */
.ma-2-mod {
  margin-top: 11px !important;
  margin-bottom: 11px !important;
}
</style>
