<template>
  <BasePage>
    <template v-slot:header>
      {{ $vuetify.lang.t('$vuetify.profile.index.header', $root.idpConfig.idpName) }}
    </template>

    <v-row>
      <v-col cols="6">
        <Attribute :name="$vuetify.lang.t('$vuetify.profile.index.username')" :value="$user.idp_username" sameline />
        <Attribute :name="$vuetify.lang.t('$vuetify.profile.index.lastLogin')" :value="$user.last_login | format" sameline />
        <Attribute :name="$vuetify.lang.t('$vuetify.profile.index.manager')" :value="$user.manager_email" sameline />
      </v-col>

      <v-col cols="6">
        <ProfileProgress :profile="{user: $user, alternates, mfa}"/>
      </v-col>
    </v-row>

    <v-alert :value="hasUnverifiedEmails" type="error">
      <span>{{ $vuetify.lang.t('$vuetify.profile.index.unverifiedEmails') }}</span>
    </v-alert>

    <v-row>
      <v-col cols="12" sm="6" md="4">
        <PasswordCard :meta="$user.password_meta"/>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <PasswordRecoveryCard :methods="alternates"/>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <DoNotDiscloseCard :dnd="$user.hide"/>
      </v-col>
    </v-row>

    <v-subheader>{{ $vuetify.lang.t('$vuetify.profile.index.2sv') }}</v-subheader>

    <v-row>
      <v-col cols="12" sm="6" md="4">
        <TotpCard :meta="mfa.totp"/>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <U2fCard :meta="mfa.u2f"/>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <BackupCodeCard :meta="mfa.backup"/>
      </v-col>
    </v-row>
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