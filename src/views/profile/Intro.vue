<template>
  <BasePage>
    <template slot="header">
      What is a(n) "<em>{{ idp.name }}</em> Identity"?
    </template>

    <p>
      First of all, welcome to {{ idp.name }}<span v-if="user.name"> {{ user.name }}</span>!
    </p>

    <p>
      Brief content introducing the term and explaining it.
    </p>

    <p>
      Some content helping distinguish it from their email account.
    </p>

    <ButtonBar>
        <v-spacer></v-spacer>
        
        <v-btn to="/password/create" color="primary">Begin</v-btn>
    </ButtonBar>
  </BasePage>
</template>

<script>
import BasePage from '@/components/BasePage';
import ButtonBar from '@/components/ButtonBar';

export default {
  components: {
    BasePage,
    ButtonBar
  },
  data() {
    return {
      idp: {
        name: 'SIL'
      },
      user: {
        name: 'Uncle Cam'
      }
    };
  }
};
</script>
