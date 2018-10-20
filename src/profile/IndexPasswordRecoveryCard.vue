<template>
<!-- TODO: decide what this component looks like for a user without any `methods` -->
  <v-card class="layout column">
    <v-card-title primary-title>
      <h3 class="headline">{{ $vuetify.t('$vuetify.profile.index.passwordRecoveryCard.title') }}</h3>
    </v-card-title>

    <v-card-text class="grow">
      <div v-for="method in methods" :key="method.email">
        {{ method.email }}
      </div>
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
    methods: {
      type: Array,
      default: () => []
    }
  }
};
</script>
