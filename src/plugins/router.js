import Vue from 'vue';
import Router from 'vue-router';
import homeRoutes from '@/home/routes';
import passwordRoutes from '@/password/routes';
import profileRoutes from '@/profile/routes';

Vue.use(Router);

const configuredRouter = new Router({
  mode: 'history',
  routes: [
    ...homeRoutes,
    ...passwordRoutes,
    ...profileRoutes,
    {
      path: '*',
      component: {
        render: h => h('span', 'page not found')
      }
    }
  ]
});

export default configuredRouter;
