<template>
  <v-row justify="center">
    <v-col cols="auto" align-self="center">
      <header class="text-h4 d-flex align-center justify-center text-center">
        <slot name="header" />
      </header>

      <main class="text-body-1 py-4">
        <slot />
      </main>
    </v-col>
  </v-row>
</template>

<script>
export default {
  mounted() {
    // TODO document.title = this.$t('app.title', this.$slots.header[0].text.trim())
  },
}
</script>

<style scoped>
header {
  width: 100%;
}
main {
  min-width: 50%;
}
</style>
