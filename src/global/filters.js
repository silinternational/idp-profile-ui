import { format, parseISO } from 'date-fns'

export function formatDate(date, fmt = 'iiii, LLLL do yyyy') {
  return date ? format(parseISO(date), fmt) : '–'
}

export function formatLongDate(date, fmt = 'iiii, LLLL do yyyy, h:mm:ss a') {
  return date ? format(date, fmt) : '–'
}
