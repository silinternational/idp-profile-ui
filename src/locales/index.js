const contextualRequire = require.context('.', false, /\.json$/)
const allLocales = {}

contextualRequire.keys().forEach(fileName => {
  const messages = contextualRequire(fileName)
  const lang = fileName.match('/(.*).json')[1]

  allLocales[lang] = messages
})

export default allLocales
