<template>
  <BasePage>
    <template v-slot:header>
      <!-- Todo update other locales -->
      {{ $vuetify.lang.t('$vuetify.profile.index.header', $root.idpConfig.idpName) }}
    </template>
    
    <ProfileProgress :profile="{user: $user, alternates, mfa}"/>

    <h3 class="mt-6">{{ $root.idpConfig.appName || 'Idp App'}} {{ $root.idpConfig.idpName }}</h3>

    <h5 class="my-2">{{ $user.isAuthenticated() ? 'Already logged in' : 'Not logged in' }}</h5>

    <v-row>
      <v-col>
        <v-list two-line>
          <v-card class="mx-auto">
            <template v-for="(item, index) in coreItems">
              <v-divider v-if="showDivider(index)" :key="index" inset></v-divider>

              <a class="text-decoration-none" :key="index" :href="item.url" target="_blank">
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
        <h5>Login with your {{org}}'s Google account</h5>
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
    // Todo update/add to locales
    coreItems: (vm) => JSON.parse(vm.$root.idpConfig.coreItems || '[]').map(item => {
      switch (item.title) {
        case 'Example':
          item.secondary = 'This is an example'
          break
        case 'Workday':
          item.secondary = 'HR and organizational data'
          break
        case 'Gateway':
          item.secondary = `${vm.org}'s internal wiki`
          break
        case 'Zoom':
          item.secondary = 'Participate in virtual meetings'
          break
        case 'Help Desk':
          item.secondary = 'Browse how-to articles and submit tickets'
          break
        case 'REAP':
          item.secondary = 'Repo for Electronic Archiving and Publishing'
          break
        case 'Cover':
          item.secondary = 'insurance'
          break
        default:
          break
      }
      return item
    }),
    
    googleItems(vm) {
      return [
        {
          image: 'https://lh3.googleusercontent.com/0rpHlrX8IG77awQMuUZpQ0zGWT7HRYtpncsuRnFo6V3c8Lh2hPjXnEuhDDd-OsLz1vua4ld2rlUYFAaBYk-rZCODmi2eJlwUEVsZgg',
          url: `https://gmail.google.com/a/${vm.org}.org`,
          label: 'Gmail',
        },
        {
          image: 'https://lh3.googleusercontent.com/K0vgpnn9Vour8ByU3htR3ou5Cx70Me-lW_51VEAIS5dfzXCQ0otXakVuPiQVc0V6qcf9aP_vkVul59airN27m3mttf4zQ1TPv4MVrw',
          url: `https://calendar.google.com/a/${vm.org}.org`,
          label: 'Calendar',
        },
        {
          image: 'https://lh3.googleusercontent.com/n3Eac1gPc5OTEh7Go1jemICnooceXtfs4VZW-4CPukCUi_doFsN9Q8njidksZ4KIFyPJVYtR7ZhLL16VoUJSPE1j74iTXT2xwCqq',
          url: `https://meet.google.com`,
          label: 'Meet',
        },
        {
          image: 'https://lh3.googleusercontent.com/rCwHBRBJV4wFiEIN_Mlboj94_TGJxyJtBh-MBFL4y1aZdO4hb7_Uc_PpXRyAoN7O9m_Zc1wSyp3H1vsnb829QE7t9KyGNJY9A1a3QQ',
          url: `https://drive.google.com/a/${vm.org}.org`,
          label: 'Drive',
        },
        {
          image: 'https://lh3.googleusercontent.com/1DECuhPQ1y2ppuL6tdEqNSuObIm_PW64w0mNhm3KGafi40acOJkc4nvsZnThoDKTH8gWyxAnipJmvCiszX8R6UAUu1UyXPfF13d7',
          url: `https://docs.google.com/a/${vm.org}.org`,
          label: 'Docs',
        },
        {
          image: 'https://lh3.googleusercontent.com/hK3UrUgS8y0fmfFlxr7hQFdKdkufJQ5aDWjB9Ft2hTLkVUaZTWTH_w5AvXU3C4zko7w1RVLEUQf0DnQ_id9c32IZ6upSLMVfhSWnJg',
          url: `https://chat.google.com/a/${vm.org}.org`,
          label: 'Chat',
        },
      ]
    },
  },
  methods: {
    showDivider(index) {
      return index !== 0
    },
  },
  async created() {
    await Promise.all([retrieveMethods(), retrieveMfa()])
  },
}
</script>
