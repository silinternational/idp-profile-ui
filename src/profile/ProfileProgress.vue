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
          mfas: []
        }
      })
    }
  },
  computed: {
    progress: vm => deriveIndex(vm.profile)
  },
  created() {},
  methods: {}
};

function deriveIndex(profile) {
  //TODO: need to discuss this algorithm.
  let index = 0;

  if (profile.recoveryMethods.length > 1) {
    index += 0.25;
  }

  index += 0.25 * profile.mfas.length;

  return index > 1 ? 1 : index;
}
</script>

<style scoped>
progress {
  width: 7em;
}
</style>

