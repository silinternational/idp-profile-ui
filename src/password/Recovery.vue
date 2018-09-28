<template>
  <ProfileProgress>
    <BasePage>
      <template slot="header">
        What if your password does not work anymore?
      </template>

      <p>
        Sometimes we forget our password.  Sometimes the password we have just doesn't work. In those situations, it is important to still be able to "recover" your password.
      </p>

      <p>
        We advise adding another email address like a personal one or maybe even a spouse's in the event you need to begin the recovery process.
      </p>
    </BasePage>

    <ButtonBar>
      <v-spacer></v-spacer>

      <v-btn to="/password/recovery" color="primary" flat>Continue</v-btn>
    </ButtonBar>
  </ProfileProgress>
</template>

<script>
import ProfileProgress from '@/profile/ProfileProgress';

export default {
  components: {
    ProfileProgress
  }
  // data: ({
  // }),
  // methods: {
  // }
};
</script>
