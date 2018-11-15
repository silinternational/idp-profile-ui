<template>
  <v-app>
    <v-toolbar app color="primary">
      <!-- TODO: consider using v-img for ALL img's -->
      <img src="@/assets/logo.png">
    </v-toolbar>
  
    <v-content>
      <v-container>
        <!-- adding key here helps produce more predictable view behavior (see https://youtu.be/7YZ5DwlLSt8?t=21m22s) -->
        <router-view :key="$route.fullPath" />
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
  max-width: 75ch; /* better readability supposedly */
}
</style>

