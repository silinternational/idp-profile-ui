<template>
  <v-text-field 
    ref="tf" 
    :value="value" 
    v-bind="$attrs" 
    outlined
    v-on="$listeners" />
</template>

<script>
export default {
  inheritAttrs: false,
  props: ['value'],
  mounted() {
    // had to do this since textfield's autofocus won't work during stepper transitions...
    // I chatted with John Leider in discord and he said they need to build in some better
    // teardown when components go out of "active".  Until they do that, adding a ref to the
    // text-field and forcing the focus like this will be required to get the desired ux.
    if (this.$refs.tf.autofocus) {
      this.$nextTick(this.$refs.tf.focus)
    }
  }
}
</script>

