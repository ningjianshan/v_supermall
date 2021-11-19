import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Cart = () => import('views/cart/Cart')
const CateGory = () => import('views/category/CateGory')
const ProFile = () => import('views/profile/ProFile')
const Detail = () => import('views/detail/Detail')

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: CateGory
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/proFile',
    component: ProFile
  },
  {
    path: '/detail',
    component: Detail
  }
]

export default new VueRouter({
  mode: 'history',
  routes,
})