// Packages
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

// Local Imports
import LandingView from '../views/landing/landing-view.vue';
import LoginView from '../views/login/login-view.vue';
import HomeView from '../views/home/home-view.vue';

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
    component: () => import('../views/about/about-view.vue'),
  },
  {
    path: '/attempt/:user/:id',
    name: 'Attempt',
    component: () => import('../views/attempt/attempt-view.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/error/404-view.vue'),
  },
  {
    path: '/500',
    name: '500',
    component: () => import('../views/error/500-view.vue'),
  },
  {
    path: '/interest/:user/:id',
    name: 'Interest',
    component: () => import('../views/interest/interest-view.vue'),
  },
  {
    path: '/location/:id',
    name: 'Location',
    component: () => import('../views/location/location-view.vue'),
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import('../views/profile/profile-view.vue'),
  },
  {
    path: '/route/:location/:id',
    name: 'Route',
    component: () => import('../views/route/route-view.vue'),
  },
  {
    path: '/session/:id',
    name: 'Session',
    component: () => import('../views/session/session-view.vue'),
  },
  {
    path: '/shoes/:brand/:model',
    name: 'Shoes',
    component: () => import('../views/shoes/shoes-view.vue'),
  },
  {
    path: '/shoes/:brand/:model/:id',
    name: 'Shoes Log',
    component: () => import('../views/shoes/shoes-log-view.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
