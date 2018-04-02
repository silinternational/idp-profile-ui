<template>
  <!-- TODO: need to implement a dynamic page title (https://nuxtjs.org/api/pages-head) -->
  <section>
    <!-- TODO: grab this data from api -->
    <h1>Create a password for your {{ 'IdP' }} Identity</h1>
    
    <!-- TODO: grab this data from api -->
    <p>
      Minimum requirements:
    </p>
    <ul>
      <li>At least 8 characters</li>
      <li>A strength of at least 2</li>
    </ul>

    <!-- TODO: consider making form a component with these defaults. -->
    <!-- TODO:  review https://www.smashingmagazine.com/2011/11/extensive-guide-web-form-usability/ for form best practices -->
    <form 
      method="post" 
      @submit.prevent="save"
    >
      <label>
        Password: 
        <input 
          type="password"
          name="password"
          v-autofocus
          required
        > <!-- TODO: don't forget to consider when to turn autocomplete="off" -->
      </label>

      <!-- TODO: users will not be looking at screen most likely, design this indicator accordingly. -->
      <p>Strength meter</p>

      <ButtonBar>
        <GoBackButton/>

        <Spacer/>
        
        <button>Save</button>  
      </ButtonBar>
    </form>
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
  },
  methods: {
    save() {
      //TODO: validate (https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html)
      this.$router.push("/password/confirm");
    }
  }
};
</script>

