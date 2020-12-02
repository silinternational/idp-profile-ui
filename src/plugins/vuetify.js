import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import locales from '@/locales'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const configuredVuetify = new Vuetify({
  lang: {
    locales,
    current: determineCurrentLanguage()
  },
  theme: {
    themes: {
      light: {
        primary: `${process.env.VUE_APP_PRIMARY_COLOR}`,
        secondary: `${process.env.VUE_APP_SECONDARY_COLOR}`,
      }
    }
  },
})

function determineCurrentLanguage() {
  const mainLangOnly = navigator.language.substring(0,2)

  return locales[mainLangOnly] ? mainLangOnly : 'en'
}

export default configuredVuetify