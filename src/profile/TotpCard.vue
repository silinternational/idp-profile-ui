<template>
  <v-card class="fill-height layout column">
    <v-card-title primary-title>
      <v-row no-gutters align-center>
        <v-icon :color="meta.created_utc ? 'success' : ''" x-large>smartphone</v-icon>

        <MfaCardLabel :label="label || meta.label || $vuetify.lang.t('$vuetify.profile.index.totpCard.title')" 
                      :id="meta.id" @new-label="label = $event"/>
      </v-row>
    </v-card-title>

    <v-card-text class="grow">
      <Attribute v-if="meta.created_utc" :name="$vuetify.lang.t('$vuetify.profile.index.totpCard.created')" :value="meta.created_utc | format"/>
      <div v-else class="layout row align-center">
        <v-icon x-large color="warning" class="pr-3">warning</v-icon>
        <em>{{ $vuetify.lang.t('$vuetify.profile.index.totpCard.warning') }}</em>
      </div>
      <Attribute v-if="meta.last_used_utc" :name="$vuetify.lang.t('$vuetify.profile.index.totpCard.lastUsed')" :value="meta.last_used_utc | format"/>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>

      <v-btn v-if="meta.created_utc" :href="`#/2sv/change/${meta.id}`" color="primary" text outlined>
        {{ $vuetify.lang.t('$vuetify.profile.index.totpCard.button.change') }}
      </v-btn>
      <v-btn v-else href="#/2sv/smartphone/intro" color="primary" text outlined>
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
