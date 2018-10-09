<template>
  <BasePage>
    <template slot="header">
      {{ $vuetify.t('$vuetify.profile.header', config.idpName) }}
    </template>

    <p>
      {{ $vuetify.t('$vuetify.profile.welcome', config.idpName, user.name) }}
    </p>

    <p>
      {{ $vuetify.t('$vuetify.profile.explanation') }}
    </p>

    <p>
      {{ $vuetify.t('$vuetify.profile.diffFromEmail') }}
    </p>

    <ButtonBar>
        <v-spacer></v-spacer>
        
        <v-btn to="/password/create" color="primary">
          {{ $vuetify.t('$vuetify.profile.buttonStartProfile') }}
        </v-btn>
    </ButtonBar>
  </BasePage>
</template>

<script>
export default {
  data: () => ({
    config: {},
    user: {}
  }),
  async created() {
    this.config = await this.$getConfig();

    this.user = await this.$getUser();
  }
};
</script>
