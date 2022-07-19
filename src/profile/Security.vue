<template>
  <BasePage>
    <template v-slot:header>
      {{ $vuetify.lang.t('$vuetify.profile.index.header', $root.idpConfig.idpName) }}
    </template>

    <v-subheader>{{ $vuetify.lang.t('$vuetify.profile.index.2sv') }}</v-subheader>

    <v-row>
      <v-col cols="12" sm="6" md="4">
        <TotpCard :meta="mfa.totp"/>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <SecurityKeyCard :meta="mfa.webauthn"/>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <BackupCodeCard :meta="mfa.backup"/>
      </v-col>
    </v-row>
  </BasePage>
</template>

<script>
import TotpCard from './TotpCard'
import SecurityKeyCard from './SecurityKeyCard'
import BackupCodeCard from './BackupCodeCard'
import { recoveryMethods, retrieve as retrieveMethods} from '@/global/recoveryMethods'
import { mfa, retrieve as retrieveMfa } from '@/global/mfa'

export default {
  components: {
    TotpCard,
    SecurityKeyCard,
    BackupCodeCard,
  },
  data: () => ({
    alternates: recoveryMethods.alternates,
    mfa,
  }),
  async created() {
    await Promise.all([retrieveMethods(), retrieveMfa()])
  },
}
</script>