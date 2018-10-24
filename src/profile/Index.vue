<template>
  <BasePage>
    <template slot="header">
      <div class="layout column">
        {{ $user.first_name }} {{ $user.last_name }}
        
        <span v-if="$user.password_meta.last_login" class="caption">
          {{ $vuetify.t('$vuetify.profile.index.lastLogin', lastLogin) }}
        </span>
      </div>
      
      <v-spacer />
      
      <ProfileProgress :profile="$user"/>
    </template>

    <v-layout row wrap>
      <IndexPasswordCard :meta="$user.password_meta" class="mx-3 mb-4" />
      <IndexPasswordRecoveryCard :methods="$user.methods" class="mx-3 mb-4" />
    </v-layout>

    <v-subheader class="py-5">
      {{ $vuetify.t('$vuetify.profile.index.2sv') }}
    </v-subheader>
    <v-layout row wrap>
      <IndexTotpCard :meta="totp" class="mx-3 mb-4" />
      <IndexU2fCard :meta="u2f" class="mx-3 mb-4" />
      <IndexCodeCard :meta="codes" class="mx-3 mb-4" />
    </v-layout>
  </BasePage>
</template>

<script>
import ProfileProgress from './ProfileProgress';
import IndexPasswordCard from './IndexPasswordCard';
import IndexPasswordRecoveryCard from './IndexPasswordRecoveryCard';
import IndexTotpCard from './IndexTotpCard';
import IndexU2fCard from './IndexU2fCard';
import IndexCodeCard from './IndexCodeCard';

export default {
  components: {
    ProfileProgress,
    IndexPasswordCard,
    IndexPasswordRecoveryCard,
    IndexTotpCard,
    IndexU2fCard,
    IndexCodeCard
  },
  computed: {
    lastLogin: vm =>
      `${new Date(
        vm.$user.password_meta.last_login
      ).toLocaleString()}, Fort Mill, South Carolina, United States`,
    totp: vm => vm.$user.mfa.find(mfa => mfa.type == 'totp') || {},
    u2f: vm => vm.$user.mfa.find(mfa => mfa.type == 'u2f') || {},
    codes: vm => vm.$user.mfa.find(mfa => mfa.type == 'backupcode') || {}
  }
};
</script>
