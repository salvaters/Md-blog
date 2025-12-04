import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/about/index.vue')
    },
    {
      path: '/article/:id',
      name: 'articleName',
      component: () => import('@/layouts/default/article/index.vue')
    }
  ]
})

export default router
