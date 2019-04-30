<template>
  <BasePage>
    <template v-slot:header>
      {{ $vuetify.t('$vuetify.2sv.removed.header') }}
    </template>

    <p class="py-3">
      {{ $vuetify.t('$vuetify.2sv.removed.info') }}
    </p>

    <ButtonBar>
      <v-btn to="/profile" color="warning" flat outline> 
        {{ $vuetify.t('$vuetify.2sv.removed.button.later') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn to="/2sv/intro" color="primary" flat outline> 
        {{ $vuetify.t('$vuetify.global.button.yes') }}
      </v-btn>
    </ButtonBar>
  </BasePage>
</template>
