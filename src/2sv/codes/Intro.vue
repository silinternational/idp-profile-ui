<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template #header>
        {{ $t('2sv.codes.intro.header') }}
      </template>

      <p v-if="hasOtherTypes">
        {{ $t('2sv.codes.intro.backupInfo') }}
      </p>
      <p v-else>
        {{ $t('2sv.codes.intro.primaryInfo') }}
      </p>
    </BasePage>

    <ButtonBar>
      <v-btn color="warning" tabindex="-1" variant="outlined" @click.once="skip">
        {{ $t('global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn to="/2sv/printable-backup-codes/new" color="primary" variant="outlined">
        {{ $t('2sv.codes.intro.button.new') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard.vue'
import mfa from '@/global/mfa'

export default {
  name: 'IntroPage',
  components: {
    ProfileWizard,
  },
  data: () => ({
    mfa,
  }),
  computed: {
    hasOtherTypes: (vm) => vm.mfa.totp.id || vm.mfa.u2f.id || vm.mfa.keys.id,
    hasNoMfa: (vm) => !(vm.mfa.totp.id || vm.mfa.u2f.id || vm.mfa.keys.id || vm.mfa.backup.id),
  },
  methods: {
    skip() {
      if (this.hasNoMfa) {
        this.$refs.wizard.skipped()
      }

      this.$router.push('/profile/complete')
    },
  },
}
</script>
