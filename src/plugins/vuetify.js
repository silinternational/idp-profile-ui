import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: import.meta.env.VITE_PRIMARY_COLOR,
          secondary: import.meta.env.VITE_SECONDARY_COLOR,
        },
      },
    },
  },
  components,
  directives,
})

export default vuetify
