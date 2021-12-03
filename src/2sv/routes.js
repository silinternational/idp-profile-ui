import Intro from './Intro'
import SmartphoneIntro from './smartphone/Intro'
import DownloadApp from './smartphone/DownloadApp'
import ScanQr from './smartphone/ScanQr'
import VerifyQrCode from './smartphone/VerifyQrCode'
import CodeVerified from './smartphone/CodeVerified'
import KeyIntro from './key/Intro'
import Insert from './key/Insert'
import Touch from './key/Touch'
import Confirmed from './key/Confirmed'
import CodesIntro from './codes/Intro'
import New from './codes/New'
import Change from './Change'
import Removed from './Removed'
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
    }
  },
  {
    path: '/2sv/smartphone/download-app',
    component: DownloadApp,
    beforeEnter: (to, from, next) => {
      skipWhen(mfa.totp.id, '/2sv/usb-security-key/intro', next)
    }
  },
  {
    path: '/2sv/smartphone/scan-qr',
    component: ScanQr,
    beforeEnter: (to, from, next) => {
      skipWhen(mfa.totp.id, '/2sv/usb-security-key/intro', next)
    }
  },
  {
    path: '/2sv/smartphone/verify-qr-code',
    component: VerifyQrCode,
    beforeEnter: (to, from, next) => {
      skipWhen(mfa.totp.id, '/2sv/usb-security-key/intro', next)
    }
  },
  {
    path: '/2sv/smartphone/code-verified',
    component: CodeVerified,
  },
  {
    path: '/2sv/usb-security-key/intro',
    component: KeyIntro,
    beforeEnter: (to, from, next) => {
      skipWhen(mfa.u2f.id, '/2sv/printable-backup-codes/intro', next)
    }
  },
  {
    path: '/2sv/usb-security-key/insert',
    component: Insert,
    beforeEnter: (to, from, next) => {
      skipWhen(mfa.u2f.id, '/2sv/printable-backup-codes/intro', next)
    }
  },
  {
    path: '/2sv/usb-security-key/touch',
    component: Touch,
    beforeEnter: (to, from, next) => {
      skipWhen(mfa.u2f.id, '/2sv/printable-backup-codes/intro', next)
    }
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
    }
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

const skipWhen = (exists, to, next) => exists ? next(to) : next()