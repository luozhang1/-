// import axios from 'axios'
// // 配置基准道路
// const baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// // 设置基准道路:因为请求的路径是相对于这个基准路径而言的。所以我们就需要让所有的路由都以这个路径做为参照
// axios.defaults.baseURL = baseURL
// // 为axios设置拦截器：因为所有请求是通过axios发出
// // 功能：在发送请求之前实现相应的业务处理
// // 获取token值，如果与token值就通过请求头方式设置
// // 如果没有token，只实现拦截器的默认操作
// axios.interceptors.request.use(function (config) {
// // 在发送请求前做些什么
//   var token = localStorage.getItem('itcast-token')
//   if (token) {
//     // 通过请求头的方式发送token
//     config.headers['Authorization'] = token
//   }
//   return config
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })
// // 登录验证接口方式
// export const login = (pa) => {
//   return axios.post('login', pa)
//     .then((result) => {
//       return result.data
//     })
// }

// // 获取所有用户数据
// export const GetUserList = (pa) => {
//   return axios.get('users', {params: pa})
//     .then((result) => {
//       return result.data
//     })
// }
import axios from 'axios'
// 配置基准路径
const baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 设置基准路径：因为请求的路径是相对于这个基准路径而言的。所以我们就需要让所有的路由都以这个路径做为参照
axios.defaults.baseURL = baseURL

// 为axios添加拦截器：因为所有请求都是通过axios来发送的，所以为它添加拦截器就相当于为所有请求添加了拦截器
// 它的功能：在发送请求之前实现相应的业务处理：
// 1.获取token值，如果有token值就通过请求头的方式设置
// 2.如果没有token,则实现拦截器的默认操作
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  var token = localStorage.getItem('itcast_token')
  if (token) {
    // 通过请求头的方式发送token
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 登陆验证接口方法
export const login = (pa) => {
  return axios.post('login', pa)
    .then((result) => {
      return result.data
    })
}

// 获取所有用户数据
export const GetUserList = (pa) => {
  return axios.get('users', {params: pa})
    .then((result) => {
      return result.data
    })
}
// 新增
export const addUser = (pa) => {
  return axios.post('users', pa)
    .then((result) => {
      return result.data
    })
}
// 编辑
export const editUser = (pa) => {
  return axios.put(`users/${pa.id}`, pa)
    .then((result) => {
      return result.data
    })
}
// 删除
export const deleteUser = (id) => {
  return axios.delete(`users/${id}`)
    .then((result) => {
      return result.data
    })
}
// 授权获取角色数据

export const grantList = () => {
  return axios.get('roles')
    .then((result) => {
      return result.data
    })
}
// 实现单个用户角色的授予
export const userList = (pa) => {
  return axios.put(`users/${pa.id}/role`, {rid: pa.rid})
    .then((result) => {
      return result.data
    })
}
// 实现单个角色授权的修改
export const changeUserList = (uid, type) => {
  return axios.put(`users/${uid}/state/${type}`)
    .then((result) => {
      return result.data
    })
}
// 获取左侧
export const getMenu = () => {
  return axios.get(`menus`)
    .then((result) => {
      return result.data
    })
}
// 获取商品数据列表
export const getRightlist = (pa) => {
  return axios.get(`rights/${pa.type}`)
    .then((result) => {
      return result.data
    })
}
// 获取角色数据
export const getrolelist = () => {
  return axios.get(`roles`)
    .then((result) => {
      return result.data
    })
}
// 获取所有权限
export const getRightslist = (type) => {
  return axios.get(`rights/${type}`)
    .then((result) => {
      return result.data
    })
}
// 实现当前角色的权限分配
// roleId:当前角色的id
// rids:它是一个对象，键就是rids,值是以 , 分割的权限ID列表--字符串:{rids:'1,2,3,4,5'}
export const grantroleright = (roleId, rids) => {
  return axios.post(`roles/${roleId}/rights`, {rids})
    .then((result) => {
      return result.data
    })
}
// 删除角色权限
// roles/:roleId/rights/:rightId
export const deleteroleright = (roleId, rightId) => {
  return axios.delete(`roles/${roleId}/rights/${rightId}`)
    .then((result) => {
      return result.data
    })
}
// 添加角色
export const addRole = (pa) => {
  return axios.post(`roles`, pa)
    .then((result) => {
      return result.data
    })
}
// 删除角色
// roles/:id
// 请求方法：delete
export const deleteRole = (id, pa) => {
  return axios.post(`roles/${id}`, pa)
    .then((result) => {
      return result.data
    })
}
/// / 获取商品数据列表
export const getGoodsList = (pa) => {
  return axios.get(`goods`, {params: pa})
    .then((result) => {
      return result.data
    })
}
