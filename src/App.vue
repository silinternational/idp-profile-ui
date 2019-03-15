<template>
  <v-app>
    <v-toolbar app color="primary">
      <a href="#/profile">
        <img src="@/assets/logo.png">
      </a>

      <v-spacer />

      <v-toolbar-title class="white--text">{{ $user.first_name }} {{ $user.last_name }}</v-toolbar-title>

      <v-divider vertical dark inset class="mx-2" />

      <v-tooltip left>
        <v-btn v-if="$user.isAuthenticated()" @click="$user.logout()" slot="activator" icon dark>
          <v-icon small>exit_to_app</v-icon>
        </v-btn>
        <v-btn v-else @click="$user.login('/profile')" slot="activator" icon dark>
          <v-icon>person_outline</v-icon>
        </v-btn>

        <span v-if="$user.isAuthenticated()">{{ $vuetify.t('$vuetify.app.logout') }}</span>
        <span v-else>{{ $vuetify.t('$vuetify.app.login') }}</span>
      </v-tooltip>
    </v-toolbar>

    <v-content>
      <Loading class="ma-0" />

      <v-layout row>
        <v-spacer />

        <v-btn v-if="$returnTo.url" :href="$returnTo.url" small flat dark color="secondary">
          return to {{ $returnTo.url }}
        </v-btn>
      </v-layout>
      
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
export default {
  data: () => ({
    message: ''
  }),
  beforeCreate() {
    this.$API.interceptors.response.use(
      response => response,
      error => {
        this.message = error.message

        throw error
      }
    )
  },
  errorCaptured(err) {
    this.message = err.message || err
  },
  watch: {
    $route() {
      this.message = ''
    }
  }
}
</script>

<style scoped>
a, img {
  height: 100%; /* contain img to the toolbar's height */
}
</style>

<style>
p {
  max-width: 75ch; /* better readability supposedly */
}

/* cards on the profile page were losing their flex style in production 
   builds due to the way the style modules are combined... this will increase 
   the specificity as a work-around.  I chatted with John Leider on discord 
   and he said this would be fixed once v2.0 was released. */
.layout.v-sheet {
  display: flex;
}
</style>

