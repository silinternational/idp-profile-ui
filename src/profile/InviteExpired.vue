<template>
  <BasePage>
    <template v-slot:header>
      {{ $vuetify.lang.t('$vuetify.profile.inviteExpired.header') }}
    </template>

    <p>
      {{ $vuetify.lang.t('$vuetify.profile.inviteExpired.explanation') }}
    </p>
  </BasePage>
</template>

