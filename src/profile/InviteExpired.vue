<template>
  <BasePage>
    <template v-slot:header>
      {{ $t('profile.inviteExpired.header') }}
    </template>

    <p>
      {{ $t('profile.inviteExpired.explanation') }}
    </p>
  </BasePage>
</template>
