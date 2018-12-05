// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// index > index.js > index.json > index.node
import router from './router/index.js'

// 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'

// 引入index.scss文件
import '@/styles/index.css'

import ElementUI from 'element-ui'
Vue.use(ElementUI)

Vue.config.productionTip = false

// 添加导航守卫
router.beforeEach((to, from, next) => {
  console.log(to)
  var token = localStorage.getItem('itcast_token')
  if (token || to.path === '/login') {
    next()
  } else {
    next({path: '/login'})
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
