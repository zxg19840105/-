import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [{ path: '/', component: () => import('@/views/home') },
      { path: '/goods/:id', component: () => import('@/views/goods') }]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/cart',
    component: () => import('@/views/cart')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior () {
    return {
      left: 0, top: 0
    }
  }
})

export default router
