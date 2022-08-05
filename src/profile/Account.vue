<template>
  <BasePage>
    <template v-slot:header>
      <!-- Todo add this to locales -->
      Account Settings
    </template>

    <!-- A list of account settings -->
    <v-list two-line>
      <v-card class="mx-auto">
        <template v-for="(item, index) in items">
          <div :key="item.title">
            <v-divider v-if="showDivider(index)" inset />

            <v-list-item :to="item.url" :exact="true" :active-class="'primary--text'">
              <v-list-item-avatar>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-avatar>

              <v-tooltip v-if="item.tooltip" max-width="240px" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-list-item-content v-bind="attrs" v-on="on">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.secondary }}</v-list-item-subtitle>
                  </v-list-item-content>
                </template>
                <span>{{ item.tooltip }}</span>
              </v-tooltip>

              <v-list-item-content v-else>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.secondary }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar v-if="item.hasPencil && !item.dialog">
                <v-icon>mdi-pencil</v-icon>
              </v-list-item-avatar>

              <v-switch :loading="toggling" v-if="item.hasSwitch" v-model="hidden" @change="toggle()" />
            </v-list-item>
          </div>
        </template>
      </v-card>
    </v-list>

    <v-alert :value="hasUnverifiedEmails" type="error">
      <span>{{ $vuetify.lang.t('$vuetify.profile.index.unverifiedEmails') }}</span>
    </v-alert>
  </BasePage>
</template>

<script>
import { recoveryMethods } from '@/global/recoveryMethods'
import { mfa } from '@/global/mfa'

export default {
  components: {},
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
            'Your recovery contact is the person who will be sent codes to allow you to re-enter your account if all your 2-Step Verification methods are lost. It is likely your manager, and is set by HR.', //Todo add this to locales
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
  },
  methods: {
    toggle: async function () {
      this.toggling = true

      await this.$API.put('user/me', {
        hide: this.hidden ? 'yes' : 'no',
      })

      this.toggling = false
    },
    showDivider(index) {
      return index !== 0
    },
  },
}
</script>
