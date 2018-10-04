<template>
  <BasePage>
    <template slot="header">
      {{ $vuetify.t('$vuetify.home.header') }}
    </template>

    <router-link v-if="user.new" to="/profile/intro" class="text-xs-center">
      {{ $vuetify.t('$vuetify.home.start') }}
    </router-link>
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
