<template>
  <v-btn color="error" variant="outlined" @click="remove(mfaId, keyId)">
    {{ $t('global.button.remove') }}
  </v-btn>
</template>

<script>
import { mfa, remove, removeWebauthn } from '@/global/mfa'

export default {
  props: {
    keyId: {
      type: String,
      required: false,
      default: '',
    },
    mfaId: {
      type: String,
      required: true,
    },
  },
  methods: {
    async remove(mfaId, keyId) {
      const content = mfa.numVerified == 1 ? '2sv.remove.lastOne' : 'global.areYouSure'

      if (confirm(this.$t(content))) {
        if (keyId) {
          await removeWebauthn(mfaId, keyId)
        } else {
          await remove(mfaId)
        }

        this.$router.go() // needs to result in a page reload since the password expiration is affected by the absence or presence of an mfa.
      }
    },
  },
}
</script>
