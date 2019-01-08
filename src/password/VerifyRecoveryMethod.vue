<template>
  <BasePage>
    <template slot="header">{{ $vuetify.t('$vuetify.password.verifyRecovery.header') }}</template>

    <p v-if="verifying">{{ $vuetify.t('$vuetify.password.verifyRecovery.verifying') }}</p>
    <p v-if="verified">{{ $vuetify.t('$vuetify.password.verifyRecovery.verified') }}</p>
    <p v-if="expired">{{ $vuetify.t('$vuetify.password.verifyRecovery.expired') }}</p>

    <ButtonBar>
      <v-spacer></v-spacer>
      
      <v-btn v-if="verified" to="/profile" color="primary">
        {{ $vuetify.t('$vuetify.password.verifyRecovery.button.profile') }} <!-- TODO: if this page ends up requiring authn, this content will need to change  -->
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
  }),
  async created() {
    try {
      await this.$API.put(`method/${this.$route.params.id}/verify`, { code: this.$route.query.code })

      this.verified = true
    } catch(e) {
      this.expired = e.status == 410
      //TODO: need an invalid message as well, i.e., e.status != 410
    } finally {
      this.verifying = false
    }
  },
}
</script>
