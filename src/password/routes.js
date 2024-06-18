import Create from './Create'
import Confirm from './Confirm'
import Saved from './Saved'
import Recovery from './Recovery'
import VerifyRecoveryMethod from './VerifyRecoveryMethod'
import Forgot from './Forgot'
import ForgotEmailSent from './ForgotEmailSent'
import VerifyReset from './VerifyReset'
import CompleteReset from './CompleteReset'

export default [
  {
    path: '/password/create',
    component: Create,
  },
  {
    path: '/change', // old pw-ui urls might still be bookmarked.
    redirect: '/password/create',
  },
  {
    path: '/password/confirm',
    component: Confirm,
  },
  {
    path: '/password/saved',
    component: Saved,
    meta: {
      public: true,
    },
  },
  {
    path: '/password/recovery',
    component: Recovery,
  },
  {
    path: '/recovery-method/add', // old pw-ui urls might still be bookmarked.
    redirect: '/password/recovery',
  },
  {
    path: '/recovery-method/add-phone', // old pw-ui urls might still be bookmarked.
    redirect: '/password/recovery',
  },
  {
    path: '/recovery-method/verify-phone/:id', // old pw-ui urls might still be bookmarked.
    redirect: '/password/recovery',
  },
  {
    path: '/recovery-method/verify-email/:id', // old pw-ui urls might still be bookmarked.
    redirect: '/password/recovery',
  },
  {
    path: '/password/recovery/:id/verify/:code',
    component: VerifyRecoveryMethod,
    meta: {
      public: true,
    },
  },
  {
    path: '/password/forgot',
    component: Forgot,
    meta: {
      public: true,
    },
  },
  {
    path: '/forgot', // old pw-ui urls might still be bookmarked.
    redirect: '/password/forgot',
  },
  {
    path: '/password/forgot/:id',
    component: ForgotEmailSent,
    meta: {
      public: true,
    },
  },
  {
    path: '/password/reset/:id/verify/:code',
    component: VerifyReset,
    meta: {
      public: true,
    },
  },
  {
    path: '/reset/:id/verify/:code', // old pw-ui urls might still be bookmarked.
    redirect: '/password/reset/:id/verify/:code',
  },
  {
    path: '/password/reset/complete',
    component: CompleteReset,
    meta: {
      public: true,
    },
  },
]
