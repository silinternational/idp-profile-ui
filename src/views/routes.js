import Home from './Home';
import CreatePassword from './password/Create';
import Intro from './profile/Intro';

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/password/create',
    component: CreatePassword
  },
  {
    path: '/profile/intro',
    component: Intro
  }
];
