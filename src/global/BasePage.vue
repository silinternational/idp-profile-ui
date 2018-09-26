<template>
  <v-layout column align-center>
    <header class="display-1 py-3">
      <!-- TODO: need to implement a dynamic page title presumably using the contents of the header -->
      <slot name="header" />
    </header>

    <main class="body-1 py-3">
      <slot />
    </main>
  </v-layout>
</template>

<style scoped>
main {
  min-width: 50%;
}
</style>
