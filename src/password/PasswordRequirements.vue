<template>
  <v-list>
    <v-subheader>
      Minimum requirements:
    </v-subheader>

    <v-list-tile v-for="requirement in requirements" :key="requirement">
      <v-list-tile-avatar>
        <v-icon color="warning">warning</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-sub-title>{{ requirement }}</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>  
</template>

<script>
export default {
  data: () => ({
    requirements: ['At least 8 characters', 'Strength of at least 2']
  })
};
</script>
