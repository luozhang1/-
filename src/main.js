// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// index > index.js > index.json > index.node
import router from './router/index.js'

import VueAMap from 'vue-amap'
// 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'

// 引入index.scss文件
import '@/styles/index.css'
import ECharts from 'vue-echarts'
import ElementUI from 'element-ui'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
Vue.component('chart', ECharts)
Vue.use(VueAMap)
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
