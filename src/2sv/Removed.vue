<template>
  <BasePage>
    <template v-slot:header>
      {{ $vuetify.lang.t('$vuetify.2sv.removed.header') }}
    </template>

    <p class="py-3">
      {{ $vuetify.lang.t('$vuetify.2sv.removed.info') }}
    </p>

    <ButtonBar>
      <v-btn to="/profile" color="warning" text outlined> 
        {{ $vuetify.lang.t('$vuetify.2sv.removed.button.later') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn to="/2sv/intro" color="primary" text outlined> 
        {{ $vuetify.lang.t('$vuetify.global.button.yes') }}
      </v-btn>
    </ButtonBar>
  </BasePage>
</template>
