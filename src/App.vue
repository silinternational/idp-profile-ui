<template>
  <v-app>
    <v-app-bar app color="primary">
      <a href="/"><img src="@/assets/logo.png"></a>

      <v-spacer />

      <v-toolbar-title class="white--text px-4">{{ $user.first_name }} {{ $user.last_name }}</v-toolbar-title>

      <v-divider vertical dark inset class="mx-2" />

      <v-btn v-if="$user.isAuthenticated()" @click="$user.logout()" text dark :icon="mobile" class="mx-1">
        <v-icon v-if="mobile">mdi-logout-variant</v-icon>
        <span v-else>{{ $vuetify.lang.t('$vuetify.app.logout') }}</span>
      </v-btn>

      <v-btn v-else @click="$user.login()" text dark :icon="mobile" class="mx-1">
        <v-icon v-if="mobile">mdi-login</v-icon>
        <span v-else>{{ $vuetify.lang.t('$vuetify.app.login') }}</span>
      </v-btn>

      <v-divider vertical dark inset />

      <HelpButton />
    </v-app-bar>

    <v-main>
      <Loading class="ma-0" />

      <v-row no-gutters>
        <v-spacer />

        <v-btn v-if="$returnTo.url" :href="$returnTo.url" small text dark color="secondary">
          return to {{ $returnTo.url }}
        </v-btn>
      </v-row>
      
      <v-container>
        <v-alert :value="!!message" type="error" dismissible>
          <span v-html="message" />
        </v-alert>

        <!-- adding key here helps produce more predictable view behavior (see https://youtu.be/7YZ5DwlLSt8?t=21m22s) -->
        <router-view :key="$route.fullPath" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HelpButton from './help/HelpButton'
export default {
  components: {
    HelpButton
  },
  data: () => ({
    message: ''
  }),
  computed: {
    mobile () {
      return this.$vuetify.breakpoint.name === 'xs'
    },
  },
  beforeCreate() {
    this.$API.interceptors.response.use(
      response => response,
      error => {
        this.message = error.message

        throw error
      }
    )
  },
  created() {
    const appScope = this
    this.$root.$on('clear-messages', () => appScope.message = '') // built for situation in Recovery.vue (temp hack hopefully)
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

/* with the addition of the help link, the extra space on the rigth looked weird. */
div.v-toolbar__content {
  padding-right: initial;
}

/* Reduces font size of button content on <= 480px screens */
@media only screen and (max-width: 480px) {
  span.v-btn__content {
    font-size: .8em;
  }
}
</style>

