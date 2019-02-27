<template>
  <v-btn @click="remove(id)" :loading="removing" color="error" flat outline>
    {{ $vuetify.t('$vuetify.global.button.remove') }}
  </v-btn>
</template>

<script>
import { remove } from '@/global/mfa';

export default {
  props: ['id'],
  data: () => ({
    removing: false
  }),
  methods: {
    async remove(id) {
      if (confirm(this.$vuetify.t('$vuetify.global.areYouSure'))) {
        this.removing = true

        await remove(id)

        this.removing = false
      }
    }
  }
}
</script>
