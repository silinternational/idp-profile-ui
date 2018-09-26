<template>
  <BasePage>
    <template slot="header">Welcome!</template>

    <router-link v-if="user.new" to="/profile/intro" class="text-xs-center">I'd like to start my profile today</router-link>
  </BasePage>
</template>

<script>
export default {
  data: () => ({
    user: {}
  }),
  created() {
    // simulating data call here.
    setTimeout(
      () =>
        (this.user = {
          new: true
        }),
      500
    );
  }
};
</script>
