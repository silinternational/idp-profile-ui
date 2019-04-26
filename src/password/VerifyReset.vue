<template>
  <BasePage>
    <template v-slot:header>{{ $vuetify.t('$vuetify.password.reset.verify.header') }}</template>

    <p v-if="verifying">{{ $vuetify.t('$vuetify.password.reset.verify.verifying') }}</p>
    <p v-if="verified">{{ $vuetify.t('$vuetify.password.reset.verify.verified') }}</p>
    <p v-if="expired">{{ $vuetify.t('$vuetify.password.reset.verify.expired') }}</p>
    <p v-if="invalid">{{ $vuetify.t('$vuetify.password.reset.verify.invalid') }}</p>

    <ButtonBar>
      <v-spacer></v-spacer>
      
      <v-btn v-if="verified" to="/password/create" color="primary" outline>
        {{ $vuetify.t('$vuetify.password.reset.verify.button.create') }}
      </v-btn>
      <v-btn v-if="invalid" to="/password/forgot" color="primary" outline>
        {{ $vuetify.t('$vuetify.password.reset.verify.button.again') }}
      </v-btn>
    </ButtonBar>
  </BasePage>
</template>

<script>
import token from '@/global/token'

export default {
  data: () => ({
    verifying: true,
    verified: false,
    expired: false,
    invalid: false,
  }),
  async created() {
    try {
      const { access_token } = await this.$API.put(`reset/${this.$route.params.id}/validate`, { 
        'client_id': token.key(),
        code: this.$route.params.code,
      })

      token.setAccessToken(access_token)

      await this.$user.refresh()
  
      this.verified = true
    } catch(e) {
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
