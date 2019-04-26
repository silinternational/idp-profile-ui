<template>
  <BasePage>
    <template v-slot:header>
      {{ $vuetify.t('$vuetify.profile.inviteExpired.header') }}
    </template>

    <p>
      {{ $vuetify.t('$vuetify.profile.inviteExpired.explanation') }}
    </p>
  </BasePage>
</template>

