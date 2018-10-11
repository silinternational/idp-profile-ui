<template>
  <BasePage>
    <template slot="header">
      {{ $vuetify.t('$vuetify.home.header') }}
    </template>

    <router-link v-if="$user.isNew()" to="/profile/intro" class="text-xs-center">
      {{ $vuetify.t('$vuetify.home.start') }}
    </router-link>
  </BasePage>
</template>
