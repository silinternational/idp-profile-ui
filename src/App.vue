<template>
  <v-app>
    <v-app-bar app color="primary">
      <a href="/"><img :src="logo" alt="Logo" /></a>

      <v-spacer />

      <v-toolbar-title class="white--text px-4">{{ user.first_name }} {{ user.last_name }}</v-toolbar-title>

      <v-divider vertical dark inset class="mx-2" />

      <v-btn v-if="user.isAuthenticated()" @click="logout" text dark :icon="mobile" class="mx-1">
        <v-icon v-if="mobile">mdi-logout-variant</v-icon>
        <span v-else>{{ $t('app.logout') }}</span>
      </v-btn>

      <v-btn v-else @click="login" text dark :icon="mobile" class="mx-1">
        <v-icon v-if="mobile">mdi-login</v-icon>
        <span v-else>{{ $t('app.login') }}</span>
      </v-btn>

      <v-divider vertical dark inset />

      <HelpButton />
    </v-app-bar>

    <v-main>
      <Loading class="ma-0" />

      <v-row no-gutters>
        <v-spacer />

        <v-btn v-if="returnTo.url" :href="returnTo.url" small text dark color="secondary">
          return to {{ returnTo.url }}
        </v-btn>
      </v-row>

      <v-container>
        <v-alert :value="!!message" type="error" dismissible>
          <span v-sanitize.basic="message" />
        </v-alert>

        <!-- adding key here helps produce more predictable view behavior (see https://youtu.be/7YZ5DwlLSt8?t=21m22s) -->
        <router-view :key="$route.fullPath" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HelpButton from './help/HelpButton.vue'
import logo from '@/assets/logo.png'
import user from '@/plugins/user'
import returnTo from '@/plugins/returnTo'
import eventBus from '@/eventBus'

export default {
  components: {
    HelpButton,
  },
  data() {
    return {
      message: '',
      logo,
    }
  },
  computed: {
    mobile() {
      return this?.$vuetify?.breakpoint?.name === 'xs'
    },
    user() {
      return user // Access user directly
    },
    returnTo() {
      return returnTo
    },
  },
  created() {
    eventBus.on('clear-messages', () => {
      this.message = ''
    })
  },
  errorCaptured(err) {
    this.message = err.message || err
  },
  watch: {
    $route() {
      this.message = ''
    },
  },
  methods: {
    logout() {
      this.user.logout()
    },
    login() {
      this.user.login()
    },
  },
}
</script>

<style scoped>
a,
img {
  height: 100%; /* contain img to the toolbar's height */
}
</style>

<style>
p {
  max-width: 75ch; /* better readability supposedly */
}

/* with the addition of the help link, the extra space on the right looked weird. */
div.v-toolbar__content {
  padding-right: initial;
}

/* Reduces font size of button content on <= 480px screens */
@media only screen and (max-width: 480px) {
  span.v-btn__content {
    font-size: 0.8em;
  }
}
</style>
