<template>
  <div class="role">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>

    </el-breadcrumb>
    <el-button
      type="success"
      plain
      @click='showadddialog'
    >添加角色</el-button>
    <!-- 表单数据 -->
    <el-table
      border
      :data="roleList"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row
            v-for="first in scope.row.children"
            :key='first.id'
            style='margin-bottom:15px'
          >
            <el-col :span='4'>
              <el-tag
                closable
                type='success'
                @close='deleteroleright(scope.row,first.id)'
              >
                {{first.authName}}
              </el-tag>
              <span
                class="el-icon-arrow-right"
                v-if='first.children.length!==0'
              ></span>
            </el-col>
            <el-col :span='20'>
              <el-row
                v-for="second in first.children"
                :key='second.id'
                style='margin-bottom:8px'
              >
                <el-col :span='4'>
                  <el-tag
                    closable
                    type='warning'
                    @close='deleteroleright(scope.row,second.id)'
                  >
                    {{second.authName}}
                  </el-tag>
                  <span
                    class="el-icon-arrow-right"
                    v-if='second.children.length!==0'
                  ></span>
                </el-col>
                <el-col :span='20'>
                  <el-tag
                    closable
                    type='info'
                    v-for="third in second.children"
                    :key='third.id'
                    style='margin-right:5px;margin-bottom:5px'
                    @close='deleteroleright(scope.row,third.id)'
                  >
                    {{third.authName}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <span v-if='scope.row.children.length===0'>该角色还没有分配任何权限</span>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column
        label="角色名称"
        prop="roleName"
      >
      </el-table-column>
      <el-table-column
        label="描述"
        prop="roleDesc"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            title='编辑'
          ></el-button>
          <el-tooltip
            class="item"
            effect="light"
            content="删除"
            placement="top-start"
            @click="deleterole(scope.row)"
          >
            <el-button
              type="primary"
              icon="el-icon-delete"
              plain
            ></el-button>
          </el-tooltip>
          <el-button
            type="primary"
            icon="el-icon-check"
            plain
            title='授权角色'
            @click="showGrantDialog(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配角色对话框 -->
    <!--  -->

    <el-dialog
      title="角色授权"
      :visible.sync="grantdialogFormVisible"
    >

      <div class="size">
        <el-tree
          :default-expand-all='true'
          :data="riightsList"
          show-checkbox
          node-key="id"
          ref='tree'
          :props="defaultProps"
          :default-checked-keys="rolerdeightlist"
        >
        </el-tree>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="grantdialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="grantsubmit"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加角色对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="adddialogFormVisible"
    >
      <el-form
        :model="addform"
        label-width="80px"
      >
        <el-form-item label="角色名称">
          <el-input
            v-model="addform.roleName"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="addform.roleDesc"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addRoleSubmit"
        >确 定</el-button>
      </div>

    </el-dialog>
  </div>
</template>
<script>
import {
  getrolelist,
  getRightslist,
  grantroleright,
  deleteroleright,
  addRole,
  deleteRole
} from '@/api'
export default {
  data () {
    return {
      // 树形组件的动态绑定数据时的设置
      // 获取三个值 包括id
      defaultProps: {
        children: 'children', // 指定当前节点的嵌套节点属性--决定子节点的数据的来源
        label: 'authName' // 当前节点所显示的内容的属性名称
      },
      addform: {
        roleName: '',
        roleDesc: ''
      },
      grantdialogFormVisible: false,
      adddialogFormVisible: false,
      roleList: [],
      riightsList: [],
      // 当前角色的权限列表id
      rolerdeightlist: [],
      //   当前角色的id
      currentRoleId: ''
    }
  },
  mounted () {
    this.initList()
  },
  methods: {
    // 删除角色
    deleterole (row, id) {
      console.log(123)
      deleteRole(row.id, id).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.$message.success('删除成功')
          this.initList()
        } else {
          this.$message.warning('删除失败')
        }
      })
    },
    // 添加角色框显示
    showadddialog () {
      this.adddialogFormVisible = true
    },
    // 添加角色
    addRoleSubmit () {
      addRole(this.addform).then(res => {
        if (res.meta.status === 201) {
          this.$message.success('添加成功')
          this.adddialogFormVisible = false
          this.initList()
        } else {
          this.$message.warning('添加失败')
        }
      })
    },
    //   删除角色的权限
    deleteroleright (row, rightid) {
      deleteroleright(row.id, rightid).then(res => {
        if (res.meta.status === 200) {
          this.$message.success('删除成功')
          row.children = res.data
        } else {
          this.$message.warning('删除失败')
        }
      })
    },
    grantsubmit () {
      console.log(this.$refs.tree.getCheckedKeys())
      // 1.获取当前所有被选中的节点对象。它是一个数组
      var selectednodes = this.$refs.tree.getCheckedNodes()
      // 2.遍历数组，获取我们需要的每一个对象中的id和pid  使用map遍历数组 存到数组中 id pid代表的数据
      // 遍历 ：["105,104,101","116,104,101"]
      var originArr = selectednodes.map(item => {
        return item.id + ',' + item.pid
      })
      //   3.将获取到的数据拼接为一个整体字符中 -- 有重复值
      // 105,104,101,116,104,101
      var originStr = originArr.join(',')
      console.log(originStr)
      //   4.使用new Set去除重复值
      // 去重复
      var myset = new Set(originStr.split(','))
      //   5.使用Array.from从set对象返回数组
      var finalArr = Array.from(myset)
      var finalRid = finalArr.join(',')
      console.log(finalRid)
      //   发送授权请求
      grantroleright(this.currentRoleId, finalRid).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.$message.success('更新权限成功')
          this.grantdialogFormVisible = false
          this.initList()
        } else {
          this.$message.success('更新权限失败')
        }
      })
    },
    // 弹出角色授权对话框
    showGrantDialog (row) {
      //   this.grantdialogFormVisible = true
      //   // 显示分配权限对话框
      this.grantdialogFormVisible = true
      this.currentRoleId = row.id
      // 获取所有权限数据{type: 'tree'}

      getRightslist('tree').then(res => {
        console.log(res)
        this.riightsList = res.data
      })
      // 打开对话框的时候去获取当前角色的权限列表id,因为每个角色的权限都可能不一样，所以每次弹框都需要重新获取这个列表id
      // 先清除上次的id号
      this.rolerdeightlist.length = 0
      // 遍历
      row.children.forEach((first, index) => {
        if (first.children && first.children.length !== 0) {
          first.children.forEach(second => {
            if (second.children && second.children.length !== 0) {
              second.children.forEach(third => {
                this.rolerdeightlist.push(third.id)
              })
            }
          })
        }
      })

      // 打开对话框的时候去获取当前角色的权限列表id,因为每个角色的权限都可能不一样，所以每次弹框都需要重新获取这个列表id
      // 先清除上次的id号
      //   this.rolerdeightlist.length = 0
    },
    initList () {
      getrolelist().then(res => {
        console.log(res)
        this.roleList = res.data
      })
    }
  }
}
</script>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.size {
  height: 400px;
  overflow: auto;
}
</style>
