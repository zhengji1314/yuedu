import Vue from 'vue'
import axios from 'axios'
// 引入路由
import router from '@/router'
// 引入大数字处理模块
import JSONbig from 'json-bigint'

// 公共根地址
axios.defaults.baseURL = 'http://application/x-www-form-urlencoded/'
// 请求拦截器
axios.interceptors.request.use(function (config) {
  let userinfo = window.sessionStorage.getItem('userinfo')
  if (userinfo) {
    let token = JSON.parse(userinfo).token
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 配置响应拦截器
axios.interceptors.response.use(function (response) {
  // response：服务器端返回的数据信息，与 then(result=>{}) 的result一致
  return response
}, function (error) {
  // 判断响应状态码如果登录401，就强制登录
  // error对象
  // error.response.status======401
  // console.dir(error)
  if (error.response.status === 401) {
    // 强制登录
    router.push({ name: 'login' })
  }
  return Promise.reject(error)
})

// 对服务器端返回来的数据信息做处理(尤其是大数字的处理)
// axios配置"数据转换器"
axios.defaults.transformResponse = [function (data) {
  if (data) {
    return JSONbig.parse(data)
  } else {
    return data
  }
}]
// 把axios通过原型继承的方式配置给Vue，使得组件内部可以直接访问
// 后期在组件内部就可以通过 this.$http 的方式获得axios对象
// $http:就是自定义名称，可以为其他
Vue.prototype.$http = axios
