<template>
  <v-card>
    <v-card-title primary-title>
      <v-layout row align-center>
        <v-icon :color="dnd =='yes' ? 'success' : ''" x-large>security</v-icon>

        <h3 class="headline pl-3">{{ $vuetify.t('$vuetify.profile.index.dndCard.title') }}</h3>
      </v-layout>
    </v-card-title>

    <v-card-text>
      <p>{{ $vuetify.t('$vuetify.profile.index.dndCard.info') }}</p>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>

      <v-btn @click="toggle()" color="primary" flat>
        <span v-if="dnd == 'yes'">{{ $vuetify.t('$vuetify.profile.index.dndCard.button.disable') }}</span>
        <span v-else>{{ $vuetify.t('$vuetify.profile.index.dndCard.button.enable') }}</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["dnd"],
  methods: {
    toggle: async function() {
      await this.$API.put("user/me", {
        hide: this.dnd == "yes" ? "no" : "yes"
      });

      this.$router.go();
    }
  }
};
</script>
