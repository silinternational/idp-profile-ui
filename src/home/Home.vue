<template>
  <BasePage>
    <template slot="header">
      {{ $vuetify.t('$vuetify.home.header') }}
    </template>

    <v-layout column align-start>
      <router-link v-if="$user.isNew()" to="/profile/intro">
        {{ $vuetify.t('$vuetify.home.start') }}
      </router-link>

      <router-link to="/password/forgot">
        {{ $vuetify.t('$vuetify.home.forgot') }}
      </router-link>
    </v-layout>
  </BasePage>
</template>
