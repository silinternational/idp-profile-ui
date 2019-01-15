import Vue from 'vue'
import Vuetify from 'vuetify/lib';
import locales from '@/locales'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  lang: {
    locales: locales
  },
  theme: {
    primary: '#015d99',
    secondary: '#791f5e'
  }
})
