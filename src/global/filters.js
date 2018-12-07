import Vue from 'vue'
import { format } from 'date-fns'

Vue.filter('format', (date, fmt = 'dddd, MMMM Do YYYY, h:mm:ss a') =>
  format(date, fmt)
)
