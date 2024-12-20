<template>
  <BasePage>
    <template #header>
      {{ $t('2sv.change.header') }}
    </template>

    <v-alert :value="isLastOne" type="error">
      <span>{{ $t('2sv.change.lastOne') }}</span>
    </v-alert>

    <p class="py-4">
      {{ $t('2sv.change.info', [label]) }}
    </p>

    <ButtonBar>
      <v-btn to="/profile" variant="outlined">
        {{ $t('global.button.no') }}
      </v-btn>

      <v-spacer />

      <v-btn color="primary" variant="outlined" @click.once="yes(requested.id)">
        {{ $t('global.button.yes') }}
      </v-btn>
    </ButtonBar>
  </BasePage>
</template>

<script>
import { find, remove, removeWebauthn, mfa, retrieve } from '@/global/mfa'

export default {
  name: 'Change2SV',
  data: () => ({
    requested: {},
    isLastOne: mfa.numVerified === 1,
  }),
  computed: {
    label: (vm) => vm.requested?.label || '2SV',
  },
  async created() {
    await retrieve()
    this.requested = find(this.$route.params.id)
  },
  methods: {
    async yes(id) {
      if (mfa.keys.id === id) {
        await removeWebauthn(id, mfa.keys.data[0].id)
      } else {
        await remove(id)
      }

      this.$router.push('/2sv/removed')
    },
  },
}
</script>
