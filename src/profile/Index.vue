<template>
  <BasePage>
    <template slot="header">
      <div class="layout column">
        {{ $user.first_name }} {{ $user.last_name }}
        
        <span v-if="$user.password_meta.last_login" class="caption">
          {{ $vuetify.t('$vuetify.profile.index.lastLogin', lastLogin) }}
        </span>
      </div>
      
      <ProfileProgress :profile="$user"/>
    </template>

    <v-layout row wrap>
      <IndexPasswordCard :meta="$user.password_meta" class="mx-3 mb-4" />
      <IndexPasswordRecoveryCard :methods="$user.methods" class="mx-3 mb-4" />
    </v-layout>

    <v-subheader class="py-5">2-Step Verification</v-subheader>
    <v-layout row wrap>
      <template v-for="mfa in mfasById">
        <IndexTotpCard v-if="mfa.type == 'totp'" :key="mfa.id" :meta="mfa" class="mx-3 mb-4" />
        <IndexU2fCard v-if="mfa.type == 'u2f'" :key="mfa.id" :meta="mfa" class="mx-3 mb-4" />
        <IndexCodeCard v-if="mfa.type == 'backupcode'" :key="mfa.id" :meta="mfa" class="mx-3 mb-4" />
      </template>
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
    mfasById: vm => vm.$user.mfa.sort((a, b) => a.id > b.id)
  }
};
</script>
