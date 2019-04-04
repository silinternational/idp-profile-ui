import Vue from 'vue'
import Router from 'vue-router'
import profileRoutes from '@/profile/routes'
import passwordRoutes from '@/password/routes'
import twoStepRoutes from '@/2sv/routes'
import PageNotFound from '@/global/PageNotFound'

Vue.use(Router)

const configuredRouter = new Router({
  routes: [
    ...profileRoutes,
    ...passwordRoutes,
    ...twoStepRoutes,
    {
      path: '/help', // old pw-ui urls might still be bookmarked.
      redirect: () => window.location = 'https://sites.google.com/sil.org/idphelp',
    },
    {
      path: '*',
      component: PageNotFound,
      meta: {
        public: true
      },  
    },
  ],
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
