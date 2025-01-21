<template>
  <v-card class="fill-height d-flex flex-column">
    <v-card-title primary-title class="d-flex align-center">
      <h3 class="text-h5">{{ $t('profile.index.passwordRecoveryCard.title') }}</h3>

      <v-spacer />

      <v-tooltip v-if="hasUnverifiedEmails" location="right">
        <template #activator="{ props }">
          <v-icon v-bind="props" size="x-large" color="error">mdi-alert-circle</v-icon>
        </template>

        {{ $t('profile.index.passwordRecoveryCard.unverifiedEmails') }}
      </v-tooltip>
    </v-card-title>

    <v-card-text class="flex-grow-1">
      <div v-for="method in methods" :key="method.id" class="d-flex justify-space-between align-center">
        <div>
          {{ method.value }}

          <v-tooltip v-if="!method.verified && method.id != sent" location="right">
            <template #activator="{ props }">
              <v-icon v-bind="props" color="error" size="small" class="pl-1">mdi-alert-circle</v-icon>
            </template>

            {{ $t('profile.index.passwordRecoveryCard.unverified') }}
          </v-tooltip>
        </div>

        <v-btn
          v-if="!method.verified && method.id != sent"
          variant="text"
          color="primary"
          density="compact"
          class="text-caption float-right pl-2"
          @click="resend(method)"
        >
          {{ $t('profile.index.passwordRecoveryCard.resend') }}
        </v-btn>
      </div>
      <v-row v-if="!methods.length">
        <v-col cols="auto">
          <v-icon size="x-large" color="warning">mdi-alert</v-icon>
        </v-col>
        <v-col>
          <em>{{ $t('profile.index.passwordRecoveryCard.warning') }}</em>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn :href="'#/password/recovery'" color="primary" variant="outlined">
        <span v-if="methods.length">{{ $t('global.button.change') }}</span>
        <span v-else>{{ $t('global.button.add') }}</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    methods: {
      type: Array,
      required: true,
    },
  },
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
