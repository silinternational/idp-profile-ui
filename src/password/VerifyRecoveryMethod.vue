<template>
  <BasePage>
    <template #header> {{ $t('password.verifyRecovery.header') }} </template>

    <p v-if="verifying">{{ $t('password.verifyRecovery.verifying') }}</p>
    <p v-if="verified">{{ $t('password.verifyRecovery.verified') }}</p>
    <p v-if="expired">{{ $t('password.verifyRecovery.expired') }}</p>
    <p v-if="invalid">{{ $t('password.verifyRecovery.invalid') }}</p>

    <ButtonBar>
      <v-spacer></v-spacer>

      <v-btn v-if="verified" to="/profile" color="primary" variant="outlined">
        {{ $t('password.verifyRecovery.button.profile') }}
      </v-btn>
      <v-btn v-if="invalid" to="/password/recovery" color="primary" variant="outlined">
        {{ $t('password.verifyRecovery.button.again') }}
      </v-btn>
    </ButtonBar>
  </BasePage>
</template>

<script>
import { verify } from '@/global/recoveryMethods'

export default {
  data: () => ({
    verifying: true,
    verified: false,
    expired: false,
    invalid: false,
  }),
  async created() {
    try {
      await verify(this.$route.params.id, this.$route.params.code)

      this.verified = true
    } catch (e) {
      if (e.status == 410) {
        this.expired = true
      } else {
        this.invalid = true
      }
    } finally {
      this.verifying = false
    }
  },
}
</script>
