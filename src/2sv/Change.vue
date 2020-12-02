<template>
  <BasePage>
    <template v-slot:header>
      {{ $vuetify.lang.t('$vuetify.2sv.change.header') }}
    </template>

    <v-alert :value="isLastOne" type="error">
      <span>{{ $vuetify.lang.t('$vuetify.2sv.change.lastOne') }}</span>
    </v-alert>

    <p class="py-4">
      {{ $vuetify.lang.t('$vuetify.2sv.change.info', label) }}
    </p>

    <ButtonBar>
      <v-btn to="/profile" outlined> 
        {{ $vuetify.lang.t('$vuetify.global.button.no') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn @click.once="yes(requested.id)" color="primary" outlined> 
        {{ $vuetify.lang.t('$vuetify.global.button.yes') }}
      </v-btn>
    </ButtonBar>
  </BasePage>
</template>

<script>
import { find, remove, mfa } from '@/global/mfa';

export default {
  data: () => ({
    requested: {},
  isLastOne: mfa.numVerified === 1
  }),
  computed: {
    label: vm => vm.requested && vm.requested.label || '2SV'
  },
  methods: {
    async yes(id) {
      await remove(id)

      this.$router.push('/2sv/removed')
    },
  },
  created() {
    this.requested = find(this.$route.params.id)
  },
}
</script>