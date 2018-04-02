<template>
  <section>
    <h1>Identity profile complete!</h1>
    
    <p>
      show some percentage of completion w/encouragement to finish incomplete profiles.
    </p>

    <p>
      links and references to additional information
    </p>

    <ButtonBar>
      <Spacer/>
      
      <router-link 
        to="/profile/??TODO??"
        tag="button"
      >
        See my profile
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