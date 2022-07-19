import Intro from './Intro'
import Complete from './Complete'
import Index from './Index'
import InviteExpired from './InviteExpired'
import Account from './Account'
import Security from './Security'
export default [
  {
    path: '/profile/intro',
    component: Intro
  },
  {
    path: '/welcome', // old pw-ui urls might still be bookmarked.
    redirect: '/profile',
  },
  {
    path: '/profile/complete',
    component: Complete
  },
  {
    path: '/profile',
    alias: '/',
    component: Index
  },
  {
    path: '/profile/account',
    alias: '/account',
    component: Account
  },
  {
    path: '/profile/security',
    alias: '/security',
    component: Security
  },
  {
    path: '/profile/invite/expired',
    component: InviteExpired,
    meta: {
      public: true
    },
  },
]
