<template>
  <BasePage>
    <template slot="header">
      {{ $vuetify.t('$vuetify.2sv.lost.header') }}
    </template>

    <p v-if="removing">
      {{ $vuetify.t('$vuetify.2sv.lost.removing') }}
    </p>
    <p v-else>
      {{ $vuetify.t('$vuetify.2sv.lost.removed') }}
    </p>

    <ButtonBar>
      <v-spacer></v-spacer>
      
      <v-btn to="/profile" color="primary" flat> 
        {{ $vuetify.t('$vuetify.2sv.lost.button.ok') }}
      </v-btn>
    </ButtonBar>
  </BasePage>
</template>

<script>
export default {
  data: () => ({
    removing: true
  }),
  async created() {
    await this.$API.delete(`mfa/${this.$route.params.id}`)

    this.removing = false
  }
}
</script>