import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home/index.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('@/pages/message/index.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('@/pages/mine/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
