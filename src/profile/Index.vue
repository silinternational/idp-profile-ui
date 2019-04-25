<template>
  <BasePage>
    <template v-slot:header>
      {{ $vuetify.t('$vuetify.profile.index.header', $root.idpConfig.idpName) }}

      <v-spacer/>

      <ProfileProgress :profile="{user: $user, alternates, mfa}"/>
    </template>

    <aside class="pb-3">
      <Attribute :name="$vuetify.t('$vuetify.profile.index.username')" :value="$user.idp_username" sameline />
      <Attribute :name="$vuetify.t('$vuetify.profile.index.lastLogin')" :value="$user.last_login | format" sameline />
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
        <PasswordRecoveryCard :methods="alternates" class="mx-3 mb-4"/>
      </v-flex>
      <v-flex xs12 sm6 md4 py-3>
        <DoNotDiscloseCard :dnd="$user.hide" class="mx-3 mb-4"/>
      </v-flex>
    </v-layout>

    <v-subheader class="py-5">{{ $vuetify.t('$vuetify.profile.index.2sv') }}</v-subheader>

    <v-layout row wrap>
      <v-flex xs12 sm6 md4 py-3>
        <TotpCard :meta="mfa.totp" class="mx-3 mb-4"/>
      </v-flex>
      <v-flex xs12 sm6 md4 py-3>
        <U2fCard :meta="mfa.u2f" class="mx-3 mb-4"/>
      </v-flex>
      <v-flex xs12 sm6 md4 py-3>
        <BackupCodeCard :meta="mfa.backup" class="mx-3 mb-4"/>
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
import { recoveryMethods, retrieve as retrieveMethods} from '@/global/recoveryMethods';
import { mfa, retrieve as retrieveMfa } from '@/global/mfa';

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
    alternates: recoveryMethods.alternates,
    mfa,
  }),
  computed: {
    hasUnverifiedEmails: vm => vm.alternates.some(m => ! m.verified),
  },
  async created() {
    await Promise.all([retrieveMethods(), retrieveMfa()])
  },
}
</script>
