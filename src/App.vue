<template>
  <div id="layout">
    <Header/>

    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style scoped>
#layout {
  height: 100vh;
  width: 100vw;
}

main {
  padding: 2em;
}
</style>
