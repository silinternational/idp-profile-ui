import configuredRouter from './router'

const GA_MEASUREMENT_ID = import.meta.env.VITE_ANALYTICS_ID || ''

init()

// https://developers.google.com/analytics/devguides/collection/gtagjs
// https://developers.google.com/analytics/devguides/collection/upgrade/analyticsjs
function init() {
  loadLib()

  window.dataLayer = window.dataLayer || []

  window.gtag = function () {
    dataLayer.push(arguments)
  }

  gtag('js', new Date())

  //since we are sending manually we need to disable the default of sending each pageview
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
  })

  configuredRouter.beforeEach((to, from, next) => {
    trackPageView(to.path)

    next()
  })
}

function loadLib() {
  const script = document.createElement('script')

  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  script.async = true

  document.head.appendChild(script)
}

function trackPageView(page) {
  if (page) {
    // https://developers.google.com/analytics/devguides/collection/gtagjs/pages#default_behavior
    gtag('event', 'page_view', {
      page_path: page,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
function trackEvent(eventName, eventParameters) {
  gtag('event', eventName, eventParameters)
}

export const notFound = () => trackEvent('Error', 'Page not found')
