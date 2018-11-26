<template>
  <v-app>
    <v-toolbar app color="primary">
      <!-- TODO: consider using v-img for ALL img's -->
      <img src="@/assets/logo.png">

      <v-spacer />

      <v-toolbar-title class="white--text">{{ $user.first_name }} {{ $user.last_name }}</v-toolbar-title>

      <v-divider vertical dark inset class="mx-2" />

      <v-tooltip left>
        <v-btn slot="activator" icon dark>
          <v-icon v-if="$user.isAuthenticated()" @click="$user.logout()" small>exit_to_app</v-icon>
          <v-icon v-else @click="$user.login('/profile')">person_outline</v-icon>
        </v-btn>

        <span v-if="$user.isAuthenticated()">Log out</span>
        <span v-else>Log in</span>
      </v-tooltip>
    </v-toolbar>

    <v-content>
      <Loading class="ma-0" />
      
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
import Loading from '@/global/Loading';

export default {
  components: {
    Loading
  },
  data: () => ({
    message: ''
  }),
  beforeCreate() {
    this.$API.interceptors.response.use(
      response => response,
      error => {
        this.message = error.message;

        throw error;
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

