<template>
  <v-card class="fill-height d-flex flex-column">
    <v-row no-gutters align="center" class="pa-4">
      <v-col cols="2">
        <v-icon :color="meta.created_utc ? 'success' : ''" size="x-large">mdi-cellphone</v-icon>
      </v-col>
      <v-col class="ml-4">
        <MfaCardLabel
          :label="label || meta.label || $t('profile.index.totpCard.title')"
          :mfa-id="String(meta.id)"
          :read-only="!meta.id"
          @new-label="label = $event"
        />
      </v-col>
    </v-row>

    <div class="flex-grow-1 pa-4">
      <Attribute
        v-if="meta.created_utc"
        :name="$t('profile.index.totpCard.created')"
        :value="formatDate(meta.created_utc)"
      />
      <v-row v-else>
        <v-col cols="auto">
          <v-icon size="x-large" color="warning" class="pr-3">mdi-alert</v-icon>
        </v-col>
        <v-col>
          <em>{{ $t('profile.index.totpCard.warning') }}</em>
        </v-col>
      </v-row>
      <Attribute
        v-if="meta.last_used_utc"
        :name="$t('profile.index.totpCard.lastUsed')"
        :value="formatDate(meta.last_used_utc)"
      />
    </div>

    <template #actions>
      <v-spacer />
      <v-btn v-if="meta.created_utc" :href="`#/2sv/change/${meta.id}`" color="primary" variant="outlined">
        {{ $t('profile.index.totpCard.button.change') }}
      </v-btn>
      <v-btn v-else href="#/2sv/authenticator/intro" color="primary" variant="outlined">
        {{ $t('global.button.add') }}
      </v-btn>
      <MfaCardRemove v-if="meta.created_utc" :mfa-id="String(meta.id)" />
    </template>
  </v-card>
</template>

<script setup>
import { formatDate } from '@/global/filters'
import Attribute from './Attribute.vue'
import MfaCardLabel from './MfaCardLabel.vue'
import MfaCardRemove from './MfaCardRemove.vue'
import { ref } from 'vue'

defineProps({
  meta: {
    type: Object,
    required: true,
  },
})

const label = ref('')
</script>
