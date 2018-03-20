<template>
  <div>
    <global-header/>
    
    <main>
      <nuxt/>
    </main>
  </div>
</template>

<script>
import GlobalHeader from '~/components/GlobalHeader.vue'

export default {
  components: {
    GlobalHeader
  }
}
</script>

<style scoped>
main {
  height: 100%;
  padding: 2em;
}
</style>

<style>
body {
  height: 100vh;
  width: 100vw;
}
</style>
