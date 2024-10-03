import Vue from 'vue'

const returnTo = {
  url: new URLSearchParams(location.search).get('returnTo'),
}

Vue.use((theVue) => {
  theVue.prototype.$returnTo = returnTo
})
