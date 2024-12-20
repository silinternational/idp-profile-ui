const returnTo = {
  url: new URLSearchParams(location.search).get('returnTo'),
}

// Export a function to register the returnTo property
export default {
  install: (app) => {
    app.config.globalProperties.$returnTo = returnTo
  },
}
