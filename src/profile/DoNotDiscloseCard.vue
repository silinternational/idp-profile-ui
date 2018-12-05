<template>
  <v-card class="layout column">
    <v-card-title primary-title>
      <h3 class="headline">{{ $vuetify.t('$vuetify.profile.index.dndCard.title') }}</h3>
    </v-card-title>

    <v-card-text>{{ $vuetify.t('$vuetify.profile.index.dndCard.info') }}</v-card-text>

    <v-card-actions>
      <v-spacer/>

      <v-btn @click="toggle()" color="primary" flat>
        <span v-if="dnd == 'yes'">{{ $vuetify.t('$vuetify.profile.index.dndCard.button.disable') }}</span>
        <span v-else>{{ $vuetify.t('$vuetify.profile.index.dndCard.button.enable') }}</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template >

<script>
export default {
  props: ["dnd"],
  methods: {
    toggle: function() {
      this.$API.put("user/me", {
        do_not_disclose: this.dnd == "yes" ? "no" : "yes"
      });
    }
  }
};
</script>
