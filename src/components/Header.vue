<template>
  <header>
    <img src="/static/logo.svg">
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
header {
  background-color: lightgrey;
  min-height: 2em;
  max-height: 4em;
  padding: 0.5em;
}

header > img {
  max-height: inherit;
  max-width: 15%;
}
</style>
