<template>
  <ProfileWizard ref="wizard">
    <v-alert :value="backupcode.id" type="warning">
      <span class="layout row align-center justify-center">
        {{ $vuetify.t('$vuetify.2sv.codes.warning', backupcode.label) }}
      </span>
    </v-alert>

    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.2sv.codes.intro.header') }}
      </template>

      <p v-if="hasOtherTypes">
        {{ $vuetify.t('$vuetify.2sv.codes.intro.backupInfo') }}
      </p>
      <p v-else>
        {{ $vuetify.t('$vuetify.2sv.codes.intro.primaryInfo') }}
      </p>
    </BasePage>

    <ButtonBar>
      <v-btn @click="skip" flat color="warning" tabindex="-1" outline> 
        {{ $vuetify.t('$vuetify.global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-btn to="/2sv/printable-backup-codes/new" color="primary" flat outline> 
        {{ $vuetify.t('$vuetify.2sv.codes.intro.button.new') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard'

export default {
  components: {
    ProfileWizard
  },
  data: () => ({
    mfas: [],
  }),
  computed: {
    backupcode: vm => vm.mfas.find(mfa => mfa.type == 'backupcode') || {},
    hasOtherTypes: vm => vm.mfas.some(mfa => mfa.type != 'backupcode'),
  },
  async created() {
    this.mfas = await this.$API.get(`mfa`)
  },
  methods: {
    skip() {
      if (this.mfas.length < 1) {
        this.$refs.wizard.skipped()
      }

      this.$router.push('/profile/complete')
    }
  },
}
</script>