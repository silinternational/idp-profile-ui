<template>
  <v-btn @click="remove(id)" color="error" flat outline>
    {{ $vuetify.t('$vuetify.global.button.remove') }}
  </v-btn>
</template>

<script>
import { remove } from '@/global/mfa';

export default {
  props: ['id'],
  methods: {
    async remove(id) {
      if (confirm(this.$vuetify.t('$vuetify.global.areYouSure'))) {
        await remove(id)

        this.$router.go() // needs to result in a page reload since the password expiration is affected by the absence or presence of an mfa.
      }
    },
  },
}
</script>
