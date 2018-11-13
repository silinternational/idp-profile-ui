<template>
<!-- TODO: decide what this component looks like for a new user, one without any `password-meta` -->
  <v-card class="layout column">
    <v-card-title primary-title>
      <h3 class="headline">{{ $vuetify.t('$vuetify.profile.index.passwordCard.title') }}</h3>
    </v-card-title>

    <v-card-text class="grow">
      <div>{{ $vuetify.t('$vuetify.profile.index.passwordCard.lastChanged', pwChanged) }}</div>
      <div>{{ $vuetify.t('$vuetify.profile.index.passwordCard.expires', pwExpires) }}</div>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      
      <v-btn color="primary" flat>
        {{ $vuetify.t('$vuetify.global.button.change') }}
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
    pwChanged: vm => new Date(vm.meta.last_changed).toLocaleString(),
    pwExpires: vm => new Date(vm.meta.expires).toLocaleString()
  }
};
</script>
