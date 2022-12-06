<template>
  <v-card class="fill-height d-flex flex-column">
    <v-card-title primary-title class="text-break">
      <v-row no-gutters align="center">
        <v-col cols="2">
          <v-icon :color="mfaKey.id ? 'success' : ''" x-large>mdi-key</v-icon>
        </v-col>
        <v-col class="ml-4">
          <MfaCardLabel :label="label || mfaKey.label || $vuetify.lang.t('$vuetify.profile.index.securityKeyCard.title')" 
                        :id="mfaKey.id"  :webauthnId="webauthnId" @new-label="label = $event"/>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text class="flex-grow-1">
      <Attribute v-if="mfaKey.created_utc" :name="$vuetify.lang.t('$vuetify.profile.index.securityKeyCard.created')" :value="mfaKey.created_utc | format"/>
      <v-row v-else-if="!mfaKey.id">
        <v-col cols="auto">
          <v-icon x-large color="warning" class="pr-3">mdi-alert</v-icon>
        </v-col>
        <v-col>
          <em>{{ $vuetify.lang.t('$vuetify.profile.index.securityKeyCard.warning') }}</em>
        </v-col>
      </v-row>
      <Attribute v-if="mfaKey.last_used_utc" :name="$vuetify.lang.t('$vuetify.profile.index.securityKeyCard.lastUsed')" :value="mfaKey.last_used_utc | format"/>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>

      <v-btn v-if="!isFirst && numberOfKeys === 1" :href="`#/2sv/change/${mfaKey.id}`" color="primary" outlined>
        {{ $vuetify.lang.t('$vuetify.profile.index.securityKeyCard.button.change') }}
      </v-btn>
      <v-btn v-if="isFirst" href="#/2sv/usb-security-key/intro" color="primary" outlined>
        {{ $vuetify.lang.t('$vuetify.global.button.add') }}
      </v-btn>
      <MfaCardRemove v-if="numberOfKeys > 1 && !isFirst" :id="mfaKey.id" :webauthnId="webauthnId" />
    </v-card-actions>
  </v-card>
</template>

<script>
import Attribute from './Attribute'
import MfaCardLabel from './MfaCardLabel'
import MfaCardRemove from './MfaCardRemove'

export default {
  components: {
    Attribute,
    MfaCardLabel,
    MfaCardRemove
  },
  props: ['mfaKey', 'isFirst', 'numberOfKeys', 'webauthnId'],
  data: vm => ({
    label: '',
  }),
}
</script>