<template>
  <v-layout column align-center>
    <header class="display-1 py-3 layout row align-center justify-center">
      <slot name="header" />
    </header>

    <main class="body-1 py-3">
      <slot />
    </main>
  </v-layout>
</template>

<style scoped>
header {
  width: 100%;
}
main {
  min-width: 50%;
}
</style>
