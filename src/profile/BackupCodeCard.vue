<template>
  <v-card class="fill-height layout column">
    <v-card-title primary-title>
      <v-row no-gutters align-center>
        <v-icon :color="meta.created_utc ? 'success' : ''" x-large>list_alt</v-icon>

        <MfaCardLabel :label="label" :id="meta.id" read-only />
      </v-row>
    </v-card-title>

    <v-card-text class="grow">
      <Attribute v-if="meta.created_utc" :name="$vuetify.lang.t('$vuetify.profile.index.codeCard.created')" :value="meta.created_utc | format" />
      <Attribute v-if="meta.last_used_utc" :name="$vuetify.lang.t('$vuetify.profile.index.codeCard.lastUsed')" :value="meta.last_used_utc | format"/>
      <Attribute v-if="meta.created_utc" :name="$vuetify.lang.t('$vuetify.profile.index.codeCard.remaining')" :value="meta.data.count" sameline />
      <div v-else class="layout row align-center">
        <v-icon x-large color="warning" class="pr-3">warning</v-icon>
        <em>{{ $vuetify.lang.t('$vuetify.profile.index.codeCard.warning') }}</em>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>

      <v-btn v-if="meta.created_utc" href="#/2sv/printable-backup-codes/new" color="primary" text outlined>
        {{ $vuetify.lang.t('$vuetify.profile.index.codeCard.button.replace') }}
      </v-btn>
      <v-btn v-else href="#/2sv/printable-backup-codes/intro" color="primary" text outlined>
        {{ $vuetify.lang.t('$vuetify.profile.index.codeCard.button.add') }}
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
    label:
      vm.meta.label || vm.$vuetify.lang.t('$vuetify.profile.index.codeCard.title')
  })
}
</script>
