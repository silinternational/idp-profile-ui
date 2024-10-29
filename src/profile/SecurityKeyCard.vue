<template>
  <v-card class="fill-height d-flex flex-column">
    <v-card-title primary-title class="text-break">
      <v-row no-gutters align="center">
        <v-col cols="2">
          <v-icon :color="webauthnKey.id ? 'success' : ''" x-large>mdi-key</v-icon>
        </v-col>
        <v-col class="ml-4">
          <MfaCardLabel
            :label="
              isSummary ? $vuetify.lang.t('$vuetify.profile.index.securityKeyCard.title') : label || webauthnKey.label
            "
            :keyId="webauthnKey.id"
            :mfaId="mfaId"
            :readOnly="!!isSummary"
            @new-label="label = $event"
          />
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text class="flex-grow-1">
      <Attribute
        sameline
        v-if="isSummary && numberOfKeys"
        :name="$vuetify.lang.t('$vuetify.profile.index.securityKeyCard.number')"
        :value="numberOfKeys"
      />
      <Attribute
        v-if="webauthnKey.created_utc"
        :name="$vuetify.lang.t('$vuetify.profile.index.securityKeyCard.created')"
        :value="webauthnKey.created_utc | format"
      />
      <v-row v-else-if="!webauthnKey.id">
        <v-col cols="auto">
          <v-icon x-large color="warning" class="pr-3">mdi-alert</v-icon>
        </v-col>
        <v-col>
          <em>{{ $vuetify.lang.t('$vuetify.profile.index.securityKeyCard.warning') }}</em>
        </v-col>
      </v-row>
      <Attribute
        v-if="webauthnKey.last_used_utc && !isSummary"
        :name="$vuetify.lang.t('$vuetify.profile.index.securityKeyCard.lastUsed')"
        :value="webauthnKey.last_used_utc | format"
      />
    </v-card-text>

    <v-card-actions>
      <v-btn v-if="numberOfKeys > 1 && isSummary" @click="$emit('toggleKeys')" color="primary" outlined>
        {{ keyBtnLabel }}
      </v-btn>
      <v-spacer />
      <v-btn v-if="isSummary || numberOfKeys === 1" href="#/2sv/usb-security-key/intro" color="primary" outlined>
        {{ $vuetify.lang.t('$vuetify.global.button.add') }}
      </v-btn>
      <MfaCardRemove v-if="numberOfKeys >= 1 && !isSummary" :keyId="webauthnKey.id" :mfaId="mfaId" />
    </v-card-actions>
  </v-card>
</template>

<script>
import Attribute from './Attribute.vue'
import MfaCardLabel from './MfaCardLabel.vue'
import MfaCardRemove from './MfaCardRemove.vue'

export default {
  components: {
    Attribute,
    MfaCardLabel,
    MfaCardRemove,
  },
  props: ['webauthnKey', 'isSummary', 'numberOfKeys', 'mfaId', 'showKeys'],
  data: (vm) => ({
    label: '',
  }),
  computed: {
    keyBtnLabel() {
      return this.showKeys
        ? this.$vuetify.lang.t('$vuetify.profile.index.securityKeyCard.hide')
        : this.$vuetify.lang.t('$vuetify.profile.index.securityKeyCard.show')
    },
  },
}
</script>
