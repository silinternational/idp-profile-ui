import Vue from 'vue';
import Router from 'vue-router';
import homeRoutes from '@/home/routes';
import passwordRoutes from '@/password/routes';
import profileRoutes from '@/profile/routes';
import twoStepRoutes from '@/2sv/routes';

Vue.use(Router);

const configuredRouter = new Router({
  mode: 'history',
  routes: [
    ...homeRoutes,
    ...passwordRoutes,
    ...twoStepRoutes,
    ...profileRoutes,
    {
      path: '*',
      component: {
        render: h => h('span', 'page not found')
      }
    }
  ]
});

configuredRouter.beforeEach(async (to, from, next) => {
  if (!to.meta.public) {
    try {
      await Vue.prototype.$user.refresh();
    } catch (e) {
      return next(false);
    }
  }

  next();
});

export default configuredRouter;
