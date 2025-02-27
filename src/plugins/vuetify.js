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
          error: import.meta.env.VITE_ERROR_COLOR || '#D52227', // SIL red
          success: import.meta.env.VITE_SUCCESS_COLOR || '#509E2F', // SIL green
          warning: import.meta.env.VITE_ORANGE || '#FF6B00', // SIL orange
          info: '#2196F3', // Same as Vuetify 2 (blue)
        },
      },
    },
  },
  components,
  directives,
})

export default vuetify
