<template>
  <BasePage>
    <template v-slot:header>
      <!-- Todo update other locales -->
      {{ $vuetify.lang.t('$vuetify.profile.index.header', $root.idpConfig.idpName) }}
    </template>
    
    <ProfileProgress :profile="{user: $user, alternates, mfa}"/>

    <h3 class="mt-6">Verily {{ $root.idpConfig.idpName }}</h3>

    <h5 class="my-2">{{ $user.isAuthenticated() ? 'Already logged in' : 'Not logged in' }}</h5>

    <v-row>
      <v-col>
        <v-list two-line>
          <v-card class="mx-auto">
            <template v-for="(item, index) in coreItems">
              <v-divider v-if="item.divider" :key="index" :inset="item.inset"></v-divider>

              <a class="text-decoration-none" :key="index" :href="item.url" v-else target="_blank">
                <v-list-item :key="item.title" @click="() => {}">
                  <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
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

    <v-row>
      <v-col>
        <h3>Google Workspace</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h5>Login with your SIL Google account</h5>
      </v-col>
    </v-row>

    <v-row class="mt-10">
      <v-col>
        <div class="flex row justify-space-around ml-2">
          <a v-for="(item, index) in googleItems" :key="index" :href="item.url" target="_blank" class="text-decoration-none">
            <v-img :id="item.label" :src="item.image" max-width="40px" class="mx-auto"/>
            <label :for="item.label">{{item.label}}</label>
          </a>
        </div>
      </v-col>
    </v-row>
  </BasePage>
</template>

<script>
import ProfileProgress from './ProfileProgress'
import { recoveryMethods, retrieve as retrieveMethods} from '@/global/recoveryMethods'
import { mfa, retrieve as retrieveMfa } from '@/global/mfa'


export default {
  components: {
    ProfileProgress
  },
  data: () => ({
    alternates: recoveryMethods.alternates,
    mfa,
  }),
  computed: {
    org: (vm) => vm.$user.email.split('@')[1].split('.')[0],
    coreItems(vm) {
      return [
        //Todo update/add content to locales and customize links for org
        {
          title: 'Wordkay',
          secondary: 'HR and organizational data',
          avatar: require('@/assets/workday.svg'),
          url: `https://www.myworkday.com/wday/authgwy/wycliffe/login-saml2.htmld`, //TODO put organization in env?
        },
        { divider: true, inset: true },
        {
          title: 'Gateway',
          avatar: require('@/assets/gateway.svg'),
          url: 'https://gateway.sil.org/',
          secondary: `${vm.org}’s internal wiki`,
        },
        { divider: true, inset: true },
        {
          title: 'Zoom',
          secondary: 'Participate in virtual meetings',
          avatar: require('@/assets/zoom.svg'),
          url: 'https://zoom.us/signin',
        },
        { divider: true, inset: true },
        {
          title: 'Help Desk',
          secondary: 'Browse how-to articles and submit tickets',
          avatar: require(`@/assets/${vm.org}.svg`),
          url: 'https://helpdesk.sil.org/',
        },
        { divider: true, inset: true },
        {
          title: 'REAP',
          secondary: 'Repo for Electronic Archiving and Publishing',
          avatar: require('@/assets/reap.svg'),
          url: 'https://reap.sil.org/',
        },
        {
          title: 'Cover',
          secondary: 'insurance',
          avatar: require('@/assets/cover.svg'),
          url: 'https://cover.sil.org',
        },
      ]
    },
    //return google Workspace links using template literals like https://gmail.google.com/a/${vm.org}.org for gmail, calendar, meet, drive and chat
    googleItems(vm) {
      return [
        {
          image: require('@/assets/gmail.svg'),
          url: `https://gmail.google.com/a/${vm.org}.org`,
          label: 'Gmail',
        },
        {
          image: require('@/assets/calendar.svg'),
          url: `https://calendar.google.com/a/${vm.org}.org`,
          label: 'Calendar',
        },
        {
          image: require('@/assets/meet.svg'),
          url: `https://meet.google.com`,
          label: 'Meet',
        },
        {
          image: require('@/assets/drive.svg'),
          url: `https://drive.google.com/a/${vm.org}.org`,
          label: 'Drive',
        },
        {
          image: require('@/assets/docs.svg'),
          url: `https://docs.google.com/a/${vm.org}.org`,
          label: 'Docs',
        },
        {
          image: require('@/assets/chat.svg'),
          url: `https://chat.google.com/a/${vm.org}.org`,
          label: 'Chat',
        },
      ]
    },
  },
  async created() {
    await Promise.all([retrieveMethods(), retrieveMfa()])
  },
}
</script>
