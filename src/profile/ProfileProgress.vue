<template>
  <progress :value="progress"></progress>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      default: () => ({
        profile: {
          recoveryMethods: [],
          mfas: [],
          user: {}
        }
      })
    }
  },
  computed: {
    progress: vm => deriveCompleteness(vm.profile)
  }
};

function deriveCompleteness(profile) {
  let index = profile.user.password_meta ? 0.25 : 0;

  index += 0.25 * Math.min(profile.recoveryMethods.length, 1);

  index += 0.25 * Math.min(profile.mfas.length, 2);

  return index;
}
</script>

<style scoped>
progress {
  width: 7em;
}
</style>

