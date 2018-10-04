<template>
  <BasePage>
    <template slot="header">
      {{ $vuetify.t('$vuetify.profile.header', idp.name) }}
    </template>

    <p>
      {{ $vuetify.t('$vuetify.profile.welcome', idp.name, user.name) }}
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
    idp: {
      name: 'SIL'
    },
    user: {
      name: 'Uncle Cam'
    }
  })
};
</script>
