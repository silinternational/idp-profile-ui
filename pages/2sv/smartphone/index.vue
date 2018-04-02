<template>
  <section>
    <h1>Do you have a smartphone?</h1>
    
    <p>
      If you have a smartphone and it is usually with you, this can be a very good option for your 2-Step Verification.
    </p>

    <ButtonBar>
      <GoBackButton/>

      <router-link
        to="/2sv/usb-security-key"
        tag="button"
      >
        Skip
      </router-link>

      <Spacer/>
    
      <router-link
        to="/2sv/usb-security-key"
        tag="button"
      >
        No
      </router-link>

      <router-link
        to="/2sv/smartphone/download-app"
        tag="button"
      >
        Yes
      </router-link>
    </ButtonBar>
  </section>
</template>

<script>
import ButtonBar from "~/components/ButtonBar";
import GoBackButton from "~/components/GoBackButton";
import Spacer from "~/components/Spacer";

export default {
  components: {
    ButtonBar,
    GoBackButton,
    Spacer
  }
};
</script>
