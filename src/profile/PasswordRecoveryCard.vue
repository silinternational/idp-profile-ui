koc
<template>
  <v-card class="layout column">
    <v-card-title primary-title>
      <h3 class="headline">{{ $vuetify.t('$vuetify.profile.index.passwordRecoveryCard.title') }}</h3>
    </v-card-title>

    <v-card-text class="grow">
      <div v-for="method in decoratedMethods" :key="method.value">
        {{ method.value }}

        <v-tooltip v-if="method.verified == false" right>
          <v-icon slot="activator" color="warning" small class="pl-1">warning</v-icon>
          {{ $vuetify.t('$vuetify.profile.index.passwordRecoveryCard.unverified') }}
        </v-tooltip>

        <a v-if="method.resendable" @click="resend(method)" class="caption pl-2">
          {{ $vuetify.t('$vuetify.profile.index.passwordRecoveryCard.resend') }}
        </a>
      </div>
      <div v-if="! methods.length" class="layout row align-center">
        <v-icon x-large color="warning" class="pr-3">warning</v-icon>
        <em>{{ $vuetify.t('$vuetify.profile.index.passwordRecoveryCard.warning') }}</em>
      </div>
    </v-card-text>      

    <v-card-actions>
      <v-spacer />
      
      <v-btn color="primary" flat>
        <!-- TODO: need to make these buttons point to the right place in the wizard -->
        <span v-if="methods.length">{{ $vuetify.t('$vuetify.global.button.change') }}</span>
        <span v-else>{{ $vuetify.t('$vuetify.global.button.add') }}</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    methods: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    decoratedMethods: vm =>
      vm.methods.map(method => {
        vm.$set(
          method,
          'resendable',
          method.hasOwnProperty('verified') && !method.verified
        );

        return method;
      })
  },
  methods: {
    resend: async function(method) {
      await this.$API.put(`method/${method.id}/resend`);

      method.resendable = false;
    }
  }
};
</script>
