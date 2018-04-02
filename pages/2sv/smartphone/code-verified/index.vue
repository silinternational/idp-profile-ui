<template>
  <section>
    <h1>Excellent!</h1>
    
    <p>
      That was the correct code so you may now use your smartphone to further protect your account.
    </p>

    <ButtonBar>
      <Spacer/>
      
      <router-link 
        to="/2sv/usb-security-key"
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