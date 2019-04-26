<template>
  <BasePage>
    <template v-slot:header>
      {{ $vuetify.t('$vuetify.2sv.change.header') }}
    </template>

    <p v-if="removing">
      {{ $vuetify.t('$vuetify.2sv.change.removing') }}
    </p>
    <p v-else>
      {{ $vuetify.t('$vuetify.2sv.change.removed') }}
    </p>

    <ButtonBar>
      <v-spacer></v-spacer>
      
      <v-btn to="/profile" color="primary" flat outline> 
        {{ $vuetify.t('$vuetify.2sv.change.button.ok') }}
      </v-btn>
    </ButtonBar>
  </BasePage>
</template>

<script>
import { remove } from '@/global/mfa';

export default {
  data: () => ({
    removing: true
  }),
  async created() {
    await remove(this.$route.params.id)

    this.removing = false
  }
}
</script>