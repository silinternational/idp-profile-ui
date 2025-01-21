<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template #header>
        {{ $t('2sv.key.intro.header') }}
      </template>

      <p>
        {{ $t('2sv.key.intro.info') }}
      </p>

      <figure class="pa-4">
        <v-img :src="securityKeys" cover alt="Three sizes of USB keys." />
      </figure>
    </BasePage>

    <ButtonBar>
      <v-btn
        to="/2sv/printable-backup-codes/intro"
        color="primary"
        tabindex="-1"
        variant="outlined"
        class="mr-4 mb-4 mb-sm-0"
      >
        {{ $t('global.button.skip') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        href="https://idphelp.sil.org/2sv-issues/security-key"
        target="_blank"
        color="primary"
        tabindex="-1"
        variant="outlined"
        class="mr-4 mb-4 mb-sm-0"
      >
        {{ $t('2sv.key.intro.button.no') }}
      </v-btn>
      <v-btn to="/2sv/usb-security-key/insert" color="primary" variant="outlined">
        {{ $t('global.button.yes') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard.vue'
import securityKeys from '@/assets/usb-security-key-examples.png'
import Steps from '@/profile/steps'

export default {
  name: 'IntroKey',
  components: {
    ProfileWizard,
  },
  data: () => ({
    securityKeys,
    currentStep: {},
  }),
  async created() {
    const step = Steps.forPath(this.$route.path)
    this.currentStep = step || {}
  },
  mounted() {
    if (this.currentStep.skip) {
      this.$router.push('/2sv/printable-backup-codes/intro')
    }
  },
}
</script>
