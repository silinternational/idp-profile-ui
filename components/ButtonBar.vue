<template>
  <section>
    <slot/>
  </section>
</template>

<style scoped>
section {
  width: 100%;
  display: flex;
}

section button:last-child {
  /* TODO: use css var for "primary" color when branding is established */
  background-color: #0067a6;
  color: white;
}
</style>
