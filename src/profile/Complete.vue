<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template v-slot:header>
        {{ $vuetify.lang.t('$vuetify.profile.complete.header') }}
      </template>

      <v-row>
        <v-col cols="1" class="text-right">
          <v-icon color="success">mdi-check</v-icon>
        </v-col>
        
        <v-col cols="11">
          {{ $vuetify.lang.t('$vuetify.profile.complete.info', $user.first_name, $root.idpConfig.idpName) }}
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" class="text-right">
          <v-icon color="success">mdi-account</v-icon> 
        </v-col>

        <v-col cols="11">
          {{ $vuetify.lang.t('$vuetify.profile.complete.username') }} <strong class="body-2 pl-1">{{ $user.idp_username }}</strong>
        </v-col>
      </v-row>

      <v-row v-if="unverifiedEmails.length">
        <v-col cols="1" class="text-right">
          <v-icon color="warning">mdi-email</v-icon> 
        </v-col>

        <v-col cols="11">
          {{ $vuetify.lang.t('$vuetify.profile.complete.unverifiedEmails') }}
          <span class="font-weight-bold">({{ unverifiedEmails | joined }})</span>
        </v-col>
      </v-row>

      <v-row v-if="! alternates.length">
        <v-col cols="1" class="text-right">
          <v-icon color="warning">mdi-alert</v-icon> 
        </v-col>
        <v-col cols="11">
          {{ $vuetify.lang.t('$vuetify.profile.complete.noAlternates') }}
        </v-col>
      </v-row>

      <v-row v-if="mfa.numVerified == 0">
        <v-col cols="1" class="text-right">
          <v-icon color="warning">mdi-alert</v-icon> 
        </v-col>
        <v-col cols="11">
          {{ $vuetify.lang.t('$vuetify.profile.complete.no2sv') }}
        </v-col>
      </v-row>
    </BasePage>

    <ButtonBar>
      <v-spacer></v-spacer>
      
      <v-btn @click.once="done" color="primary" outlined>
        {{ $vuetify.lang.t('$vuetify.profile.complete.button.profile') }}
      </v-btn>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard'
import recoveryMethods from '@/global/recoveryMethods';
import { mfa, retrieve as retrieveMfas } from '@/global/mfa';


export default {
  components: {
    ProfileWizard
  },
  filters: {
    joined: emails => emails.map(email => email.value).join(', ')
  },
  data: () => ({
    alternates: recoveryMethods.alternates,
    mfa,
  }),
  computed: {
    unverifiedEmails: vm => vm.alternates.filter(m => ! m.verified),
  },
  methods: {
    done() {
      this.$refs.wizard.allDone()
      
      this.$router.push('/profile')
    },
  },
  async created() {
    await retrieveMfas()

    this.$refs.wizard.completed()
    this.$forceUpdate() // couldn't figure out how to get the step to update in the UI without this.
  },
}
</script>
