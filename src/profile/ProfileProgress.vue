<template>
  <v-row no-gutters justify="end">
    <v-col cols="auto">
      <p class="body-2 text-right">{{ $vuetify.lang.t('$vuetify.profile.progress.header') }}</p>

    <meter low="0.5" high="0.8" optimum="1" :value="complete" class="pb-3"/>

    <a v-if="complete < 1 && ! profile.alternates.length" href="#/password/recovery" class="caption">{{ $vuetify.lang.t('$vuetify.profile.progress.addMethod') }}</a>
    <a v-if="complete < 1 && ! profile.mfa.totp.id" href="#/2sv/smartphone/intro" class="caption">{{ $vuetify.lang.t('$vuetify.profile.progress.addTotp') }}</a>
    <a v-if="complete < 1 && ! profile.mfa.u2f.id" href="#/2sv/usb-security-key/intro" class="caption">{{ $vuetify.lang.t('$vuetify.profile.progress.addU2f') }}</a>
    <a v-if="complete < 1 && ! profile.mfa.backup.id" href="#/2sv/printable-backup-codes/intro" class="caption">{{ $vuetify.lang.t('$vuetify.profile.progress.addCodes') }}</a>
    </v-col>
  </v-row>
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
          user: {}
        }
      })
    }
  },
  computed: {
    complete: vm => deriveCompleteness(vm.profile.user, vm.verifiedMethods, vm.profile.mfa),
    verifiedMethods: vm => vm.profile.alternates.filter(m => m.verified),
  }
};

function deriveCompleteness(user, methods, mfa) {
  let index = user.password_meta ? 0.25 : 0;

  index += 0.25 * Math.min(methods.length, 1);

  index += 0.25 * Math.min(mfa.numVerified, 2);

  return index;
}
</script>

<style>
a.caption {
  line-height: initial;
  display: block;
  text-align: right;
}
</style>