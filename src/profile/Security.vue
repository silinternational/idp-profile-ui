<template>
  <BasePage>
    <template v-slot:header>
      {{ $vuetify.lang.t('$vuetify.profile.index.2sv') }}
    </template>

    <ProfileProgress :profile="{ user: $user, alternates, mfa }" />

    <v-subheader> You’ll be asked for your second method every 30 days. </v-subheader>

    <v-list three-line>
      <v-card class="mx-auto">
        <template v-for="(item, index) in items">
          <v-divider v-if="item.divider" :key="index" :inset="item.inset"></v-divider>

          <v-list-item v-else :key="item.title">
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>

            <v-btn v-if="item.url" :href="item.url" class="text-capitalize" color="primary">{{ item.btnLabel }}</v-btn>
          </v-list-item>
        </template>
      </v-card>
    </v-list>
  </BasePage>
</template>

<script>
import ProfileProgress from './ProfileProgress'
import { recoveryMethods, retrieve as retrieveMethods } from '@/global/recoveryMethods'
import { mfa, retrieve as retrieveMfa } from '@/global/mfa'

export default {
  components: {
    ProfileProgress,
  },
  data: () => ({
    alternates: recoveryMethods.alternates,
    mfa,
  }),
  computed: {
    items: (vm) => [
      // Todo add these to locales
      {
        avatar: vm.isAuthy ? require('@/assets/authy-logo.jpg') : require('@/assets/authenticator-logo.jpg'),
        title: 'Code Generator',
        subtitle: `Copy/paste a six-digit code directly from your computer or phone.`,
        btnLabel: vm.mfa.totp.created_utc ? 'Remove' : 'Set Up',
        url: vm.totpUrl,
      },
      { divider: true, inset: true },
      {
        avatar: require('@/assets/key.svg'),
        title: 'Security Key',
        subtitle: `After setup, insert and tap to authenticate.`,
        btnLabel: vm.mfa.webauthn.created_utc ? 'Replace' : 'Set up',
        url: vm.keyUrl,
      },
      { divider: true, inset: true },
      {
        avatar: require('@/assets/codes.svg'),
        title: 'Backup Codes',
        subtitle: 'A set of 10, one-time use codes. Keep them in a secure but accessible place.',
        btnLabel: vm.mfa.backup.created_utc ? 'Get New Codes' : 'Get Codes',
        url: vm.codesUrl,
      },
    ],
    totpUrl: (vm) => (vm.mfa.totp.created_utc ? `#/2sv/change/${vm.mfa.totp.id}` : '#/2sv/smartphone/intro'),
    keyUrl: (vm) =>
      vm.mfa.webauthn.created_utc ? `#/2sv/change/${vm.mfa.webauthn.id}` : '#/2sv/usb-security-key/intro',
    codesUrl: (vm) =>
      vm.mfa.backup.created_utc ? '#/2sv/printable-backup-codes/new' : '#/2sv/printable-backup-codes/intro',
    isAuthy: () => `${process.env.VUE_APP_TOTP_APP_RECOMMENDATION}` === 'authy',
  },
  async created() {
    await Promise.all([retrieveMethods(), retrieveMfa()])
  },
}
</script>
