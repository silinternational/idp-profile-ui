<template>
  <v-card class="layout column">
    <v-card-title primary-title>
      <v-layout row align-center>
        <v-icon x-large>vpn_key</v-icon>
        <h3 class="headline pl-3">{{ meta.label }}</h3>
      </v-layout>
    </v-card-title>
        
    <v-card-text class="grow">
      {{ $vuetify.t('$vuetify.profile.index.u2fCard.created', created) }}
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      
      <v-btn color="primary" flat>
        {{ $vuetify.t('$vuetify.profile.index.u2fCard.button.lost') }}
      </v-btn>
      <v-btn color="error" flat>
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
