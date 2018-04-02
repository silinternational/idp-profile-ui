<template>
  <section>
    <h1>Excellent!</h1>
    
    <p>
      Your USB security key is now confirmed so you may use it to further protect your account.
    </p>

    <ButtonBar>
      <Spacer/>
      
      <router-link 
        to="/2sv/printable-backup-codes"
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