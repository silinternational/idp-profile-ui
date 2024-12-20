<template>
  <v-row v-if="editing" no-gutters align="center">
    <v-col cols="9">
      <v-text-field v-model="newLabel" autofocus @keyup.enter="save" @focus="$event.target.select()" />
    </v-col>

    <v-col>
      <v-icon color="success" size="small" class="pl-2" @click="save"> mdi-check </v-icon>
    </v-col>

    <v-col>
      <v-icon color="error" size="small" class="pl-1" @click="cancel"> mdi-close </v-icon>
    </v-col>
  </v-row>

  <v-row v-else no-gutters align="center">
    <v-col>
      <h3 class="text-h5">
        {{ label }}
      </h3>
    </v-col>

    <v-col cols="auto">
      <v-tooltip v-if="!readOnly" location="right">
        <template #activator="{ props }">
          <v-icon color="info" size="small" v-bind="props" @click="edit"> mdi-pencil </v-icon>
        </template>

        {{ $t('profile.index.rename') }}
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script>
import { change, changeWebauthn } from '@/global/mfa'

export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    keyId: {
      type: Number,
      default: null,
    },
    mfaId: {
      type: Number,
      default: null,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    isWebauthn: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['new-label'],
  data: () => ({
    editing: false,
    newLabel: '',
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
      const mfa = this.isWebauthn
        ? await changeWebauthn(this.mfaId, this.keyId, {
            label: this.newLabel,
          })
        : await change(this.mfaId, {
            label: this.newLabel,
          })
      this.$emit('new-label', mfa.label)
      this.editing = false
    },
  },
}
</script>
