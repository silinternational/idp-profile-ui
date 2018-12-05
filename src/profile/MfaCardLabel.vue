<template>
  <v-layout v-if="editing" row align-center>
    <v-text-field v-if="editing" v-model="newLabel" autofocus @focus="$event.target.select()"/>

    <v-icon @click="save" color="success" small class="pl-2">check</v-icon>
    <v-icon @click="cancel" color="error" small class="pl-1">close</v-icon>
  </v-layout>
  <h3 v-else class="headline pl-3 layout row align-center">
    {{ label }}
    <v-icon @click="edit" color="info" small class="pl-2">edit</v-icon>
  </h3>
</template>

<script>
export default {
  props: ["label", "id"],
  data: () => ({
    editing: false,
    newLabel: ""
  }),
  methods: {
    edit() {
      this.editing = true;
      this.newLabel = this.label;
    },
    cancel() {
      this.editing = false;
    },
    async save() {
      const mfa = await this.$API.put(`method/${this.id}`, {
        label: this.newLabel
      });

      this.$emit("new-label", mfa.label);
      this.editing = false;
    }
  }
};
</script>

