<template>
  <v-app>
    <v-toolbar app color="primary">
      <!-- TODO: consider using v-img for ALL img's -->
      <img src="@/assets/logo.png">
    </v-toolbar>

    <v-content>
      <v-container>
        <v-alert :value="message" type="error" dismissible>
          <span class="layout row align-center justify-center">{{ message }}</span>
        </v-alert>

        <!-- adding key here helps produce more predictable view behavior (see https://youtu.be/7YZ5DwlLSt8?t=21m22s) -->
        <router-view :key="$route.fullPath" />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Vue from 'vue';

export default {
  data: () => ({
    message: ''
  }),
  beforeCreate() {
    this.$API.interceptors.response.use(
      response => response.data,
      error => {
        this.message = error.response.data.message;

        throw error.response.data;
      }
    );
  },
  errorCaptured(err) {
    this.message = err.message || err;
  },
  watch: {
    $route() {
      this.message = '';
    }
  }
};
</script>

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

