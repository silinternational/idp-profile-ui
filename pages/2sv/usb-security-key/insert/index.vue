<template>
  <section>
    <h1>Insert USB security key</h1>
    
    <!-- TODO: Need the right video demonstrating how to insert so users know which way is up. -->
    <iframe 
      width="560" 
      height="315" 
      src="https://www.youtube.com/embed/EVx3QkJ8_J0?start=56&end=58" 
      frameborder="0" 
      allow="autoplay; encrypted-media"
    />

    <ButtonBar>
      <GoBackButton/>

      <Spacer/>
    
      <router-link
        to="/2sv/usb-security-key/touch"
        tag="button"
      >
        OK, I inserted it
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
