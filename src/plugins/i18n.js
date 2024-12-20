import locales from '@/locales'
import { createI18n } from 'vue-i18n'

export function determineCurrentLanguage() {
  const mainLangOnly = navigator.language.substring(0, 2)
  return locales[mainLangOnly] ? mainLangOnly : 'en'
}

const install = (app) => {
  const i18n = createI18n({
    legacy: false,
    locale: determineCurrentLanguage(),
    globalInjection: true,
    messages: locales,
  })

  app.use(i18n)
}

export default install
