<template>
  <section>
    <h1>Touch or press your USB security key</h1>

    <p>
      Your security key should be blinking now, go ahead and press its button or touch its sensor.
    </p>
    
    <!-- TODO: Need the right video looping here -->
    <iframe 
      width="560" 
      height="315" 
      src="https://www.youtube.com/embed/EVx3QkJ8_J0?start=57&end=59"
      frameborder="0" 
      allow="autoplay; encrypted-media"
    />

    <router-link
      to="/2sv/usb-security-key/confirmed"
    >☞</router-link>
  </section>
</template>
