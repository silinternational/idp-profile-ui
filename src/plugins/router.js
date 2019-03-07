import Vue from 'vue'
import Router from 'vue-router'
import homeRoutes from '@/home/routes'
import passwordRoutes from '@/password/routes'
import profileRoutes from '@/profile/routes'
import twoStepRoutes from '@/2sv/routes'
import PageNotFound from '@/global/PageNotFound'

Vue.use(Router)

const configuredRouter = new Router({
  routes: [
    ...homeRoutes,
    ...passwordRoutes,
    ...twoStepRoutes,
    ...profileRoutes,
    {
      path: '*',
      component: PageNotFound
    }
  ]
})

configuredRouter.beforeEach(async (to, from, next) => {
  if (!to.meta.public) {
    try {
      await Vue.prototype.$user.refresh()
    } catch (e) {
      if (e.status == 401) {
        Vue.prototype.$user.login(to.path, to.query.invite)
      }

      throw e
    }
  }

  next()
})

export default configuredRouter
