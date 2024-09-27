import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import ko from './ko.json'

const allLocales = {
  en,
  es,
  fr,
  ko,
}
contextualRequire.keys().forEach((fileName) => {
  const messages = contextualRequire(fileName)
  const lang = fileName.match('/(.*).json')[1]
})

export default allLocales
