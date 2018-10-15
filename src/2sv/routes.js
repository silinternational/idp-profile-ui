import Intro from './Intro';
import SmartphoneIntro from './smartphone/Intro';
import DownloadApp from './smartphone/DownloadApp';

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
  }
];
