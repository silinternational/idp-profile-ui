<template>
  <v-card class="fill-height layout column">
    <v-card-title primary-title>
      <v-layout row align-center>
        <v-icon :color="hide ? 'success' : ''" x-large>security</v-icon>

        <h3 class="headline pl-3">{{ $vuetify.t('$vuetify.profile.index.dndCard.title') }}</h3>
      </v-layout>
    </v-card-title>

    <v-card-text class="grow">
      <p>{{ $vuetify.t('$vuetify.profile.index.dndCard.info') }}</p>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>

      <v-btn @click="toggle()" color="primary" flat outline>
        <span v-if="hide">{{ $vuetify.t('$vuetify.profile.index.dndCard.button.disable') }}</span>
        <span v-else>{{ $vuetify.t('$vuetify.profile.index.dndCard.button.enable') }}</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['dnd'],
  data: vm => ({
    hide: vm.dnd == 'yes'
  }),
  methods: {
    toggle: async function() {
      await this.$API.put('user/me', {
        hide: this.hide ? 'no' : 'yes'
      })

      this.hide = !this.hide
    }
  },
}
</script>
