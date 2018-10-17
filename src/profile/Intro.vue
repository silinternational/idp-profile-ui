<template>
  <BasePage>
    <template slot="header">
      {{ $vuetify.t('$vuetify.profile.intro.header', $config.idpName) }}
    </template>

    <p>
      {{ $vuetify.t('$vuetify.profile.intro.welcome', $config.idpName, $user.first_name) }}
    </p>

    <p>
      {{ $vuetify.t('$vuetify.profile.intro.explanation') }}
    </p>

    <p>
      {{ $vuetify.t('$vuetify.profile.intro.diffFromEmail') }}
    </p>

    <ButtonBar>
      <v-spacer></v-spacer>
      
      <v-btn to="/password/create" color="primary">
        {{ $vuetify.t('$vuetify.profile.intro.button.start') }}
      </v-btn>
    </ButtonBar>
  </BasePage>
</template>

