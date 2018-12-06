<template>
  <v-card>
    <v-card-title primary-title>
      <v-layout row align-center>
        <v-icon x-large>list_alt</v-icon>

        <MfaCardLabel :label="label" :id="meta.id" @new-label="label = $event"/>
      </v-layout>
    </v-card-title>

    <v-card-text>
      <Attribute
        v-if="meta.created_utc"
        :name="$vuetify.t('$vuetify.profile.index.codeCard.created')"
        :value="meta.created_utc | format"
      />
      <Attribute
        v-if="meta.created_utc"
        :name="$vuetify.t('$vuetify.profile.index.codeCard.remaining')"
        :value="meta.data.count"
      />
      <div v-else class="layout row align-center">
        <v-icon x-large color="warning" class="pr-3">warning</v-icon>
        <em>{{ $vuetify.t('$vuetify.profile.index.codeCard.warning') }}</em>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>

      <v-btn
        v-if="meta.created_utc"
        href="/2sv/printable-backup-codes/new"
        color="primary"
        flat
      >{{ $vuetify.t('$vuetify.profile.index.codeCard.button.replace') }}</v-btn>
      <v-btn
        v-else
        href="/2sv/printable-backup-codes/intro"
        color="primary"
        flat
      >{{ $vuetify.t('$vuetify.profile.index.codeCard.button.add') }}</v-btn>
      <MfaCardRemove v-if="meta.created_utc" :id="meta.id" @removed="$router.go()"/>
    </v-card-actions>
  </v-card>
</template>

<script>
import Attribute from "./Attribute";
import MfaCardLabel from "./MfaCardLabel";
import MfaCardRemove from "./MfaCardRemove";

export default {
  components: {
    Attribute,
    MfaCardLabel,
    MfaCardRemove
  },
  props: ["meta"],
  data: vm => ({
    label:
      vm.meta.label || vm.$vuetify.t("$vuetify.profile.index.codeCard.title")
  })
};
</script>
