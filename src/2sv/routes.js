import Intro from './Intro.vue'
import SmartphoneIntro from './smartphone/Intro.vue'
import DownloadApp from './smartphone/DownloadApp.vue'
import ScanQr from './smartphone/ScanQr.vue'
import VerifyQrCode from './smartphone/VerifyQrCode.vue'
import CodeVerified from './smartphone/CodeVerified.vue'
import KeyIntro from './key/Intro.vue'
import Insert from './key/Insert.vue'
import Touch from './key/Touch.vue'
import Confirmed from './key/Confirmed.vue'
import CodesIntro from './codes/Intro.vue'
import New from './codes/New.vue'
import Change from './Change.vue'
import Removed from './Removed.vue'
import mfa from '@/global/mfa'

export default [
  {
    path: '/2sv/intro',
    component: Intro,
  },
  {
    path: '/mfa/key', // old pw-ui urls might still be bookmarked.
    redirect: '/2sv/intro',
  },
  {
    path: '/mfa/app', // old pw-ui urls might still be bookmarked.
    redirect: '/2sv/intro',
  },
  {
    path: '/mfa/backup-codes/:recreate?', // old pw-ui urls might still be bookmarked.
    redirect: '/2sv/intro',
  },
  {
    path: '/2sv/smartphone/intro',
    component: SmartphoneIntro,
    beforeEnter: (to, from, next) => {
      skipWhen(mfa.totp.id, '/2sv/usb-security-key/intro', next)
    },
  },
  {
    path: '/2sv/smartphone/download-app',
    component: DownloadApp,
    beforeEnter: (to, from, next) => {
      skipWhen(mfa.totp.id, '/2sv/usb-security-key/intro', next)
    },
  },
  {
    path: '/2sv/smartphone/scan-qr',
    component: ScanQr,
    beforeEnter: (to, from, next) => {
      skipWhen(mfa.totp.id, '/2sv/usb-security-key/intro', next)
    },
  },
  {
    path: '/2sv/smartphone/verify-qr-code',
    component: VerifyQrCode,
    beforeEnter: (to, from, next) => {
      skipWhen(mfa.totp.id, '/2sv/usb-security-key/intro', next)
    },
  },
  {
    path: '/2sv/smartphone/code-verified',
    component: CodeVerified,
  },
  {
    path: '/2sv/usb-security-key/intro',
    component: KeyIntro,
  },
  {
    path: '/2sv/usb-security-key/insert',
    component: Insert,
  },
  {
    path: '/2sv/usb-security-key/touch',
    component: Touch,
  },
  {
    path: '/2sv/usb-security-key/confirmed',
    component: Confirmed,
  },
  {
    path: '/2sv/printable-backup-codes/intro',
    component: CodesIntro,
    beforeEnter: (to, from, next) => {
      skipWhen(mfa.backup.id, '/profile/complete', next)
    },
  },
  {
    path: '/2sv/printable-backup-codes/new',
    component: New,
  },
  {
    path: '/2sv/change/:id',
    component: Change,
  },
  {
    path: '/2sv/removed',
    component: Removed,
  },
]

const skipWhen = (exists, to, next) => (exists ? next(to) : next())
