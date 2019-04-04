<template>
  <BasePage>
    <template slot="header">
      {{ $vuetify.t('$vuetify.profile.intro.header', $root.idpConfig.idpName, $user.first_name) }}
    </template>

    <p>
      {{ $vuetify.t('$vuetify.profile.intro.explanation') }}
    </p>

    <iframe width="560" height="315" src="https://www.youtube.com/embed/kXDeNWDlEqk?rel=0" 
            frameborder="0" allow="autoplay; encrypted-media;" allowfullscreen class="pa-3" />

    <ButtonBar>
      <v-spacer></v-spacer>
      
      <v-btn to="/password/create" color="primary" outline>
        {{ $vuetify.t('$vuetify.profile.intro.button.start') }}
      </v-btn>
    </ButtonBar>
  </BasePage>
</template>

