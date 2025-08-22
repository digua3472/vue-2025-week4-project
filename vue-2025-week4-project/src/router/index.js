import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/week1',
      name: 'week1',
      component: () => import('../views/Week1View.vue'),
    },
    {
      path: '/week2',
      name: 'week2',
      component: () => import('../views/Week2View.vue'),
    },
    {
      path: '/week3',
      name: 'week3',
      component: () => import('../views/Week3View.vue'),
    },
    {
      path: '/week4',
      name: 'week4',
      component: () => import('../views/Week4View.vue'),
    },
  ],
})

export default router
