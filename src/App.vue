<template>
  <v-app>
    <v-toolbar app color="primary">
      <img src="@/assets/logo.webp">
    </v-toolbar>
  
    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<style scoped>
img {
  height: 100%; /* contain img to the toolbar's height */
}
</style>

<style>
p {
  max-width: 75ch;
}
</style>

