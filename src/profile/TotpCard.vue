<template>
  <v-card class="fill-height d-flex flex-column">
    <v-card-title primary-title class="text-break">
      <v-row no-gutters align="center">
        <v-col cols="2">
          <v-icon :color="meta.created_utc ? 'success' : ''" x-large>mdi-cellphone</v-icon>
        </v-col>
        <v-col class="ml-4">
          <MfaCardLabel :label="label || meta.label || $vuetify.lang.t('$vuetify.profile.index.totpCard.title')" 
                        :id="meta.id" @new-label="label = $event"/>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text class="flex-grow-1">
      <Attribute v-if="meta.created_utc" :name="$vuetify.lang.t('$vuetify.profile.index.totpCard.created')" :value="meta.created_utc | format"/>
      <v-row v-else>
        <v-col cols="auto">
         <v-icon x-large color="warning" class="pr-3">mdi-alert</v-icon>
        </v-col>
        <v-col>
          <em>{{ $vuetify.lang.t('$vuetify.profile.index.totpCard.warning') }}</em>
        </v-col>
      </v-row>
      <Attribute v-if="meta.last_used_utc" :name="$vuetify.lang.t('$vuetify.profile.index.totpCard.lastUsed')" :value="meta.last_used_utc | format"/>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>

      <v-btn v-if="meta.created_utc" :href="`#/2sv/change/${meta.id}`" color="primary" outlined>
        {{ $vuetify.lang.t('$vuetify.profile.index.totpCard.button.change') }}
      </v-btn>
      <v-btn v-else href="#/2sv/smartphone/intro" color="primary" outlined>
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
  }),
}
</script>
