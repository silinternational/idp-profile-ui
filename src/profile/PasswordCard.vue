<template>
<!-- TODO: decide what this component looks like for a new user, one without any `password-meta` -->
  <v-card class="layout column">
    <v-card-title primary-title>
      <h3 class="headline">{{ $vuetify.t('$vuetify.profile.index.passwordCard.title') }}</h3>
    </v-card-title>

    <v-card-text class="grow">
      <Attribute :name="$vuetify.t('$vuetify.profile.index.passwordCard.lastChanged')" :value="meta.last_changed | format" />
      <Attribute :name="$vuetify.t('$vuetify.profile.index.passwordCard.expires')" :value="meta.expires | format" />
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
import Attribute from './Attribute';

export default {
  components: {
    Attribute
  },
  props: {
    meta: {
      type: Object,
      default: () => ({
        meta: {}
      })
    }
  }
};
</script>
