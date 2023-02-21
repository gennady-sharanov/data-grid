import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import ElementsPage from '@/pages/ElementsPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/elements',
    name: 'elements',
    component: ElementsPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base:  process.env.BASE_URL,
  routes
});

export default router;
