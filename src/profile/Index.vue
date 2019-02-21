<template>
  <BasePage>
    <template slot="header">
      {{ $vuetify.t('$vuetify.profile.index.header', $root.idpConfig.idpName) }}

      <v-spacer/>

      <ProfileProgress :profile="{user: $user, recoveryMethods, mfas}"/>
    </template>

    <aside class="pb-3">
      <Attribute :name="$vuetify.t('$vuetify.profile.index.lastLogin')" :value="$user.last_login_utc" sameline />
      <Attribute :name="$vuetify.t('$vuetify.profile.index.manager')" :value="$user.manager_email" sameline />
    </aside>

    <v-alert :value="hasUnverifiedEmails" type="error">
      <span>{{ $vuetify.t('$vuetify.profile.index.unverifiedEmails') }}</span>
    </v-alert>

    <v-layout row wrap>
      <v-flex xs12 sm6 md4 py-3>
        <PasswordCard :meta="$user.password_meta" class="mx-3 mb-4"/>
      </v-flex>
      <v-flex xs12 sm6 md4 py-3>
        <PasswordRecoveryCard :methods="recoveryMethods" class="mx-3 mb-4"/>
      </v-flex>
      <v-flex xs12 sm6 md4 py-3>
        <DoNotDiscloseCard :dnd="$user.hide" class="mx-3 mb-4"/>
      </v-flex>
    </v-layout>

    <v-subheader class="py-5">{{ $vuetify.t('$vuetify.profile.index.2sv') }}</v-subheader>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 py-3>
        <TotpCard :meta="totp" class="mx-3 mb-4"/>
      </v-flex>
      <v-flex xs12 sm6 md4 py-3>
        <U2fCard :meta="u2f" class="mx-3 mb-4"/>
      </v-flex>
      <v-flex xs12 sm6 md4 py-3>
        <BackupCodeCard :meta="codes" class="mx-3 mb-4"/>
      </v-flex>
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
import Attribute from './Attribute'

export default {
  components: {
    ProfileProgress,
    PasswordCard,
    PasswordRecoveryCard,
    TotpCard,
    U2fCard,
    BackupCodeCard,
    DoNotDiscloseCard,
    Attribute,
  },
  data: () => ({
    recoveryMethods: [],
    mfas: [],
  }),
  computed: {
    totp: vm => vm.mfas.find(mfa => mfa.type == 'totp') || {},
    u2f: vm => vm.mfas.find(mfa => mfa.type == 'u2f') || {},
    codes: vm => vm.mfas.find(mfa => mfa.type == 'backupcode') || {},
    hasUnverifiedEmails: vm => vm.recoveryMethods.some(m => ! m.verified),
  },
  async created() {
    const [allRecoveryMethods, allMfas] = await Promise.all([this.$API.get('method'), this.$API.get('mfa')])

    this.recoveryMethods = allRecoveryMethods.filter(isAlternate)
    this.mfas = allMfas
  },
}

const isAlternate = method => method.type == 'email'
</script>
