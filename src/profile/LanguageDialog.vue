<template>
  <v-dialog v-model="dataOpen" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item-icon>
        <v-icon v-bind="attrs" v-on="on">mdi-pencil</v-icon>
      </v-list-item-icon>
    </template>

    <v-card>
      <!-- Todo add title to locales -->
      <v-card-title>Choose a language</v-card-title>
      <v-card-text>
        <v-select
          v-model="dataSelectedOption"
          :items="Object.values(options)"
          label="name"
          item-value="code"
          hide-details
        ></v-select>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-row no-gutters align="center">
          <v-col>
            <v-icon @click="setOption(dataSelectedOption)" color="success" small class="pl-2">mdi-check</v-icon>
          </v-col>

          <v-col>
            <v-icon @click="close" color="error" small class="pl-1">mdi-close</v-icon>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    selectedOption: {
      type: String,
      default: '',
    },
  },
  data: (vm) => ({
    dataOpen: vm.open,
    dataSelectedOption: vm.selectedOption,
  }),
  methods: {
    setOption(selectedOption) {
      this.$emit('selected', selectedOption)
      this.dataOpen = false
    },
    close() {
      this.$emit('close')
      this.dataOpen = false
    },
  },
}
</script>
