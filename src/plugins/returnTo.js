import Vue from 'vue'

// TODO: currently no IE support for URLSearchParams (https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#Browser_compatibility)
// check this out for further info:  https://developers.google.com/web/updates/2016/01/urlsearchparams
// polyfill if needed (https://github.com/jerrybendy/url-search-params-polyfill) or the WebReflection one...
const returnTo = {
  url: new URLSearchParams(location.search).get('returnTo')
}

Vue.use(theVue => {
  theVue.prototype.$returnTo = returnTo
})

