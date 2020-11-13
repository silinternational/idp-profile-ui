<template>
  <v-card class="fill-height layout column">
    <v-card-title primary-title>
      <h3 class="headline">{{ $vuetify.lang.t('$vuetify.profile.index.passwordRecoveryCard.title') }}</h3>

      <v-spacer />

      <v-tooltip v-if="hasUnverifiedEmails" right>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" x-large color="error">error</v-icon>
        </template>

        {{ $vuetify.lang.t('$vuetify.profile.index.passwordRecoveryCard.unverifiedEmails') }}
      </v-tooltip>
    </v-card-title>
    
    <v-card-text class="grow">
      <div v-for="method in methods" :key="method.id">
        {{ method.value }}

        <v-tooltip v-if="! method.verified && method.id != sent" right>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" color="error" small class="pl-1">error</v-icon>
          </template>

          {{ $vuetify.lang.t('$vuetify.profile.index.passwordRecoveryCard.unverified') }}
        </v-tooltip>

        <a v-if="! method.verified && method.id != sent" @click="resend(method)" class="caption pl-2">
          {{ $vuetify.lang.t('$vuetify.profile.index.passwordRecoveryCard.resend') }}
        </a>
      </div>
      <div v-if="! methods.length" class="layout row align-center">
        <v-icon x-large color="warning" class="pr-3">warning</v-icon>
        <em>{{ $vuetify.lang.t('$vuetify.profile.index.passwordRecoveryCard.warning') }}</em>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>

      <v-btn :href="'#/password/recovery'" color="primary" text outlined>
        <span v-if="methods.length">{{ $vuetify.lang.t('$vuetify.global.button.change') }}</span>
        <span v-else>{{ $vuetify.lang.t('$vuetify.global.button.add') }}</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['methods'],
  data: () => ({
    sent: ''
  }),
  computed: {
    hasUnverifiedEmails: vm => vm.methods.some(m => ! m.verified),
  },
  methods: {
    async resend(method) {
      await this.$API.put(`method/${method.id}/resend`)

      this.sent = method.id
    }
  }
}
</script>
