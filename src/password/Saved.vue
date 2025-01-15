<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template #header>
        {{ $t('password.saved.header') }}
      </template>

      <p class="text-center">
        {{ $t('password.saved.info') }}
      </p>
    </BasePage>

    <ButtonBar>
      <v-spacer></v-spacer>

      <v-btn color="primary" variant="outlined" @click.once="next">
        {{ $t('global.button.continue') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard.vue'

export default {
  name: 'PasswordSaved',
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
