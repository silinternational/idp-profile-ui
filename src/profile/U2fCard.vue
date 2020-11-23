<template>
  <v-card class="fill-height layout column">
    <v-card-title primary-title>
      <v-row>
        <v-col>
          <v-icon :color="meta.created_utc ? 'success' : ''" x-large>vpn_key</v-icon>
        </v-col>
        
        <MfaCardLabel :label="label || meta.label || $vuetify.lang.t('$vuetify.profile.index.u2fCard.title')" 
                      :id="meta.id" @new-label="label = $event"/>
      </v-row>
    </v-card-title>

    <v-card-text class="grow">
      <Attribute v-if="meta.created_utc" :name="$vuetify.lang.t('$vuetify.profile.index.u2fCard.created')" :value="meta.created_utc | format"/>
      <v-row v-else>
        <v-col cols="auto">
          <v-icon x-large color="warning" class="pr-3">mdi-alert</v-icon>
        </v-col>
        <v-col>
          <em>{{ $vuetify.lang.t('$vuetify.profile.index.u2fCard.warning') }}</em>
        </v-col>
      </v-row>
      <Attribute v-if="meta.last_used_utc" :name="$vuetify.lang.t('$vuetify.profile.index.u2fCard.lastUsed')" :value="meta.last_used_utc | format"/>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>

      <v-btn v-if="meta.created_utc" :href="`#/2sv/change/${meta.id}`" color="primary" outlined>
        {{ $vuetify.lang.t('$vuetify.profile.index.u2fCard.button.change') }}
      </v-btn>
      <v-btn v-else href="#/2sv/usb-security-key/intro" color="primary" outlined>
        {{ $vuetify.lang.t('$vuetify.global.button.add') }}
      </v-btn>
      <MfaCardRemove v-if="meta.created_utc" :id="meta.id"/>
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
  props: ['meta'],
  data: vm => ({
    label: '',
  })
}
</script>
