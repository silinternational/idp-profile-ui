<template>
  <section>
    <h1>Confirm your new password</h1>
    
    <p>
      Just to make sure the password is correct, please enter it one more time.
    </p>

    <form
      method="post"
      @submit.prevent="confirmMatch"
    >
      <label>
        Your new password:
        <input 
          type="password"
          name="newPassword"
          v-autofocus
          required
        >
      </label>

      <ButtonBar>
        <GoBackButton/>

        <Spacer/>
        
        <button>Confirm</button>      
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
    confirmMatch() {
      //TODO: validate
      this.$router.push("/password/saved");
    }
  }
};
</script>

