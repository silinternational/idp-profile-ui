<template>
  <BasePage>
    <template v-slot:header>
      {{ $vuetify.lang.t('$vuetify.profile.index.2sv') }}
    </template>

    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>

        <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

        <v-list-item v-else :key="item.title">
          <v-list-item-avatar>
            <v-img :src="`./images/${item.avatar}`"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>

          <v-btn class="text-capitalize" :href="item.url" color="primary">{{ item.btnLabel }}</v-btn>
        </v-list-item>
      </template>
    </v-list>
  </BasePage>
</template>

<script>
import TotpCard from './TotpCard'
import SecurityKeyCard from './SecurityKeyCard'
import BackupCodeCard from './BackupCodeCard'
import { recoveryMethods, retrieve as retrieveMethods } from '@/global/recoveryMethods'
import { mfa, retrieve as retrieveMfa } from '@/global/mfa'

export default {
  components: {
    TotpCard,
    SecurityKeyCard,
    BackupCodeCard,
  },
  data: (vm) => ({
    alternates: recoveryMethods.alternates,
    mfa,
  }),
  computed: {
    items: (vm) => [
      // Todo add these to locales
      { header: 'You’ll be asked for your second method every 30 days. Drag and drop to reorder method preference' },
      { divider: true, inset: true },
      {
        avatar: 'authy-logo.jpg',
        title: 'Code Generator',
        subtitle: `Copy/paste a six-digit code directly from your computer or phone.`,
        btnLabel: 'Set Up',
        url: vm.totpUrl,
      },
      { divider: true, inset: true },
      {
        avatar: 'key.png',
        title: 'Security Key',
        subtitle: `After setup, insert and tap to authenticate.`,
        btnLabel: 'Replace Key',
        url: vm.keyUrl,
      },
      { divider: true, inset: true },
      {
        avatar: 'codes.png',
        title: 'Backup Codes',
        subtitle: 'A set of 10, one-time use codes. Keep them in a secure but accessible place.',
        btnLabel: 'Get New Codes',
        url: vm.codesUrl,
      },
      { divider: true, inset: true },
    ],
    totpUrl: (vm) => (vm.mfa.created_utc ? `#/2sv/change/${vm.mfa.id}` : '#/2sv/smartphone/intro'),
    keyUrl: (vm) =>
      vm.mfa.webauthn.created_utc ? `#/2sv/change/${vm.mfa.webauthn.id}` : '#/2sv/usb-security-key/intro',
    codesUrl: (vm) =>
      vm.mfa.backup.created_utc ? '#/2sv/printable-backup-codes/new' : '#/2sv/printable-backup-codes/intro',
  },
  async created() {
    await Promise.all([retrieveMethods(), retrieveMfa()])
  },
}
</script>
