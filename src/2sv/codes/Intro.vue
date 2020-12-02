<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template v-slot:header>
        {{ $vuetify.lang.t('$vuetify.2sv.codes.intro.header') }}
      </template>

      <p v-if="hasOtherTypes">
        {{ $vuetify.lang.t('$vuetify.2sv.codes.intro.backupInfo') }}
      </p>
      <p v-else>
        {{ $vuetify.lang.t('$vuetify.2sv.codes.intro.primaryInfo') }}
      </p>
    </BasePage>

    <ButtonBar>
      <v-btn @click.once="skip" color="warning" tabindex="-1" outlined> 
        {{ $vuetify.lang.t('$vuetify.global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn to="/2sv/printable-backup-codes/new" color="primary" outlined> 
        {{ $vuetify.lang.t('$vuetify.2sv.codes.intro.button.new') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard'
import mfa from '@/global/mfa';

export default {
  components: {
    ProfileWizard
  },
  data: () => ({
    mfa,
  }),
  computed: {
    hasOtherTypes: vm => vm.mfa.totp.id || vm.mfa.u2f.id,
    hasNoMfa: vm => ! (vm.mfa.totp.id || vm.mfa.u2f.id || vm.mfa.backup.id),
  },
  methods: {
    skip() {
      if (this.hasNoMfa) {
        this.$refs.wizard.skipped()
      }

      this.$router.push('/profile/complete')
    }
  },
}
</script>