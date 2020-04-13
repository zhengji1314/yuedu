import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'index',
    redirect: '/login',
  },
  {
    path: '/login', // 登录页面
    name: 'login',
    component: () =>
      import('@/views/login')
  },
  {
    path: '/home', // 首页
    name: 'home',
    component: () =>
      import('@/views/home/home')
  }
]

// 设置 全局前置守卫
// router.beforeEach((to, from, next) => {
//   // 用户如果是"非登录"状态，并且其还要访问 非登录 页面，那么就强制登录去
//   var userinfo = window.sessionStorage.getItem('userinfo')
//   if (!userinfo && to.path !== '/login') {
//     // 路由导航到登录页面
//     return next('/login') // ok
//   }
//   next()
// })
const router = new VueRouter({
  routes
})

export default router
