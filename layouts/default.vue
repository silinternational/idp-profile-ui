<template>
  <section id="body-replacement">
    <GlobalHeader/>
    
    <main>
      <!-- TODO: review https://nuxtjs.org/examples/auth-routes for authn/authz -->
      <nuxt/>
    </main>
  </section>
</template>

<script>
import GlobalHeader from "~/components/GlobalHeader.vue";

export default {
  components: {
    GlobalHeader
  }
};
</script>

<style scoped>
section#body-replacement {
  height: 100vh;
  width: 100vw;
}

main {
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<!-- TODO: review https://nuxtjs.org/examples/global-css -->
<!-- TODO: consider breakpoints here for readability because the /2sv/smartphone/verified-qr-code is begging for a lower max-width on that instrucitonal p -->
<style>
p {
  max-width: 70ch; /* "ideal" paragraph width for reading ease */
}

/* TODO: need to establish typography */

/* TODO: remove these if a style library is brought in for form validation 
    https://vuejs.org/v2/cookbook/form-validation.html
*/
input:invalid {
  border: dashed red 1px;
}
input:focus:invalid {
  border: initial;
}
</style>
