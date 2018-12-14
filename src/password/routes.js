import Create from './Create'
import Confirm from './Confirm'
import Saved from './Saved'
import Recovery from './Recovery'
import VerifyRecoveryMethod from './VerifyRecoveryMethod'
import Forgot from './Forgot'
import ForgotEmailSent from './ForgotEmailSent'

export default [
  {
    path: '/password/create',
    component: Create
  },
  {
    path: '/password/confirm',
    component: Confirm
  },
  {
    path: '/password/saved',
    component: Saved
  },
  {
    path: '/password/recovery',
    component: Recovery
  },
  {
    path: '/password/recovery/:id/verify',
    component: VerifyRecoveryMethod,
    meta: {
      public: true
    }
  },
  {
    path: '/password/forgot',
    component: Forgot,
    meta: {
      public: true
    }
  },
  {
    path: '/password/forgot/:id',
    component: ForgotEmailSent,
    meta: {
      public: true
    }
  }
]
