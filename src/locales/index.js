// const contextualRequire = require.context('.', false, /\.json$/)
// const allLocales = {}

contextualRequire.keys().forEach((fileName) => {
  const messages = contextualRequire(fileName)
  const lang = fileName.match('/(.*).json')[1]

//   allLocales[lang] = messages
// })
//rewrite in es6 module because require is undefined
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

export default allLocales
