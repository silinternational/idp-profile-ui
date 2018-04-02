<template>
  <section>
    <h1>Excellent!</h1>
    
    <p>
      Your password has been saved.
    </p>

    <ButtonBar>
      <Spacer/>
      
      <router-link 
        to="/password/recovery"
        tag="button"
      >
        Continue
      </router-link>      
    </ButtonBar>
  </section>
</template>

<script>
import ButtonBar from '~/components/ButtonBar'
import Spacer from '~/components/Spacer'

export default {
  components: {
    ButtonBar,
    Spacer
  }
}
</script>