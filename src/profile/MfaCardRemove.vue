<template>
  <v-btn @click="remove(mfaId, keyId)" color="error" outlined>
    {{ $vuetify.lang.t('$vuetify.global.button.remove') }}
  </v-btn>
</template>

<script>
import { mfa, removeWebauthn } from '@/global/mfa';

export default {
  props: ['keyId', 'mfaId'],
  methods: {
    async remove(mfaId, keyId) {
      const content = mfa.numVerified == 1 ? '$vuetify.2sv.remove.lastOne' : '$vuetify.global.areYouSure'

      if (confirm(this.$vuetify.lang.t(content))) {
        await removeWebauthn(mfaId, keyId)

        this.$router.go() // needs to result in a page reload since the password expiration is affected by the absence or presence of an mfa.
      }
    },
  },
}
</script>
