<template>
  <section>
    <h1>Printable backup codes</h1>
    
    <p>
      There may be times when you do not have your smartphone or USB security key with you.  When that is the case, having printable backup codes can be used.
    </p>

    <p>
      –OR–
    </p>

    <p>
      some content for those users that have NOT set up other 2sv options.
    </p>

    <ButtonBar>
      <router-link
        to="/2sv/profile/complete"
        tag="button"
      >
        Skip
      </router-link>

      <Spacer/>
    
      <router-link
        to="/2sv/printable-backup-codes/new"
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
