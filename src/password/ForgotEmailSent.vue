<template>
  <BasePage>
    <template v-slot:header>{{ $vuetify.lang.t('$vuetify.password.forgotSent.header') }}</template>

    <p>{{ $vuetify.lang.t('$vuetify.password.forgotSent.emailComing') }}</p>
    <p class="pl-5 d-flex align-center font-mono">{{ primary.value }}</p>
    
    <p v-if="alternates.length">{{ $vuetify.lang.t('$vuetify.password.forgotSent.alternates') }}</p>
    <p v-for="alternate in alternates" :key="alternate.id" class="pl-5 d-flex">
      <span class="font-mono">{{ alternate.value }}</span>

      <v-tooltip v-if="alternate.id == sent" right>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" color="success" small class="pl-4">mdi-check</v-icon>
        </template>

        {{ $vuetify.lang.t('$vuetify.password.forgotSent.too') }}
      </v-tooltip>
      <v-tooltip v-else right>
        <template v-slot:activator="{ on }">
          <v-icon @click="resend(alternate)" v-on="on" color="secondary" small class="pl-4">mdi-send</v-icon>
        </template>
        
        {{ $vuetify.lang.t('$vuetify.password.forgotSent.instead') }}
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
  }),
  async created() {
    const reset = await this.$API.get(`reset/${this.$route.params.id}`)

    this.primary = reset.methods.find(m => m.type == 'primary')
    this.alternates = reset.methods.filter(m => m.type != 'primary')
  },
  methods: {
    async resend(method) {
      await this.$API.put(`reset/${this.$route.params.id}`, method)

      this.sent = method.id
    },
  },
}
</script>

<style scoped>
.font-mono {
  font-family: monospace;
}
</style>