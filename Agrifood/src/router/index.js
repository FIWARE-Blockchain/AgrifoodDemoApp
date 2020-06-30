import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'info',
    component: () => import('../components/HomeComponent')
  },
  {
    path: '/farm',
    name: 'farm',
    component: () => import('../components/FarmComponent')
  },
  {
    path: '/manufacturer',
    name: 'manufacturer',
    component: () => import('../components/ManufacturerComponent')
  },
  {
    path: '/distributor',
    name: 'distributor',
    component: () => import('../components/DistributorComponent')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
