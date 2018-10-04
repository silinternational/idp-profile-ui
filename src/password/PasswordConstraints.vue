<template>
  <v-list>
    <v-subheader>
      {{ $vuetify.t('$vuetify.password.constraints.header') }}
    </v-subheader>

    <v-list-tile v-for="constraint in constraints" :key="constraint">
      <v-list-tile-avatar>
        <v-icon color="warning">warning</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-sub-title>{{ constraint }}</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>  
</template>

<script>
export default {
  data: () => ({
    //TODO: will need translations here OR the API needs them.
    constraints: ['At least 8 characters', 'Strength of at least 2']
  })
};
</script>
