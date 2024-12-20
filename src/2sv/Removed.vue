<template>
  <BasePage>
    <template #header>
      {{ $t('2sv.removed.header') }}
    </template>

    <p class="py-4">
      {{ $t('2sv.removed.info') }}
    </p>

    <ButtonBar>
      <v-btn to="/profile" color="warning" variant="outlined">
        {{ $t('2sv.removed.button.later') }}
      </v-btn>

      <v-spacer />

      <v-btn to="/2sv/intro" color="primary" variant="outlined">
        {{ $t('global.button.yes') }}
      </v-btn>
    </ButtonBar>
  </BasePage>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: '2svRemoved',
  methods: {
    someMethod() {
      console.log(this.$t('some.translation.key'))
    },
  },
})
</script>
