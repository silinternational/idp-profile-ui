// component name reference https://github.com/vuetifyjs/vuetify/tree/dev/src/components
import {
  Vuetify,
  VApp,
  VBtn,
  VDivider,
  VFooter,
  VForm,
  VGrid,
  VIcon,
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
Vue.use(Vuetify, {
  components: {
    Vuetify,
    VApp,
    VBtn,
    VDivider,
    VFooter,
    VForm,
    VGrid,
    VIcon,
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
