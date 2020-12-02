<template>
  <v-card class="fill-height d-flex flex-column">
    <v-card-title primary-title>
      <v-row no-gutters align-center>
        <v-icon :color="hide ? 'success' : ''" x-large>mdi-security</v-icon>

        <h3 class="headline pl-4">{{ $vuetify.lang.t('$vuetify.profile.index.dndCard.title') }}</h3>
      </v-row>
    </v-card-title>

    <v-card-text class="flex-grow-1">
      <p>{{ $vuetify.lang.t('$vuetify.profile.index.dndCard.info') }}</p>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>

      <v-btn @click="toggle()" :loading="toggling" color="primary" outlined>
        <span v-if="hide">{{ $vuetify.lang.t('$vuetify.profile.index.dndCard.button.disable') }}</span>
        <span v-else>{{ $vuetify.lang.t('$vuetify.profile.index.dndCard.button.enable') }}</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['dnd'],
  data: vm => ({
    hide: vm.dnd == 'yes',
    toggling: false,
  }),
  methods: {
    toggle: async function() {
      this.toggling = true

      await this.$API.put('user/me', {
        hide: this.hide ? 'no' : 'yes'
      })

      this.toggling = false
      this.hide = !this.hide
    },
  },
}
</script>
