<template>
  <v-layout column align-center justify-center>
    <header class="body-2">
      Password strength
    </header>

    <main class="display-2">{{ strength }}</main>
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
