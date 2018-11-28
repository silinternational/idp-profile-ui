<template>
  <BasePage>
    <template slot="header">
      <div class="layout column">
        {{ $vuetify.t('$vuetify.profile.index.header', $config.idpName) }}
        
        <span v-if="$user.password_meta.last_login" class="caption">
          {{ $vuetify.t('$vuetify.profile.index.lastLogin', lastLogin) }}
        </span>
      </div>
      
      <v-spacer />
      <ProfileProgress :profile="{recoveryMethods, mfas, user: $user}"/>
    </template>

    <v-layout row wrap>
      <PasswordCard :meta="$user.password_meta" class="mx-3 mb-4" />
      <PasswordRecoveryCard :methods="recoveryMethods" class="mx-3 mb-4" />
    </v-layout>

    <v-subheader class="py-5">
      {{ $vuetify.t('$vuetify.profile.index.2sv') }}
    </v-subheader>
    <v-layout row wrap>
      <TotpCard :meta="totp" class="mx-3 mb-4" />
      <U2fCard :meta="u2f" class="mx-3 mb-4" />
      <BackupCodeCard :meta="codes" class="mx-3 mb-4" />
    </v-layout>
  </BasePage>
</template>

<script>
import ProfileProgress from './ProfileProgress';
import PasswordCard from './PasswordCard';
import PasswordRecoveryCard from './PasswordRecoveryCard';
import TotpCard from './TotpCard';
import U2fCard from './U2fCard';
import BackupCodeCard from './BackupCodeCard';

export default {
  components: {
    ProfileProgress,
    PasswordCard,
    PasswordRecoveryCard,
    TotpCard,
    U2fCard,
    BackupCodeCard
  },
  data: () => ({
    recoveryMethods: [],
    mfas: []
  }),
  async created() {
    const methodPromise = this.$API.get('method');
    const mfaPromise = this.$API.get('mfa');

    this.recoveryMethods = await methodPromise;
    this.mfas = await mfaPromise;
  },
  computed: {
    lastLogin: vm =>
      `${new Date(
        vm.$user.password_meta.last_login
      ).toLocaleString()}, Fort Mill, South Carolina, United States`,
    totp: vm => vm.mfas.find(mfa => mfa.type == 'totp') || {},
    u2f: vm => vm.mfas.find(mfa => mfa.type == 'u2f') || {},
    codes: vm => vm.mfas.find(mfa => mfa.type == 'backupcode') || {}
  }
};
</script>
