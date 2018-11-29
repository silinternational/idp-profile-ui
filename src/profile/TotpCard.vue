<template>
  <v-card class="layout column">
    <v-card-title primary-title>
      <v-layout row align-center>
        <v-icon x-large>smartphone</v-icon>
        
        <MfaCardLabel :label="meta.label || $vuetify.t('$vuetify.profile.index.totpCard.title')" 
                      :id="meta.id" @new-label="meta.label = $event" />
      </v-layout>
    </v-card-title>
        
    <v-card-text class="grow">
      <span v-if="meta.created_utc">
        {{ $vuetify.t('$vuetify.profile.index.totpCard.created', created) }}
      </span>
      <div v-else class="layout row align-center">
        <v-icon x-large color="warning" class="pr-3">
          warning
        </v-icon>
        <em>
          {{ $vuetify.t('$vuetify.profile.index.totpCard.warning') }}
        </em>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      
      <v-btn color="primary" flat>
        <span v-if="meta.created_utc">
          {{ $vuetify.t('$vuetify.profile.index.totpCard.button.lost') }}
        </span>
        <span v-else>
          {{ $vuetify.t('$vuetify.global.button.add') }}
        </span>
      </v-btn>
      <MfaCardRemove v-if="meta.created_utc" :id="meta.id" @removed="$router.go()" />
    </v-card-actions>
  </v-card>
</template>

<script>
import MfaCardLabel from './MfaCardLabel';
import MfaCardRemove from './MfaCardRemove';

export default {
  components: {
    MfaCardLabel,
    MfaCardRemove
  },
  props: {
    meta: {
      type: Object,
      default: () => ({
        meta: {}
      })
    }
  },
  computed: {
    created: vm => new Date(vm.meta.created_utc).toLocaleString()
  }
};
</script>
