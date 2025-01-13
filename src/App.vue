<template>
  <v-app>
    <v-app-bar color="primary">
      <a href="/"><img :src="logo" alt="Logo" /></a>

      <v-spacer />

      <v-toolbar-title class="text-white px-4">{{ user.first_name }} {{ user.last_name }}</v-toolbar-title>

      <v-divider vertical inset class="mx-2" />

      <v-btn v-if="user.isAuthenticated()" variant="text" :icon="xs" class="mx-1" @click="logout">
        <v-icon v-if="xs">mdi-logout-variant</v-icon>
        <span v-else>{{ $t('app.logout') }}</span>
      </v-btn>

      <v-btn v-else variant="text" :icon="xs" class="mx-1" @click="login">
        <v-icon v-if="xs">mdi-login</v-icon>
        <span v-else>{{ $t('app.login') }}</span>
      </v-btn>

      <v-divider vertical inset />

      <HelpButton />
    </v-app-bar>

    <v-main>
      <LoadingIndicator class="ma-0" />

      <v-row no-gutters>
        <v-spacer />

        <v-btn v-if="returnTo.url" :href="returnTo.url" size="small" variant="text" color="secondary">
          return to {{ returnTo.url }}
        </v-btn>
      </v-row>

      <v-container>
        <v-alert v-show="!!message" type="error" closable @click:close="message = ''">
          <span v-sanitize.basic="message" />
        </v-alert>

        <!-- adding key here helps produce more predictable view behavior (see https://youtu.be/7YZ5DwlLSt8?t=21m22s) -->
        <router-view :key="$route.fullPath" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import HelpButton from './help/HelpButton.vue'
import logo from '@/assets/logo.png'
import user from '@/plugins/user'
import returnTo from '@/plugins/returnTo'
import eventBus from '@/eventBus'
import { ref, watch, onMounted, onErrorCaptured } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'

const message = ref('')

const { xs } = useDisplay()

const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    message.value = ''
  },
)

onMounted(() => {
  eventBus.on('clear-messages', () => {
    message.value = ''
  })
})

onErrorCaptured((err) => {
  message.value = err.message || err
  return true // Prevent the error from propagating further
})

const logout = () => {
  user.logout()
}

const login = () => {
  user.login()
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
