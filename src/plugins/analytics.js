import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import configuredRouter from './router'

Vue.use(VueAnalytics, {
  id: `${process.env.VUE_APP_ANALYTICS_ID}`,
  router: configuredRouter,
})