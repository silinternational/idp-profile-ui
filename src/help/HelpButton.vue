<template>
  <v-dialog v-if="$root.idpConfig.support" v-model="isOpen" width="initial"> <!-- making it initial so card grows with content -->
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" flat dark>{{ $vuetify.t('$vuetify.help.button.help') }}</v-btn>

    </template>
    <v-card>
      <v-card-title class="headline primary white--text">{{ $vuetify.t('$vuetify.help.title') }}</v-card-title>
      
      <v-card-text>
        <p v-if="$root.idpConfig.support.phone">
          {{ $vuetify.t('$vuetify.help.phone') }}<span class="subheading"> {{ $root.idpConfig.support.phone }}</span>
        </p>
        <p v-if="$root.idpConfig.support.email">
          {{ $vuetify.t('$vuetify.help.email') }}<span class="subheading"> {{ $root.idpConfig.support.email }}</span>
        </p>
        <p v-if="$root.idpConfig.support.url">
          {{ $vuetify.t('$vuetify.help.site') }} 
          <a :href="$root.idpConfig.support.url" target="_blank" class="subheading">
            {{ $root.idpConfig.support.url }}
          </a>
        </p>
        <p v-if="$root.idpConfig.support.feedbackUrl">
          {{ $vuetify.t('$vuetify.help.feedback') }} 
          <a :href="$root.idpConfig.support.feedbackUrl" target="_blank" class="subheading">
            {{ $root.idpConfig.support.feedbackUrl }}
          </a>
        </p>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="isOpen = false">{{ $vuetify.t('$vuetify.help.button.ok') }}</v-btn>
      </v-card-actions>
    </v-card>    
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    isOpen: false,
  }),
}
</script>
