<template>
  <v-btn @click="remove(id)" color="error" flat>
    {{ $vuetify.t('$vuetify.global.button.remove') }}
  </v-btn>
</template>

<script>
export default {
  props: ['id'],
  methods: {
    async remove(id) {
      if (confirm(this.$vuetify.t('$vuetify.global.areYouSure'))) {
        await this.$API.delete(`mfa/${id}`);

        this.$emit('removed');
      }
    }
  }
};
</script>

