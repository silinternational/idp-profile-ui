<template>
  <v-card class="fill-height layout column">
    <v-card-title primary-title>
      <h3 class="headline">{{ $vuetify.t('$vuetify.profile.index.passwordRecoveryCard.title') }}</h3>

      <v-spacer />

      <v-tooltip v-if="hasUnverifiedEmails" right>
        <v-icon slot="activator" x-large color="warning">warning</v-icon>
        {{ $vuetify.t('$vuetify.profile.index.passwordRecoveryCard.unverifiedEmails') }}
      </v-tooltip>
    </v-card-title>
    
    <v-card-text class="grow">
      <div v-for="method in methods" :key="method.id">
        {{ method.value }}
        <v-tooltip v-if="! method.verified && method.id != sent" right>
          <v-icon slot="activator" color="warning" small class="pl-1">warning</v-icon>
          {{ $vuetify.t('$vuetify.profile.index.passwordRecoveryCard.unverified') }}
        </v-tooltip>

        <a
          v-if="! method.verified && method.id != sent"
          @click="resend(method)"
          class="caption pl-2"
        >{{ $vuetify.t('$vuetify.profile.index.passwordRecoveryCard.resend') }}</a>
      </div>
      <div v-if="! methods.length" class="layout row align-center">
        <v-icon x-large color="warning" class="pr-3">warning</v-icon>
        <em>{{ $vuetify.t('$vuetify.profile.index.passwordRecoveryCard.warning') }}</em>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>

      <v-btn :href="'/password/recovery'" color="primary" flat outline>
        <span v-if="methods.length">{{ $vuetify.t('$vuetify.global.button.change') }}</span>
        <span v-else>{{ $vuetify.t('$vuetify.global.button.add') }}</span>
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
