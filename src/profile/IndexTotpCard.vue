<template>
  <v-card class="layout column">
    <v-card-title primary-title>
      <v-layout row align-center>
        <v-icon x-large>smartphone</v-icon>
        <h3 class="headline pl-3">{{ meta.label || $vuetify.t('$vuetify.profile.index.totpCard.title') }}</h3>
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
      <v-btn v-if="meta.created_utc" color="error" flat>
        {{ $vuetify.t('$vuetify.global.button.remove') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
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
