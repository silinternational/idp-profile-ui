<template>
  <v-btn @click="remove(id)" color="error" outlined>
    {{ $vuetify.lang.t('$vuetify.global.button.remove') }}
  </v-btn>
</template>

<script>
import { mfa, remove } from '@/global/mfa';

export default {
  props: ['id'],
  methods: {
    async remove(id) {
      const content = mfa.numVerified == 1 ? '$vuetify.2sv.remove.lastOne' : '$vuetify.global.areYouSure'

      if (confirm(this.$vuetify.lang.t(content))) {
        await remove(id)

        this.$router.go() // needs to result in a page reload since the password expiration is affected by the absence or presence of an mfa.
      }
    },
  },
}
</script>
