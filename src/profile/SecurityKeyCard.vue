<template>
  <v-card class="fill-height d-flex flex-column">
    <v-row no-gutters align="center" class="pa-4">
      <v-col cols="2">
        <v-icon :color="webauthnKey.id ? 'success' : ''" size="x-large">mdi-key</v-icon>
      </v-col>
      <v-col class="ml-4">
        <MfaCardLabel
          :label="isSummary ? $t('profile.index.securityKeyCard.title') : label || webauthnKey.label"
          :key-id="String(webauthnKey.id)"
          :mfa-id="mfaId"
          :read-only="!!isSummary"
          is-webauthn
          @new-label="label = $event"
        />
      </v-col>
    </v-row>

    <div class="flex-grow-1 pa-4">
      <Attribute
        v-if="isSummary && numberOfKeys"
        sameline
        :name="$t('profile.index.securityKeyCard.number')"
        :value="numberOfKeys"
      />
      <Attribute
        v-if="webauthnKey.created_utc"
        :name="$t('profile.index.securityKeyCard.created')"
        :value="formatDate(webauthnKey.created_utc)"
      />
      <v-row v-else-if="!webauthnKey.id">
        <v-col cols="auto">
          <v-icon size="x-large" color="warning" class="pr-3">mdi-alert</v-icon>
        </v-col>
        <v-col>
          <em>{{ $t('profile.index.securityKeyCard.warning') }}</em>
        </v-col>
      </v-row>
      <Attribute
        v-if="webauthnKey.last_used_utc && !isSummary"
        :name="$t('profile.index.securityKeyCard.lastUsed')"
        :value="formatDate(webauthnKey.last_used_utc)"
      />
    </div>

    <template #actions>
      <v-btn v-if="numberOfKeys > 1 && isSummary" color="primary" variant="outlined" @click="$emit('toggleKeys')">
        {{ keyBtnLabel }}
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="isSummary || numberOfKeys === 1"
        href="#/2sv/usb-security-key/intro"
        color="primary"
        variant="outlined"
      >
        {{ $t('global.button.add') }}
      </v-btn>
      <MfaCardRemove v-if="numberOfKeys >= 1 && !isSummary" :key-id="webauthnKey.id" :mfa-id="mfaId" />
    </template>
  </v-card>
</template>

<script>
import Attribute from './Attribute.vue'
import { formatDate } from '@/global/filters'
import MfaCardLabel from './MfaCardLabel.vue'
import MfaCardRemove from './MfaCardRemove.vue'

export default {
  components: {
    Attribute,
    MfaCardLabel,
    MfaCardRemove,
  },
  props: {
    webauthnKey: {
      type: Object,
      required: true,
    },
    isSummary: Boolean,
    numberOfKeys: {
      type: Number,
      default: 0,
    },
    mfaId: {
      type: String,
      default: '',
    },
    showKeys: Boolean,
  },
  emits: ['toggleKeys'],
  data: (vm) => ({
    label: '',
  }),
  computed: {
    keyBtnLabel() {
      return this.showKeys
        ? this.$t('profile.index.securityKeyCard.hide')
        : this.$t('profile.index.securityKeyCard.show')
    },
  },
  methods: {
    formatDate,
  },
}
</script>
