// component name reference https://github.com/vuetifyjs/vuetify/tree/dev/src/components
import {
  Vuetify,
  VAlert,
  VApp,
  VBtn,
  VCard,
  VDivider,
  VFooter,
  VForm,
  VGrid,
  VIcon,
  VImg,
  VList,
  VStepper,
  VSubheader,
  VTextField,
  VToolbar,
  VTooltip,
  transitions
} from 'vuetify';

import 'vuetify/src/stylus/app.styl';
import Vue from 'vue';
import locales from '@/locales';

Vue.use(Vuetify, {
  lang: {
    locales: locales
  },
  components: {
    Vuetify,
    VAlert,
    VApp,
    VBtn,
    VCard,
    VDivider,
    VFooter,
    VForm,
    VGrid,
    VIcon,
    VImg,
    VList,
    VStepper,
    VSubheader,
    VTextField,
    VToolbar,
    VTooltip,
    transitions
  },
  theme: {
    primary: '#015d99',
    secondary: '#791f5e'
  }
});
