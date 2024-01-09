import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/WatchView.vue')
    },
    {
      path: '/watch/:video',
      name: 'watch',
      component: () => import('../views/WatchView.vue')
    },
  ]
})

export default router
