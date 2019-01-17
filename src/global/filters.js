import Vue from 'vue'
import { format } from 'date-fns'

Vue.filter('format', (date, fmt = 'dddd, MMMM Do YYYY') =>
  format(date, fmt)
)
Vue.filter('formatLong', (date, fmt = 'dddd, MMMM Do YYYY, h:mm:ss a') =>
  format(date, fmt)
)
