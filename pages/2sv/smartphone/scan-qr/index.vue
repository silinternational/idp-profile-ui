<template>
  <section>
    <h1>Connect your smartphone to your account</h1>
    
    <p>
      In order to connect your smartphone to your account we will need to scan the QR code below into the app you just installed.
    </p>

    <ol>
      <li>
        <p>
          Add an account by pressing "begin setup" or the "add" button and then choosing the "scan a barcode" option
          <!-- TODO: consider animation here and don't forget, if the user just downloaded the app, it will start with a "BEGIN SETUP" screen -->
          <img src="/google-authenticator-scan-screenshot.png">
        </p>
      </li>
      <li>
        <p>
          Point your phone at the QR code below and your app will start generating 6-digit codes
          <!-- TODO: integrate api call for this qrcode -->
          <img src="/google-authenticator-qr-code.png">
        </p>        
      </li>
    </ol>

    <ButtonBar>
      <GoBackButton/>

      <Spacer/>
    
      <router-link
        to="/2sv/smartphone/verify-qr-code"
        tag="button"
      >
        Ok, my app is generating codes now
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

<style scoped>
ol {
  list-style-type: none;
  counter-reset: elementcounter;
}
li:before {
  content: "Step " counter(elementcounter);
  counter-increment: elementcounter;
  font-weight: bold;
}
li > p {
  display: inline-flex; /* aligns counter with top of li's content */
  flex-direction: column;
}
li > p img {
  /* keep images from stretching because of flex */
  align-self: center;
}
</style>
