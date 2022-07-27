<template>
  <BasePage>
    <template v-slot:header>
      <!-- Todo update other locales -->
      {{ $vuetify.lang.t('$vuetify.profile.index.header', $root.idpConfig.idpName) }}
    </template>

    <h3 class="mt-6">Verily {{ $root.idpConfig.idpName }}</h3>

    <h5 class="my-2">{{ $user.isAuthenticated() ? 'Already logged in' : 'Not logged in' }}</h5>

    <v-row>
      <v-col>
        <v-list two-line>
          <v-card class="mx-auto">
            <template v-for="(item, index) in coreItems">
              <v-divider v-if="item.divider" :key="index" :inset="item.inset"></v-divider>

              <a class="text-decoration-none" :href="item.url" v-else target="_blank">
                <v-list-item :key="item.title" @click="">
                  <v-list-item-avatar>
                    <v-img :src="`./images/${item.avatar}`"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-html="item.title"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.secondary"></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-avatar>
                    <v-icon>mdi-launch</v-icon>
                  </v-list-item-avatar>
                </v-list-item>
              </a>
            </template>
          </v-card>
        </v-list>
      </v-col>
    </v-row>
    <!--Todo add google links-->
    <v-row> </v-row>
  </BasePage>
</template>

<script>
export default {
  computed: {
    hasUnverifiedEmails: (vm) => vm.alternates.some((m) => !m.verified),
    org: (vm) => vm.$user.email.split('@')[1].split('.')[0],
    coreItems(vm) {
      return [
        //Todo update/add content to locales and customize links for org
        {
          title: 'Wordkay',
          secondary: 'HR and organizational data',
          avatar: 'workday.svg',
          url: `https://www.myworkday.com/wday/authgwy/wycliffe/login-saml2.htmld`, //TODO put organization in env?
        },
        { divider: true, inset: true },
        {
          title: 'Gateway',
          avatar: 'gateway.svg',
          url: 'https://gateway.sil.org/',
          secondary: `${vm.org}’s internal wiki`,
        },
        { divider: true, inset: true },
        {
          title: 'Zoom',
          secondary: 'Participate in virtual meetings',
          avatar: 'zoom.svg',
          url: 'https://zoom.us/signin',
        },
        { divider: true, inset: true },
        {
          title: 'Help Desk',
          secondary: 'Browse how-to articles and submit tickets',
          avatar: vm.org + '.svg',
          url: 'https://gateway.sil.org/display/GHDKB/GTIS+Global+Help+Desk+Home',
        },
        { divider: true, inset: true },
        {
          title: 'REAP',
          secondary: 'Repo for Electronic Archiving and Publishing',
          avatar: 'reap.svg',
          url: 'https://reap.sil.org/',
        },
        {
          title: 'Cover',
          secondary: 'insurance',
          avatar: 'cover.svg',
          url: 'https://cover.sil.org',
        },
      ]
    },
  },
}
</script>
