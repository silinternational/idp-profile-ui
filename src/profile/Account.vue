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

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.secondary }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-dialog v-model="localeModalOpen" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-icon v-if="item.hasPencil">
              <v-icon v-if="item.dialog" v-bind="attrs" v-on="on">mdi-pencil</v-icon>
              <v-icon v-if="!item.dialog">mdi-pencil</v-icon>
            </v-list-item-icon>
          </template>

          <v-card>
            <v-card-title>Choose a language</v-card-title>
            <v-card-text>
              <v-select
                v-model="selectedLanguage"
                :items="Object.values(languages)"
                label="name"
                item-value="code"
                hide-details
              ></v-select>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-row no-gutters align="center">
                <v-col>
                  <v-icon @click="setLocale(selectedLanguage)" color="success" small class="pl-2">mdi-check</v-icon>
                </v-col>

                <v-col>
                  <v-icon @click="localeModalOpen = false" color="error" small class="pl-1">mdi-close</v-icon>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-switch :loading="toggling" v-if="item.hasSwitch" v-model="hidden" @change="toggle()" />
      </v-list-item>
    </v-list>

    <v-alert :value="hasUnverifiedEmails" type="error">
      <span>{{ $vuetify.lang.t('$vuetify.profile.index.unverifiedEmails') }}</span>
    </v-alert>
  </BasePage>
</template>

<script>
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
  },
  data() {
    return {
      alternates: recoveryMethods.alternates,
      mfa,
      toggling: false,
      hidden: this.$user.hide === 'yes',
      lastUpdated:
        'last updated ' +
        new Date(this.$user?.password_meta?.last_changed).toLocaleDateString(navigator.language, {
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
      selectedLanguage: this.language,
    }
  },
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
          secondary: this.languages[vm.locale],
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
        }, //Todo add tooltip
        {
          title: this.$vuetify.lang.t('$vuetify.profile.index.manager'),
          icon: 'mdi-account-multiple',
          secondary: this.$user.manager_email,
        }, //Todo add tooltip
        {
          title: this.$vuetify.lang.t('$vuetify.profile.index.dndCard.title'),
          icon: 'mdi-security',
          hasSwitch: true,
        }, // Todo add tooltip
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
