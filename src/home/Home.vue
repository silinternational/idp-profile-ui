<template>
  <BasePage>
    <template slot="header">
      {{ $vuetify.t('$vuetify.home.header') }}
    </template>

    <!-- TODO: since this page can be viewed by unauthenticated users, need to think through the links that will be presented carefully here since an unauthenticated user will look a lot like a new user -->
    <router-link v-if="$user.isNew()" to="/profile/intro" class="text-xs-center">
      {{ $vuetify.t('$vuetify.home.start') }}
    </router-link>
  </BasePage>
</template>
