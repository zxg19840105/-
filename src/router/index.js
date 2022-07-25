import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [{ path: '/', component: () => import('@/views/home') },
      { path: '/goods/:id', component: () => import('@/views/goods') }]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
