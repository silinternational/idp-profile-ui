import Vue from 'vue'
import locales from '@/locales'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

Vue.use(createVuetify)

const configuredVuetify = new createVuetify({
  lang: {
    locales,
    current: determineCurrentLanguage(),
  },
  theme: {
    themes: {
      light: {
        primary: import.meta.env.VITE_PRIMARY_COLOR,
        secondary: import.meta.env.VITE_SECONDARY_COLOR,
      },
    },
  },
  components,
  directives,
})

function determineCurrentLanguage() {
  const mainLangOnly = navigator.language.substring(0, 2)

  return locales[mainLangOnly] ? mainLangOnly : 'en'
}

export default configuredVuetify
