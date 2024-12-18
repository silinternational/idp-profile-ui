<template>
  <BasePage>
    <template v-slot:header>
      {{ $t('2sv.removed.header') }}
    </template>

    <p class="py-4">
      {{ $t('2sv.removed.info') }}
    </p>

    <ButtonBar>
      <v-btn to="/profile" color="warning" outlined>
        {{ $t('2sv.removed.button.later') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn to="/2sv/intro" color="primary" outlined>
        {{ $t('global.button.yes') }}
      </v-btn>
    </ButtonBar>
  </BasePage>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    someMethod() {
      console.log(this.$t('some.translation.key'))
    },
  },
})
</script>
