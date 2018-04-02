<template>
  <section>
    <h1>What is 2-Step Verification?</h1>
    
    <p>
      Before going any further, we would like to introduce you to an important step in protecting your account.
    </p>

    <!-- TODO: make our own video -->
    <iframe 
      src="https://www.youtube.com/embed/0mvCeNsTa1g" 
      allowfullscreen
    />

    <ButtonBar>
      <Spacer/>
      
      <router-link
        to="/2sv/smartphone"
        tag="button"
      >
        Continue
      </router-link>
    </ButtonBar>
  </section>
</template>

<script>
import ButtonBar from "~/components/ButtonBar";
import Spacer from "~/components/Spacer";

export default {
  components: {
    ButtonBar,
    Spacer
  }
};
</script>

<style scoped>
iframe {
  border: none;
  width: 560px;
  height: 315px;
}
</style>
