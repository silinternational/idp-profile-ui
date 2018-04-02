<template>
  <section>
    <h1>What if your password does not work anymore?</h1>
    
    <p>
      Sometimes we forget our password.  Sometimes the password we have just doesn't work.  In those situations, it is important to still be able to "recover" your password.
    </p>

    <!-- TODO: implement use case where user does NOT have any emails yet -->
    <p>
      In the event you need to recover your password, we can send a special link to the following addresses:
    </p>

    <form 
      action="post"
      @submit.prevent="next"
    >
      <ul>
        <li 
          v-for="(_email, _i) in emails" 
          :key="_i"
        >
          {{ _email }}
          
          <button 
            @click="remove(_i)"
            tabindex="-1"
            v-no-submit
          >
            Remove
          </button>
        </li>
        <li class="no-bullets">
          <input 
            type="email"
            placeholder="Email"
            v-model="newEmail"
            tabindex="1"
            @keydown.enter.prevent="add"
          >
          <button 
            @click="add()"
            tabindex="2"
            v-no-submit
          >
            Add
          </button>
        </li>
      </ul>
    
      <ButtonBar>
        <Spacer/>
        
        <button>
          Continue
        </button>
      </ButtonBar>
    </form>
  </section>
</template>

<script>
import ButtonBar from "~/components/ButtonBar";
import Spacer from "~/components/Spacer";

export default {
  components: {
    ButtonBar,
    Spacer
  },
  data() {
    return {
      newEmail: ''
    }
  },
  asyncData() {
    // TODO: grab these from api
    // export default {
    // async asyncData ({ params }) {
    //   let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    //   return { title: data.title }
    // }
    // }
    return {
      emails: ["personal@example.com"]
    };
  },
  methods: {
    remove(index) {
      this.emails.splice(index)
    },
    add() {
      // TODO: validate, save to db
      this.emails.push(this.newEmail)
      this.newEmail = ''
    },
    next () {
      // TODO: validate?
      this.$router.push('/2sv/intro')
    }
  }
};
</script>

<style scoped>
li.no-bullets {
  list-style-type: none;
}
</style>


