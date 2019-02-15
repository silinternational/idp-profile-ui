<template>
  <v-card class="fill-height layout column">
    <v-card-title primary-title>
      <v-layout row align-center>
        <v-icon :color="meta.created_utc ? 'success' : ''" x-large>smartphone</v-icon>

        <MfaCardLabel :label="label" :id="meta.id" @new-label="label = $event"/>
      </v-layout>
    </v-card-title>

    <v-card-text class="grow">
      <Attribute
        v-if="meta.created_utc"
        :name="$vuetify.t('$vuetify.profile.index.totpCard.created')"
        :value="meta.created_utc | format"
      />
      <div v-else class="layout row align-center">
        <v-icon x-large color="warning" class="pr-3">warning</v-icon>
        <em>{{ $vuetify.t('$vuetify.profile.index.totpCard.warning') }}</em>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>

      <v-btn v-if="meta.created_utc" :href="`/2sv/change/${meta.id}`" color="primary" flat outline>
        {{ $vuetify.t('$vuetify.profile.index.totpCard.button.change') }}
      </v-btn>
      <v-btn v-else href="/2sv/smartphone/intro" color="primary" flat outline>
        {{ $vuetify.t('$vuetify.global.button.add') }}
      </v-btn>
      <MfaCardRemove v-if="meta.created_utc" :id="meta.id" @removed="$router.go()"/>
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
      vm.meta.label || vm.$vuetify.t('$vuetify.profile.index.totpCard.title')
  })
}
</script>
