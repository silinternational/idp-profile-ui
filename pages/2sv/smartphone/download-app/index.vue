<template>
  <section>
    <h1>Download an app</h1>
    
    <p>
      There are many apps you can use for this step however we recommend Google Authenticator for its simplicity.
    </p>

    <figure>
      <img
        src="/google-authenticator-logo.webp" 
        alt="Google Authenticator Logo"
      >

      <figcaption>Google Authenticator</figcaption>
    </figure>

    <figure class="badges">
      <a 
        href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
        target="_blank"
      >
        <img
          src="/google-play-badge.png" 
          alt="Get it on Google Play"
        >
      </a>
      <a 
        href="https://itunes.apple.com/us/app/google-authenticator/id388497605"
        target="_blank"
      >
        <img
          src="/app-store-badge.png" 
          alt="Download on the App Store"
        >
      </a>
    </figure>
    
    <ButtonBar>
      <GoBackButton/>

      <Spacer/>
    
      <router-link
        to="/2sv/smartphone/scan-qr"
        tag="button"
      >
        Ok, I installed it on my smartphone
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
img {
  max-height: 7em;
}

figure {
  display: flex;
  align-items: center;
  justify-content: center;
}
figure > img + figcaption {
  font-size: x-large;
  padding-left: 1em;
}

figure.badges > a > img {
  max-height: 40px;
  padding: 0 0.5em;
}
</style>
