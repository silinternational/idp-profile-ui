import Intro from './Intro.vue'
import Complete from './Complete.vue'
import Index from './Index.vue'
import InviteExpired from './InviteExpired.vue'

export default [
  {
    path: '/profile/intro',
    component: Intro,
  },
  {
    path: '/welcome', // old pw-ui urls might still be bookmarked.
    redirect: '/profile',
  },
  {
    path: '/profile/complete',
    component: Complete,
  },
  {
    path: '/profile',
    alias: '/',
    component: Index,
  },
  {
    path: '/profile/invite/expired',
    component: InviteExpired,
    meta: {
      public: true,
    },
  },
]
