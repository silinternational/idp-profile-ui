<template>
  <v-row>
    <v-col>
      <header class="display-1 py-3 layout row align-center justify-center">
        <slot name="header" />
      </header>
    
      <main class="body-1 py-3">
        <slot />
      </main>
    </v-col>
  </v-row>
</template>

<script>
export default {
  mounted() {
    document.title = this.$vuetify.lang.t('$vuetify.app.title', this.$slots.header[0].text.trim())
  }
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
