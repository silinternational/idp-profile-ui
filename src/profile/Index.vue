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

      <v-col v-if="numberOfKeys > 1" cols="12" sm="6" md="4">
        <SecurityKeyCard isSummary="true" :numberOfKeys="numberOfKeys" :webauthnKey="mfa.keys"/>
      </v-col>

      <v-col v-if="numberOfKeys === 1" cols="12" sm="6" md="4">
        <SecurityKeyCard :numberOfKeys="numberOfKeys" :webauthnKey="mfa.keys.data[0]" :mfaId="mfa.keys.id"/>
      </v-col>

      <v-col v-else-if="numberOfKeys === 0">
        <SecurityKeyCard isSummary="true" :webauthnKey="{}" />
      </v-col>  

      <v-col cols="12" sm="6" md="4">
        <BackupCodeCard :meta="mfa.backup"/>
      </v-col>
    </v-row>

    <v-row v-if="numberOfKeys > 1">
      <v-col>
        {{$vuetify.lang.t('$vuetify.profile.index.securityKeyCard.title')}}
      </v-col>
    </v-row>

    <v-row  v-if="numberOfKeys > 1">
      <v-col v-for="webauthnKey in additionalKeys" v-bind:key="additionalKeys.id" cols="12" sm="6" md="4">
        <SecurityKeyCard :webauthnKey="webauthnKey" :numberOfKeys="numberOfKeys" :mfaId="mfa.keys.id"/>
      </v-col>
    </v-row>
  </BasePage>
</template>

<script setup>
import ProfileProgress from './ProfileProgress'
import PasswordCard from './PasswordCard'
import PasswordRecoveryCard from './PasswordRecoveryCard'
import TotpCard from './TotpCard'
import SecurityKeyCard from './SecurityKeyCard'
import BackupCodeCard from './BackupCodeCard'
import DoNotDiscloseCard from './DoNotDiscloseCard'
import Attribute from './Attribute'
import { computed, onMounted, reactive, ref } from 'vue'
import { recoveryMethods, retrieve as retrieveMethods} from '@/global/recoveryMethods'
import { mfa as globalMfa, retrieve as retrieveMfa } from '@/global/mfa'


onMounted(async () => {
  await Promise.all([retrieveMethods(), retrieveMfa()])
})
const mfa = reactive(globalMfa)
const alternates = ref(recoveryMethods.alternates).value
const hasUnverifiedEmails = computed(() => alternates.some(m => ! m.verified))
const additionalKeys = computed(() => mfa.keys.data)
const numberOfKeys = computed(() => additionalKeys.value?.length || 0)
</script>
