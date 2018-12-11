<template>
  <BasePage>
    <template slot="header">{{ $vuetify.t('$vuetify.password.verifyRecovery.header') }}</template>

    <p v-if="verifying">{{ $vuetify.t('$vuetify.password.verifyRecovery.verifying') }}</p>
    <p v-if="verified">{{ $vuetify.t('$vuetify.password.verifyRecovery.verified') }}</p>
    <p v-if="expired">{{ $vuetify.t('$vuetify.password.verifyRecovery.expired') }}</p>
    <p v-if="sent">{{ $vuetify.t('$vuetify.password.verifyRecovery.sent') }}</p>

    <ButtonBar>
      <v-spacer></v-spacer>
      
      <v-btn v-if="verified" to="/profile" color="primary">
        {{ $vuetify.t('$vuetify.password.verifyRecovery.button.profile') }}
      </v-btn>
    </ButtonBar>
  </BasePage>
</template>

<script>
export default {
  data: () => ({
    verifying: true,
    verified: false,
    expired: false,
    sent: false
  }),
  async created() {
    const methodId = this.$route.params.id

    try {
      await this.$API.put(`method/${methodId}`, {
        code: this.$route.query.code
      })

      this.verifying = false;
      this.verified = true;
    } catch(e) {
      this.verifying = false;

      if (e.status == 410) {
        this.expired = true;

        await this.$API.put(`method/${methodId}/resend`)
        this.sent = true;
      }
    }
  }
}
</script>

<style scoped>
</style>
