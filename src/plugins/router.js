import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/home/Home';
import passwordRoutes from '@/password/routes';
import profileRoutes from '@/profile/routes';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      alias: '/',
      component: Home
    },
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
