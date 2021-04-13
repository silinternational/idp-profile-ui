import 'u2f-api-polyfill'

export default window.u2f

export function isSupported() {
  return window.chrome || ! window.navigator.userAgent.match(/safari/i)
}