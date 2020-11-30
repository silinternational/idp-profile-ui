<template>
  <v-card class="fill-height d-flex flex-column">
    <v-card-title primary-title>
      <h3 class="headline">{{ $vuetify.lang.t('$vuetify.profile.index.passwordCard.title') }}</h3>

      <v-spacer />

      <v-icon v-if="isExpiringSoon()" x-large color="warning">mid-alert</v-icon>
    </v-card-title>

    <v-card-text class="flex-grow-1">
      <Attribute :name="$vuetify.lang.t('$vuetify.profile.index.passwordCard.lastChanged')"
                 :value="meta.last_changed | format"/>
      <Attribute :name="$vuetify.lang.t('$vuetify.profile.index.passwordCard.expires')"
                 :value="meta.expires | format"/>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>

      <v-btn v-if="isExpiringSoon()" :href="'#/password/create'" color="warning" outlined>
        {{ $vuetify.lang.t('$vuetify.profile.index.passwordCard.button.changeNow') }}
      </v-btn>
      <v-btn v-else :href="'#/password/create'" color="primary" outlined>
        {{ $vuetify.lang.t('$vuetify.global.button.change') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Attribute from './Attribute'
import { parseISO, subDays } from 'date-fns'

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
      return subDays(parseISO(this.meta.expires), 30) <= this.today
    }
  },
}
</script>
