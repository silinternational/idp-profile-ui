<template>
  <v-row v-if="editing" no-gutters align="center">
    <v-col cols="9">
      <v-text-field v-model="newLabel" @keyup.enter="save" autofocus @focus="$event.target.select()"/>
    </v-col>

    <v-col>
      <v-icon @click="save" color="success" small class="pl-2">mdi-check</v-icon>
    </v-col>

    <v-col>
      <v-icon @click="cancel" color="error" small class="pl-1">mdi-close</v-icon>
    </v-col>
  </v-row >

  <v-row v-else no-gutters align="center">
    <v-col>
      <h3 class="headline">
        {{ label }}
      </h3>
    </v-col>
    
    <v-col cols="auto">
      <v-tooltip v-if="id && ! readOnly" right>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" @click="edit" color="info" small>
            mdi-pencil
          </v-icon>
        </template>

        {{ $vuetify.lang.t('$vuetify.profile.index.rename') }}
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script>
import { change } from '@/global/mfa'

export default {
  props: {
    label: {
      type: String,
    }, 
    id: {
      type: Number,
    }, 
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    editing: false,
    newLabel: ''
  }),
  methods: {
    edit() {
      this.editing = true
      this.newLabel = this.label
    },
    cancel() {
      this.editing = false
    },
    async save() {
      const mfa = await change(this.id, {
        label: this.newLabel
      })

      this.$emit('new-label', mfa.label)
      this.editing = false
    },
  },
}
</script>