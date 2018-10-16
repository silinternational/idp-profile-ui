import Intro from './Intro';
import SmartphoneIntro from './smartphone/Intro';
import DownloadApp from './smartphone/DownloadApp';
import ScanQr from './smartphone/ScanQr';
import VerifyQrCode from './smartphone/VerifyQrCode';
import CodeVerified from './smartphone/CodeVerified';

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
  }
];
