import Vue from 'vue'
import { format, parseISO } from 'date-fns'

Vue.filter('format', (date, fmt = 'iiii, LLLL do yyyy') =>
  date ? format(parseISO(date), fmt) : '–'
)
Vue.filter('formatLong', (date, fmt = 'iiii, LLLL do yyyy, h:mm:ss a') =>
  date ? format(date, fmt) : '–'
)
