import Intro from './Intro';
import SmartphoneIntro from './smartphone/Intro';
import DownloadApp from './smartphone/DownloadApp';
import ScanQr from './smartphone/ScanQr';
import VerifyQrCode from './smartphone/VerifyQrCode';
import CodeVerified from './smartphone/CodeVerified';
import KeyIntro from './key/Intro';
import Insert from './key/Insert';
import Touch from './key/Touch';
import Confirmed from './key/Confirmed';

export default [
  {
    path: '/2sv/intro',
    component: Intro
  },
  {
    path: '/2sv/smartphone/intro',
    component: SmartphoneIntro
  },
  {
    path: '/2sv/smartphone/download-app',
    component: DownloadApp
  },
  {
    path: '/2sv/smartphone/scan-qr',
    component: ScanQr
  },
  {
    path: '/2sv/smartphone/verify-qr-code',
    component: VerifyQrCode
  },
  {
    path: '/2sv/smartphone/code-verified',
    component: CodeVerified
  },
  {
    path: '/2sv/usb-security-key/intro',
    component: KeyIntro
  },
  {
    path: '/2sv/usb-security-key/insert',
    component: Insert
  },
  {
    path: '/2sv/usb-security-key/touch',
    component: Touch
  },
  {
    path: '/2sv/usb-security-key/confirmed',
    component: Confirmed
  }
];
