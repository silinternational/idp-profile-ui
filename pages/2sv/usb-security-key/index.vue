<template>
  <section>
    <h1>Do you have a USB security key?</h1>
    
    <p>
      USB security keys are the most secure and convenient option for your 2-Step Verification setup.
    </p>

    <img src="/usb-security-key-examples.png">

    <ButtonBar>
      <GoBackButton/>

      <router-link
        to="/2sv/printable-backup-codes"
        tag="button"
      >
        Skip
      </router-link>

      <Spacer/>
    
      <!-- TODO: build out /2sv/usb-security-key/intro where page will provide an introductory video, some resources and remind the user he/she may have one provided for them at no cost... -->
      <router-link
        tag="button"
        to="/not-sure-yet"
      >
        No, but I'd like to get one
      </router-link>

      <router-link
        to="/2sv/usb-security-key/insert"
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
