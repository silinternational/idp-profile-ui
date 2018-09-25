<template>
  <BasePage>
    <template slot="header">Welcome!</template>

    <router-link v-if="isNewUser" to="/profile/intro" class="text-xs-center">I'd like to start my profile today</router-link>
  </BasePage>
</template>

<script>
import BasePage from '@/components/BasePage';

export default {
  components: {
    BasePage
  },
  data() {
    return {
      isNewUser: true
    };
  }
};
</script>
