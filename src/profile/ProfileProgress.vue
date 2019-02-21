<template>
  <v-layout column align-end>
    <span class="body-2">{{ $vuetify.t('$vuetify.profile.progress.header') }}</span>

    <meter low="0.5" high="0.8" optimum="1" :value="complete" class="pb-3"/>
    
    <a v-if="complete < 1 && ! profile.alternates.length" href="/password/recovery" class="caption">{{ $vuetify.t('$vuetify.profile.progress.addMethod') }}</a>
    <a v-if="complete < 1 && ! smartphones.length" href="/2sv/smartphone/intro" class="caption">{{ $vuetify.t('$vuetify.profile.progress.addTotp') }}</a>
    <a v-if="complete < 1 && ! u2fs.length" href="/2sv/usb-security-key/intro" class="caption">{{ $vuetify.t('$vuetify.profile.progress.addU2f') }}</a>
    <a v-if="complete < 1 && ! backups.length" href="/2sv/printable-backup-codes/intro" class="caption">{{ $vuetify.t('$vuetify.profile.progress.addCodes') }}</a>
  </v-layout>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      default: () => ({
        profile: {
          alternates: [],
          mfas: [],
          user: {}
        }
      })
    }
  },
  computed: {
    complete: vm => deriveCompleteness(vm.profile.user, vm.verifiedMethods, vm.profile.mfas),
    verifiedMethods: vm => vm.profile.alternates.filter(m => m.verified),
    smartphones: vm => vm.profile.mfas.filter(m => m.type == 'totp'),
    u2fs: vm => vm.profile.mfas.filter(m => m.type == 'u2f'),
    backups: vm => vm.profile.mfas.filter(m => m.type == 'backupcode')
  }
};

function deriveCompleteness(user, methods, mfas) {
  let index = user.password_meta ? 0.25 : 0;

  index += 0.25 * Math.min(methods.length, 1);

  index += 0.25 * Math.min(mfas.length, 2);

  return index;
}
</script>

<style>
a.caption {
  line-height: initial;
}
</style>