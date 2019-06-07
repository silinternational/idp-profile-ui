import Vue from 'vue'
import Vuetify from 'vuetify/lib';
import locales from '@/locales'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  lang: {
    locales: locales,
    current: determineCurrentLanguage()
  },
  theme: {
    primary: `${process.env.VUE_APP_PRIMARY_COLOR}`,
    secondary: `${process.env.VUE_APP_SECONDARY_COLOR}`,
  },
})

function determineCurrentLanguage() {
  const mainLangOnly = navigator.language.substring(0,2)

  return locales[mainLangOnly] ? mainLangOnly : 'en'
}