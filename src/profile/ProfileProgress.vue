<template>
  <div class="d-flex flex-column align-end text-right text-body-2">
    <p class="mb-1">{{ $t('profile.progress.header') }}</p>

    <meter low="0.5" high="0.8" optimum="1" :value="complete" class="pb-1" />

    <a v-if="complete < 1 && !profile.alternates.length" href="#/password/recovery">{{
      $t('profile.progress.addMethod')
    }}</a>
    <a v-if="complete < 1 && !profile.mfa.totp.id" href="#/2sv/authenticator/intro">{{
      $t('profile.progress.addTotp')
    }}</a>
    <a v-if="complete < 1 && !(profile.mfa.u2f.id || profile.mfa.keys.id)" href="#/2sv/usb-security-key/intro">{{
      $t('profile.progress.addSecurityKey')
    }}</a>
    <a v-if="complete < 1 && !profile.mfa.backup.id" href="#/2sv/printable-backup-codes/intro">{{
      $t('profile.progress.addCodes')
    }}</a>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      default: () => ({
        profile: {
          alternates: [],
          mfa: {},
          user: {},
        },
      }),
    },
  },
  computed: {
    complete: (vm) => deriveCompleteness(vm.profile.user, vm.verifiedMethods, vm.profile.mfa),
    verifiedMethods: (vm) => vm.profile.alternates.filter((m) => m.verified),
  },
}

function deriveCompleteness(user, methods, mfa) {
  let index = user.password_meta ? 0.25 : 0

  index += 0.25 * Math.min(methods.length, 1)

  index += 0.25 * Math.min(mfa.numVerified, 2)

  return index
}
</script>

<style scoped>
meter {
  height: 2em;
  width: 10em;
}
</style>
