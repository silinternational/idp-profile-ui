<template>
  <section>
    <h1>New printable backup codes</h1>
    
    <ul>
      <li 
        v-for="(code, _i) in codes" 
        :key="_i"
      >
        ☐ {{ code }}
      </li>
    </ul>

    <a href="">Print</a>
    <a href="">Download</a>
    <a href="">Copy</a>

    <ButtonBar>
      <Spacer/>
    
      <router-link
        to="/profile/complete"
        tag="button"
      >
        Finish
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
      codes: [
        "ABCD 1234",
        "ABCD 1234",
        "ABCD 1234",
        "ABCD 1234",
        "ABCD 1234",
        "ABCD 1234",
        "ABCD 1234",
        "ABCD 1234",
        "ABCD 1234",
        "ABCD 1234"
      ]
    };
  }
};
</script>

<style scoped>
li {
  list-style-type: none;
}
</style>
