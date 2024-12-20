<template>
  <v-card class="fill-height d-flex flex-column">
    <v-card-title primary-title>
      <v-row no-gutters align-center>
        <v-icon :color="hide ? 'success' : ''" size="x-large">mdi-security</v-icon>

        <h3 class="text-h5 pl-4">{{ $t('profile.index.dndCard.title') }}</h3>
      </v-row>
    </v-card-title>

    <v-card-text class="flex-grow-1">
      <p>{{ $t('profile.index.dndCard.info') }}</p>
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn :loading="toggling" color="primary" variant="outlined" @click="toggle()">
        <span v-if="hide">{{ $t('profile.index.dndCard.button.disable') }}</span>
        <span v-else>{{ $t('profile.index.dndCard.button.enable') }}</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    dnd: {
      type: String,
      required: true,
    },
  },
  data: (vm) => ({
    hide: vm.dnd == 'yes',
    toggling: false,
  }),
  methods: {
    toggle: async function () {
      this.toggling = true

      await this.$API.put('user/me', {
        hide: this.hide ? 'no' : 'yes',
      })

      this.toggling = false
      this.hide = !this.hide
    },
  },
}
</script>
