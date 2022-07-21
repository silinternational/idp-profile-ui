<template>
  <BasePage>
    <template v-slot:header>
      <!-- Todo add this to locales -->
      Account Settings
    </template>

    <!-- A list of account settings -->
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.url"
        :exact="true"
        :active-class="'primary--text'"
        class="text-capitalize"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        
        <v-list-item two-line>
          <v-list-item-content> 
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.secondary }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item-icon v-if="item.hasPencil">
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
  data () {
    return {
      alternates: recoveryMethods.alternates,
      mfa,
      toggling: false,
      hidden: this.$user.hide === 'yes'
    }
  },
  computed: {
    hasUnverifiedEmails: vm => vm.alternates.some(m => ! m.verified),
    items () {
    return [
      //Todo update/add titles to locales
      { title: this.$vuetify.lang.t('$vuetify.profile.index.username'), icon: 'mdi-account-circle', secondary: this.$user.idp_username },
      { title: 'preferred language', icon: 'mdi-translate' , secondary: navigator.language, hasPencil: true },
      { title: this.$vuetify.lang.t('$vuetify.profile.index.passwordCard.title'), icon: 'mdi-account-key', url: '/password/create', hasPencil: true, secondary: new Date(this.$user?.password_meta?.expires).toLocaleDateString()},
      { title:  this.$vuetify.lang.t('$vuetify.profile.index.passwordRecoveryCard.title'), icon: 'mdi-email-outline', url: '/password/recovery', hasPencil: true }, //Todo add tooltip
      { title: this.$vuetify.lang.t('$vuetify.profile.index.manager'), icon: 'mdi-account-multiple', secondary: this.$user.manager_email }, //Todo add tooltip
      { title:  this.$vuetify.lang.t('$vuetify.profile.index.dndCard.title') , icon: 'mdi-security', hasSwitch: true }, // Todo add tooltip
    ]
    },
  },
  methods: {
    toggle: async function() {
      this.toggling = true

      await this.$API.put('user/me', {
        hide: this.hidden ? 'yes' : 'no'
      })

      this.toggling = false
    },
  }
}
</script>