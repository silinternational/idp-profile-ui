<template>
  <BasePage>
    <template #header>
      {{ $t('profile.inviteExpired.header') }}
    </template>

    <p>
      {{ $t('profile.inviteExpired.explanation') }}
    </p>
  </BasePage>
</template>

<script>
export default {
  name: 'InviteExpired',
}
</script>
