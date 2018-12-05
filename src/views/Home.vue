<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <div class="logo"></div>
        <el-menu
           @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"

          class="el-menu-admin"
          :unique-opened='uo'
          :router='true'
          :collapse='collapse'
        >
          <el-submenu :index="item.id +''" v-for='item in menuList' :key='item.id'>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>

            <el-menu-item :index="subitem.path" v-for='subitem in item.children' :key='subitem.id'>
              <template>
                <i class="el-icon-menu"></i>
                <span>{{subitem.authName}}</span>
              </template>
            </el-menu-item>
            <!-- <el-menu-item index="/users">选项2</el-menu-item> -->
          </el-submenu>
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>角色列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="2-3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>权限列表</span>
              </template>
            </el-menu-item>
          </el-submenu> -->
        </el-menu>
        </el-aside>
        <el-container>
          <el-header>
            <a href="javascrip:;" @click='collapse!=collapse' class="myicon myicon-menu toggle-btn"></a>
           <span class="system-title">电商后台管理系统</span>
           <div > <span class="welcome">欢迎您：XXX</span> </div>
           </el-header>
          <el-main>
         <router-view></router-view>
          </el-main>
        </el-container>

    </el-container>
  </div>
</template>
<script>
import { getMenu } from '@/api'
export default {
  data () {
    return {
      collapse: false,
      uo: true,
      menuList: []
    }
  },
  methods: {

    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted () {
    getMenu().then(res => {
      this.menuList = res.data
    })
  }
}

</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #ffffff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
