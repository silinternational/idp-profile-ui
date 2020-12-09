<template>
  <v-dialog v-if="$root.idpConfig.support" v-model="isOpen" width="initial"> <!-- making it initial so card grows with content -->
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" text dark :icon="mobile" class="mx-1">{{ !mobile ? $vuetify.lang.t('$vuetify.help.button.help') : '' }}<v-icon v-if="mobile">mdi-help</v-icon></v-btn>

    </template>
    <v-card>
      <v-card-title class="headline primary white--text">{{ $vuetify.lang.t('$vuetify.help.title') }}</v-card-title>
      
      <v-card-text>
        <p v-if="$root.idpConfig.support.phone">
          {{ $vuetify.lang.t('$vuetify.help.phone') }}<span class="subtitle-1"> {{ $root.idpConfig.support.phone }}</span>
        </p>
        <p v-if="$root.idpConfig.support.email">
          {{ $vuetify.lang.t('$vuetify.help.email') }}<span class="subtitle-1"> {{ $root.idpConfig.support.email }}</span>
        </p>
        <p v-if="$root.idpConfig.support.url">
          {{ $vuetify.lang.t('$vuetify.help.site') }} 
          <a :href="$root.idpConfig.support.url" target="_blank" class="subtitle-1">
            {{ $root.idpConfig.support.url }}
          </a>
        </p>
        <p v-if="$root.idpConfig.support.feedbackUrl">
          {{ $vuetify.lang.t('$vuetify.help.feedback') }} 
          <a :href="$root.idpConfig.support.feedbackUrl" target="_blank" class="subtitle-1">
            {{ $root.idpConfig.support.feedbackUrl }}
          </a>
        </p>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="isOpen = false">{{ $vuetify.lang.t('$vuetify.help.button.ok') }}</v-btn>
      </v-card-actions>
    </v-card>    
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    isOpen: false,
  }),
  computed: {
    mobile () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return true
          default: return false
        }
      },
  },
}
</script>
