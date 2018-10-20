<template>
  <v-layout column align-center justify-center>
    <header class="body-2">
      {{ $vuetify.t('$vuetify.password.strength.header') }}
    </header>

    <!-- https://css-tricks.com/password-strength-meter/ -->
    <main class="display-2">{{ strength }}</main>

    <footer class="caption">
      <a href="https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/wheeler" target="_blank">
        {{ $vuetify.t('$vuetify.global.learnMore') }}
      </a>
    </footer>
  </v-layout>  
</template>

<script>
export default {
  props: ['password'],
  computed: {
    strength: vm =>
      Math.round(Math.random() * 4 + vm.password.length - vm.password.length)
  }
};
</script>
