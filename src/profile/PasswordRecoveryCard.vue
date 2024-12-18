<template>
  <v-card class="fill-height d-flex flex-column">
    <v-card-title primary-title>
      <h3 class="headline">{{ $t('profile.index.passwordRecoveryCard.title') }}</h3>

      <v-spacer />

      <v-tooltip v-if="hasUnverifiedEmails" right>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" x-large color="error">mdi-alert-circle</v-icon>
        </template>

        {{ $t('profile.index.passwordRecoveryCard.unverifiedEmails') }}
      </v-tooltip>
    </v-card-title>

    <v-card-text class="flex-grow-1">
      <div v-for="method in methods" :key="method.id">
        {{ method.value }}

        <v-tooltip v-if="!method.verified && method.id != sent" right>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" color="error" small class="pl-1">mdi-alert-circle</v-icon>
          </template>

          {{ $t('profile.index.passwordRecoveryCard.unverified') }}
        </v-tooltip>

        <a v-if="!method.verified && method.id != sent" @click="resend(method)" class="caption float-right pl-2">
          {{ $t('profile.index.passwordRecoveryCard.resend') }}
        </a>
      </div>
      <v-row v-if="!methods.length">
        <v-col cols="auto">
          <v-icon x-large color="warning">mdi-alert</v-icon>
        </v-col>
        <v-col>
          <em>{{ $t('profile.index.passwordRecoveryCard.warning') }}</em>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn :href="'#/password/recovery'" color="primary" outlined>
        <span v-if="methods.length">{{ $t('global.button.change') }}</span>
        <span v-else>{{ $t('global.button.add') }}</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['methods'],
  data: () => ({
    sent: '',
  }),
  computed: {
    hasUnverifiedEmails: (vm) => vm.methods.some((m) => !m.verified),
  },
  methods: {
    async resend(method) {
      await this.$API.put(`method/${method.id}/resend`)

      this.sent = method.id
    },
  },
}
</script>
