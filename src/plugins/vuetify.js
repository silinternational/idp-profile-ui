import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  theme: {
    breakpoints: {
      thresholds: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1264,
        xl: 1904, // Match Vuetify 2 breakpoints
      },
    },
    themes: {
      light: {
        colors: {
          primary: import.meta.env.VITE_PRIMARY_COLOR,
          secondary: import.meta.env.VITE_SECONDARY_COLOR,
          error: '#FF5252', // Same as Vuetify 2
          success: '#4CAF50', // Same as Vuetify 2 (darker green)
          info: '#2196F3', // Same as Vuetify 2 (blue)
          warning: '#FF9800', // Same as Vuetify 2 (amber)
        },
      },
    },
  },
  components,
  directives,
})

export default vuetify
