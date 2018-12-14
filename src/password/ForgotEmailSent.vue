<template>
  <BasePage>
    <template slot="header">{{ $vuetify.t('$vuetify.password.forgotSent.header') }}</template>

    <p>{{ $vuetify.t('$vuetify.password.forgotSent.emailComing') }}</p>
    <p class="pl-5 layout row align-center">
      <span clas="body-2 font-mono">{{ primary.value }}</span>

      <v-tooltip v-if="againable" right>
        <v-icon @click="again()" slot="activator" color="secondary" small class="pl-3">autorenew</v-icon>
        {{ $vuetify.t('$vuetify.password.forgotSent.again') }}
      </v-tooltip>
    </p>
    
    <p v-if="alternates.length">{{ $vuetify.t('$vuetify.password.forgotSent.alternates') }}</p>
    <p v-for="alternate in alternates" :key="alternate.id" class="pl-5 font-mono layout row">
      {{ alternate.value }}

      <v-tooltip v-if="alternate.id == sent" right>
        <v-icon slot="activator" color="success" small class="pl-3">check</v-icon>
        {{ $vuetify.t('$vuetify.password.forgotSent.too') }}
      </v-tooltip>
      <v-tooltip v-else right>
        <v-icon @click="resend(alternate)" slot="activator" color="secondary" small class="pl-3">send</v-icon>
        {{ $vuetify.t('$vuetify.password.forgotSent.instead') }}
      </v-tooltip>
    </p>
  </BasePage>
</template>

<script>
export default {
  data: () => ({
    primary: {},
    alternates: [],
    sent: '',
    againable: false
  }),
  async created() {
    const reset = await this.$API.get(`reset/${this.$route.params.id}`)

    setTimeout(() => this.againable = true, ONE_MINUTE)

    this.primary = reset.methods.find(m => m.type == 'primary')
    this.alternates = reset.methods.filter(m => m.type != 'primary')
  },
  methods: {
    async resend(method) {
      await this.$API.put(`reset/${this.$route.params.id}`, method)

      this.sent = method.id
    },
    async again() {
      await this.$API.put(`reset/${this.$route.params.id}/resend`)

      this.againable = false

      setTimeout(() => this.againable = true, ONE_MINUTE)
    }
  }
}

const ONE_MINUTE = 60000;
</script>

<style scoped>
.font-mono {
  font-family: monospace;
}
</style>