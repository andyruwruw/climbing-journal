// Packages
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

// Local Imports
import LandingView from '../views/landing/LandingView.vue';
import LoginView from '../views/login/LoginView.vue';
import HomeView from '../views/home/HomeView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Landing',
    component: LandingView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/about/AboutView.vue'),
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import('../views/profile/ProfileView.vue'),
  },
  {
    path: '/session/:id',
    name: 'Session',
    component: () => import('../views/session/SessionView.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/error/404View.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
