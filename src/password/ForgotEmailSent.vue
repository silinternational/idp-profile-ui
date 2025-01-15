<template>
  <BasePage>
    <template #header>{{ $t('password.forgotSent.header') }}</template>

    <p>{{ $t('password.forgotSent.emailComing') }}</p>
    <p class="pl-5 d-flex align-center font-mono">{{ primary.value }}</p>

    <p v-if="alternates.length">{{ $t('password.forgotSent.alternates') }}</p>
    <p v-for="alternate in alternates" :key="alternate.id" class="pl-5 d-flex">
      <span class="font-mono">{{ alternate.value }}</span>

      <v-tooltip v-if="alternate.id == sent" location="right">
        <template #activator="{ props }">
          <v-icon v-bind="props" color="success" size="medium" class="pl-4"> mdi-check </v-icon>
        </template>

        {{ $t('password.forgotSent.too') }}
      </v-tooltip>
      <v-tooltip v-else location="right">
        <template #activator="{ props }">
          <v-icon v-bind="props" color="info" size="large" class="pl-4" @click="resend(alternate)"> mdi-send </v-icon>
        </template>

        {{ $t('password.forgotSent.instead') }}
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

    this.primary = reset.methods.find((m) => m.type == 'primary')
    this.alternates = reset.methods.filter((m) => m.type != 'primary')
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
