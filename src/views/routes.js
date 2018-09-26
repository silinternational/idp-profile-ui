import Home from './Home';
import passwordRoutes from './password/routes'
import profileRoutes from './profile/routes'

export default [
  {
    path: '/home',
    alias: '/',
    component: Home,
  },
  ...passwordRoutes,
  ...profileRoutes,
  {
    path: '*',
    component: {
      render: h => h('span', 'page not found')
    },
  }
];
