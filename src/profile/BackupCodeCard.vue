<template>
  <v-card class="fill-height d-flex flex-column">
    <v-card-title primary-title class="text-break">
      <v-row no-gutters align="center">
        <v-col cols="2">
          <v-icon :color="meta.created_utc ? 'success' : ''" x-large>mdi-format-list-checkbox</v-icon>
        </v-col>
        <v-col class="ml-4">
          <MfaCardLabel :label="label" :id="meta.id" read-only />
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text class="flex-grow-1">
      <Attribute v-if="meta.created_utc" :name="$vuetify.lang.t('$vuetify.profile.index.codeCard.created')" :value="meta.created_utc | format" />
      <Attribute v-if="meta.last_used_utc" :name="$vuetify.lang.t('$vuetify.profile.index.codeCard.lastUsed')" :value="meta.last_used_utc | format"/>
      <Attribute v-if="meta.created_utc" :name="$vuetify.lang.t('$vuetify.profile.index.codeCard.remaining')" :value="meta.data.count" sameline />
      <v-row v-else>
        <v-col cols="auto">
          <v-icon x-large color="warning" class="pr-3">mdi-alert</v-icon>
        </v-col>
        <v-col>
          <em>{{ $vuetify.lang.t('$vuetify.profile.index.codeCard.warning') }}</em>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>

      <v-btn v-if="meta.created_utc" href="#/2sv/printable-backup-codes/new" color="primary" outlined>
        {{ $vuetify.lang.t('$vuetify.profile.index.codeCard.button.replace') }}
      </v-btn>
      <v-btn v-else href="#/2sv/printable-backup-codes/intro" color="primary" outlined>
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
