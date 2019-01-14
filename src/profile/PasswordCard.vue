<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline">{{ $vuetify.t('$vuetify.profile.index.passwordCard.title') }}</h3>

      <v-spacer />

      <v-icon v-if="isExpiringSoon()" x-large color="warning">warning</v-icon>
    </v-card-title>

    <v-card-text>
      <Attribute
        :name="$vuetify.t('$vuetify.profile.index.passwordCard.lastChanged')"
        :value="meta.last_changed | format"
      />
      <Attribute
        :name="$vuetify.t('$vuetify.profile.index.passwordCard.expires')"
        :value="meta.expires | format"
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer/>

      <v-btn v-if="isExpiringSoon()" :href="'/password/create'" color="warning">
        {{ $vuetify.t('$vuetify.profile.index.button.changeNow') }}
      </v-btn>
      <v-btn v-else :href="'/password/create'" color="primary" flat>
        {{ $vuetify.t('$vuetify.global.button.change') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Attribute from './Attribute'
import { subWeeks } from 'date-fns'

export default {
  components: {
    Attribute
  },
  props: {
    meta: {
      type: Object,
      default: () => ({
        meta: {}
      })
    }
  },
  data: () => ({
    today: new Date()
  }),
  methods: {
    isExpiringSoon() {
      return subWeeks(this.meta.expires, 2) <= this.today
    }
  },
}
</script>
