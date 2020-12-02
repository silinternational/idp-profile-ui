<template>
  <BasePage>
    <template v-slot:header>
      {{ $vuetify.lang.t('$vuetify.profile.intro.header', $root.idpConfig.idpName, $user.first_name) }}
    </template>

    <v-row justify="center">
      <p class="mx-4">
        {{ $vuetify.lang.t('$vuetify.profile.intro.explanation') }}
      </p>

      <iframe width="560" height="315" src="https://www.youtube.com/embed/kXDeNWDlEqk?rel=0" 
              frameborder="0" allow="autoplay; encrypted-media;" allowfullscreen class="pa-4" />
    </v-row>

    <ButtonBar class="mt-5">
      <v-spacer></v-spacer>

      <v-col cols="auto" class="mr-4 align-self-center">
        {{ $vuetify.lang.t('$vuetify.profile.intro.username') }} <strong class="body-2">{{ $user.idp_username }}</strong>
      </v-col>

      <v-spacer></v-spacer>

      <v-col cols="auto">
        <v-btn to="/password/create" color="primary" outlined>
          {{ $vuetify.lang.t('$vuetify.profile.intro.button.start') }}
        </v-btn>
      </v-col>

      <v-spacer></v-spacer>
    </ButtonBar>
  </BasePage>
</template>
