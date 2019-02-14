<template>
  <BasePage>
    <template slot="header">
      {{ $vuetify.t('$vuetify.profile.intro.header', $root.idpConfig.idpName) }}
    </template>

    <p>
      {{ $vuetify.t('$vuetify.profile.intro.welcome', $root.idpConfig.idpName, $user.first_name) }}
    </p>

    <p>
      {{ $vuetify.t('$vuetify.profile.intro.explanation') }}
    </p>

    <p>
      {{ $vuetify.t('$vuetify.profile.intro.diffFromEmail') }}
    </p>

    <ButtonBar>
      <v-spacer></v-spacer>
      
      <v-btn to="/password/create" color="primary" outline>
        {{ $vuetify.t('$vuetify.profile.intro.button.start') }}
      </v-btn>
    </ButtonBar>
  </BasePage>
</template>

