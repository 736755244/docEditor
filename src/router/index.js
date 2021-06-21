import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [{
        path: '/Home',
        component: () => import ('@/views/Home/index'),
        name: 'home'
      }]
    },
    {
      path: '/toEditor',
      component: Layout,
      redirect: '/editor',
      children: [{
        path: '/editor',
        component: () => import ('@/views/Editor/index'),
        name: 'editor'
      }]
    },
    {
      path: '/toDetail',
      component: Layout,
      redirect: '/detail',
      children: [{
        path: '/detail',
        component: () => import ('@/views/Detail/index'),
        name: 'detail'
      }]
    },
    { 
      path: '*', 
      component: () => import('@/views/Error/404'), 
      hidden: true 
    }
  ]
})

//解决重复路由
const originalPush = Router.prototype.push
  Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}