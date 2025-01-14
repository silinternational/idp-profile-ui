<template>
  <v-card class="fill-height d-flex flex-column">
    <v-row no-gutters align="center" class="pa-4">
      <v-col cols="2">
        <v-icon :color="meta.created_utc ? 'success' : ''" size="x-large"> mdi-format-list-checkbox </v-icon>
      </v-col>
      <v-col class="ml-4">
        <MfaCardLabel :label="label" :mfa-id="String(meta.id)" read-only />
      </v-col>
    </v-row>

    <div class="flex-grow-1 pa-4">
      <Attribute
        v-if="meta.created_utc"
        :name="$t('profile.index.codeCard.created')"
        :value="formatDate(meta.created_utc)"
      />
      <Attribute
        v-if="meta.last_used_utc"
        :name="$t('profile.index.codeCard.lastUsed')"
        :value="formatDate(meta.last_used_utc)"
      />
      <Attribute
        v-if="meta.created_utc"
        :name="$t('profile.index.codeCard.remaining')"
        :value="String(meta.data.count)"
        sameline
      />
      <v-row v-else>
        <v-col cols="auto">
          <v-icon size="x-large" color="warning" class="pr-3">mdi-alert</v-icon>
        </v-col>
        <v-col>
          <em>{{ $t('profile.index.codeCard.warning') }}</em>
        </v-col>
      </v-row>
    </div>

    <template #actions>
      <v-spacer />

      <v-btn v-if="meta.created_utc" href="#/2sv/printable-backup-codes/new" color="primary" variant="outlined">
        {{ $t('profile.index.codeCard.button.replace') }}
      </v-btn>
      <v-btn v-else href="#/2sv/printable-backup-codes/intro" color="primary" variant="outlined">
        {{ $t('profile.index.codeCard.button.add') }}
      </v-btn>
      <MfaCardRemove v-if="meta.created_utc" :mfa-id="String(meta.id)" />
    </template>
  </v-card>
</template>

<script>
import { formatDate } from '@/global/filters'
import Attribute from './Attribute.vue'
import MfaCardLabel from './MfaCardLabel.vue'
import MfaCardRemove from './MfaCardRemove.vue'

export default {
  components: {
    Attribute,
    MfaCardLabel,
    MfaCardRemove,
  },
  props: {
    meta: {
      type: Object,
      required: true,
    },
  },
  data: (vm) => ({
    label: vm.meta.label || vm.$t('profile.index.codeCard.title'),
  }),
  methods: {
    formatDate,
  },
}
</script>
