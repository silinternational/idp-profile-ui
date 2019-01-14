<template>
  <BasePage>
    <template slot="header">
      {{ $vuetify.t('$vuetify.profile.index.header', $root.idpConfig.idpName) }}

      <v-spacer/>

      <ProfileProgress :profile="profile"/>
    </template>

    <v-layout row wrap>
      <PasswordCard :meta="$user.password_meta" class="mx-3 mb-4"/>
      <PasswordRecoveryCard :methods="$user.recoveryMethods.personal" class="mx-3 mb-4"/>
      <DoNotDiscloseCard :dnd="$user.hide" class="mx-3 mb-4"/>
    </v-layout>

    <v-subheader class="py-5">{{ $vuetify.t('$vuetify.profile.index.2sv') }}</v-subheader>
    <v-layout row wrap>
      <TotpCard :meta="totp" class="mx-3 mb-4"/>
      <U2fCard :meta="u2f" class="mx-3 mb-4"/>
      <BackupCodeCard :meta="codes" class="mx-3 mb-4"/>
    </v-layout>
  </BasePage>
</template>

<script>
import ProfileProgress from './ProfileProgress'
import PasswordCard from './PasswordCard'
import PasswordRecoveryCard from './PasswordRecoveryCard'
import TotpCard from './TotpCard'
import U2fCard from './U2fCard'
import BackupCodeCard from './BackupCodeCard'
import DoNotDiscloseCard from './DoNotDiscloseCard'

export default {
  components: {
    ProfileProgress,
    PasswordCard,
    PasswordRecoveryCard,
    TotpCard,
    U2fCard,
    BackupCodeCard,
    DoNotDiscloseCard
  },
  computed: {
    profile: vm => ({
      recoveryMethods: vm.$user.recoveryMethods.personal,
      mfas: vm.$user.mfas,
      user: vm.$user
    }),
    totp: vm => vm.$user.mfas.find(mfa => mfa.type == 'totp') || {},
    u2f: vm => vm.$user.mfas.find(mfa => mfa.type == 'u2f') || {},
    codes: vm => vm.$user.mfas.find(mfa => mfa.type == 'backupcode') || {}
  }
}
</script>
