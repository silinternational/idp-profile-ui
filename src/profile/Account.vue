<template>
  <BasePage>
    <template v-slot:header>
      <!-- Todo add this to locales -->
      Account Settings
    </template>

    <!-- A list of account settings -->
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" :to="item.url" :exact="true" :active-class="'primary--text'">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-tooltip v-if="item.tooltip" max-width="240px" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item two-line v-bind="attrs" v-on="on">
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.secondary }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
          <span>{{ item.tooltip }}</span>
        </v-tooltip>

        <v-list-item v-if="!item.tooltip" two-line>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.secondary }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <LanguageDialog
          :open="localeModalOpen"
          :options="languages"
          :selectedOption="language"
          v-if="item.dialog"
          @close="localeModalOpen = false"
          @selected="setLocale"
        />

        <v-list-item-icon v-if="item.hasPencil && !item.dialog">
          <v-icon>mdi-pencil</v-icon>
        </v-list-item-icon>

        <v-switch :loading="toggling" v-if="item.hasSwitch" v-model="hidden" @change="toggle()" />
      </v-list-item>
    </v-list>

    <v-alert :value="hasUnverifiedEmails" type="error">
      <span>{{ $vuetify.lang.t('$vuetify.profile.index.unverifiedEmails') }}</span>
    </v-alert>
  </BasePage>
</template>

<script>
import LanguageDialog from './LanguageDialog.vue'
import ProfileProgress from './ProfileProgress'
import PasswordCard from './PasswordCard'
import PasswordRecoveryCard from './PasswordRecoveryCard'
import DoNotDiscloseCard from './DoNotDiscloseCard'
import Attribute from './Attribute'
import { recoveryMethods } from '@/global/recoveryMethods'
import { mfa } from '@/global/mfa'

export default {
  components: {
    ProfileProgress,
    PasswordCard,
    PasswordRecoveryCard,
    DoNotDiscloseCard,
    Attribute,
    LanguageDialog,
  },
  data: (vm) => ({
    alternates: recoveryMethods.alternates,
    mfa,
    toggling: false,
    hidden: vm.$user.hide === 'yes',
    lastUpdated:
      'last updated ' +
      new Date(vm.$user?.password_meta?.last_changed).toLocaleDateString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    locale: localStorage.getItem('locale') || navigator.language,
    languages: {
      en: 'English',
      es: 'Español',
      fr: 'Français',
      ko: '한국어',
    },
    localeModalOpen: false,
    selectedLanguage: vm.language,
  }),
  computed: {
    hasUnverifiedEmails: (vm) => vm.alternates.some((m) => !m.verified),
    items(vm) {
      return [
        //Todo update/add titles to locales
        {
          title: this.$vuetify.lang.t('$vuetify.profile.index.username'),
          icon: 'mdi-account-circle',
          secondary: this.$user.idp_username,
        },
        {
          title: 'Preferred Language',
          icon: 'mdi-translate',
          secondary: this.language,
          hasPencil: true,
          dialog: true,
        },
        {
          title: this.$vuetify.lang.t('$vuetify.profile.index.passwordCard.title'),
          icon: 'mdi-account-key',
          url: '/password/create',
          hasPencil: true,
          secondary: this.lastUpdated,
        },
        {
          title: this.$vuetify.lang.t('$vuetify.profile.index.passwordRecoveryCard.title'),
          icon: 'mdi-email-outline',
          url: '/password/recovery',
          hasPencil: true,
          tooltip: 'If you lose your password we’ll send a reset link to this email address. ', //Todo add this to locales
        },
        {
          title: this.$vuetify.lang.t('$vuetify.profile.index.manager'),
          icon: 'mdi-account-multiple',
          secondary: this.$user.manager_email,
          tooltip:
            'Your recovery contact is the person who will be sent codes to allow you to re-enter your Verily account if all your 2-Step Verification methods are lost. It is likely your manager, and is set by HR.', //Todo add this to locales
        },
        {
          title: this.$vuetify.lang.t('$vuetify.profile.index.dndCard.title'),
          icon: 'mdi-security',
          hasSwitch: true,
          tooltip:
            'When enabled, using the Forgot Password process will produce a message that your account does not exist. It will, however, still send you an email with a link you can use to reset your password. This is typically used by individuals in sensitive locations.', //Todo add this to locales
        },
      ]
    },
    language: (vm) => vm.languages[vm.locale],
  },
  methods: {
    toggle: async function () {
      this.toggling = true

      await this.$API.put('user/me', {
        hide: this.hidden ? 'yes' : 'no',
      })

      this.toggling = false
    },
    //Todo see if we can move this to the api instead of local storage
    setLocale(language) {
      const entries = Object.entries(this.languages)
      const entry = entries.find(([, v]) => v === language)
      const locale = entry[0]
      if (localStorage.getItem('locale') !== locale) {
        localStorage.setItem('locale', locale)
        this.$vuetify.lang.current = locale
        this.locale = locale
      }
      this.localeModalOpen = false
    },
  },
}
</script>
