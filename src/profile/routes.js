import Intro from './Intro'
import Complete from './Complete'
import Index from './Index'
import InviteExpired from './InviteExpired'

export default [
  {
    path: '/profile/intro',
    component: Intro
  },
  {
    path: '/profile/complete',
    component: Complete
  },
  {
    path: '/profile',
    component: Index
  },
  {
    path: '/profile/invite/expired',
    component: InviteExpired,
    meta: {
      public: true
    },
  },
]
