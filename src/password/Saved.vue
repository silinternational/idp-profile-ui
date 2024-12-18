<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template v-slot:header>
        {{ $t('password.saved.header') }}
      </template>

      <p class="text-xs-center">
        {{ $t('password.saved.info') }}
      </p>
    </BasePage>

    <ButtonBar>
      <v-spacer></v-spacer>

      <v-btn @click.once="next" color="primary" outlined>
        {{ $t('global.button.continue') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard.vue'

export default {
  components: {
    ProfileWizard,
  },
  methods: {
    next() {
      if (this.$user.auth_type == 'reset') {
        this.$router.push('/password/reset/complete')
      } else {
        this.$refs.wizard.completed()
        this.$refs.wizard.next()
      }
    },
  },
}
</script>
