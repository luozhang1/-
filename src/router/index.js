import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import User from '@/views/user/Users.vue'
import Right from '@/views/rights/Right.vue'
import Role from '@/views/rights/Role.vue'
import Param from '@/views/goods/Param.vue'
import Goods from '@/views/goods/Goods.vue'
import List from '@/views/goods/List.vue'
import Add from '@/views/goods/Add.vue'
import Categorie from '@/views/goods/Categorie.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'Login'}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/users',
          name: 'User',
          component: User
        },
        {
          path: '/rights',
          name: 'Right',
          component: Right
        },
        {
          path: '/roles',
          name: 'Role',
          component: Role
        },
        {
          path: '/params',
          name: 'Param',
          component: Param
        },
        {
          path: '/goods',
          name: 'Goods',
          component: Goods,
          redirect: {'name': 'List'},
          children: [
            {
              path: '/list',
              name: 'List',
              component: List
            },
            {
              path: '/add',
              name: 'Add',
              component: Add
            }
          ]
        },
        {
          path: '/categories',
          name: 'categories',
          component: Categorie
        }
      ]
    }

  ]
})
