import Vue from 'vue';
import VueRouter from 'vue-router';

import { DiagramView, AboutView, LineView } from '@/views';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: DiagramView
  },
  {
    path: '/line',
    component: LineView
  },
  {
    path: '/about',
    component: AboutView
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
