<template>
  <section>
    <h1>Verify code from your smartphone app</h1>
    
    <form 
      method="post" 
      @submit.prevent="verify"
    >
      <section>
        <img src="/google-authenticator-6-digit-code.png">

        <section>
          <p>
            Your app will generate a new 6-digit code every 30 seconds, when you're ready enter the one displayed in your app and click "Verify".
          </p>
          
          <label>
            6-digit code: 
            <input
              type="text"
              name="code"
              v-autofocus
              required
              minlength="6"
              max="7"
            > <!-- chose text instead of number here so users can enter codes that begin with zeros and for users that might put a space in between digits -->
          </label>
        </section>
      </section>

      <ButtonBar>
        <GoBackButton/>

        <Spacer/>
      
        <button>Verify</button>
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
  // TODO: need number only validation on the entered code.
  methods: {
    verify() {
      //TODO: validate (https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html)
      this.$router.push("/2sv/smartphone/code-verified");
    }
  }
};
</script>

<style scoped>
form > section {
  display: flex;
}

form > section > section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
