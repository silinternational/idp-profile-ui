<template>
  <v-card>
    <v-card-title primary-title>
      <v-layout row align-center>
        <v-icon x-large>vpn_key</v-icon>

        <MfaCardLabel
          :label="meta.label || $vuetify.t('$vuetify.profile.index.u2fCard.title')"
          :id="meta.id"
          @new-label="meta.label = $event"
        />
      </v-layout>
    </v-card-title>

    <v-card-text>
      <Attribute
        v-if="meta.created_utc"
        :name="$vuetify.t('$vuetify.profile.index.u2fCard.created')"
        :value="meta.created_utc | format"
      />
      <div v-else class="layout row align-center">
        <v-icon x-large color="warning" class="pr-3">warning</v-icon>
        <em>{{ $vuetify.t('$vuetify.profile.index.u2fCard.warning') }}</em>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>

      <v-btn
        v-if="meta.created_utc"
        color="primary"
        flat
      >{{ $vuetify.t('$vuetify.profile.index.u2fCard.button.lost') }}</v-btn>
      <v-btn
        v-else
        href="/2sv/usb-security-key/intro"
        color="primary"
        flat
      >{{ $vuetify.t('$vuetify.global.button.add') }}</v-btn>
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
  props: {
    meta: {
      type: Object,
      default: () => ({
        meta: {}
      })
    }
  }
};
</script>
