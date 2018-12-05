<template>
  <div class="users">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="serachkey"
        class="input-with-select"
        style="width:300px"
      >
      </el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="searchUsers"
      ></el-button>
      <el-button
        type="success"
        plain
        @click='adddialogFormVisible = true'
      >添加用户</el-button>
      <!-- 数据表格区域 -->
    </div>
    <template>
      <el-table
        :data="userList"
        border
        style="width: 100%; margin-top:15px"
      >
        <el-table-column
          type="index"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
        >
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
               @change='changeUserState(scope.row)'
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              content="编辑"
              placement="top"
            >
              <el-button
                type='primary'
                icon="el-icon-edit"
                size="mini"
                @click="handleEdit(scope.row)"
                plain
              ></el-button>
            </el-tooltip>
            <el-tooltip
              content="删除"
              placement="top"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size='mini'
                @click="handleDelete(scope.row.id)"
                plain
              ></el-button>
            </el-tooltip>
            <el-tooltip
              content="分配角色"
              placement="top"
            >
              <el-button
                size="mini"
                type="info"
                icon="el-icon-share"
                @click="showNam(scope.row)"
                plain
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 2, 3, 4,10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 新增用户 -->
    <!-- 新增用户对话框 -->
    <el-dialog
      title="收货地址"
      :visible.sync="adddialogFormVisible"
    >
      <el-form
        :model="addform"
        label-width="100px"
        :rules="rules"
        ref="addform"
      >
        <el-form-item
          label="用户名"
          prop='username'
        >
          <el-input
            v-model="addform.username"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop='password'
        >
          <el-input
            v-model="addform.password"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop='email'
        >
          <el-input
            v-model="addform.email"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop='mobile'
        >
          <el-input
            v-model="addform.mobile"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="adddialogFormVisible= false">取 消</el-button>
        <el-button
          type="primary"
          @click="addUser('addform')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="editdialogFormVisible"
    >
      <el-form
        :model="editform"
        label-width="100px"
        :rules="rules"
        ref="editform"
      >
        <el-form-item
          label="用户名"
          prop='username'
        >
          <el-input
            v-model="editform.username"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop='email'
        >
          <el-input
            v-model="editform.email"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop='mobile'
        >
          <el-input
            v-model="editform.mobile"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editdialogFormVisible= false">取 消</el-button>
        <el-button
          type="primary"
          @click="editUser('editform')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <!-- 授权用户对话框 -->
    <el-dialog
      title="授权用户"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="grantform"
        label-width="100px"
        :rules="rules"
        ref="grantform"
      >
        <el-form-item
          label="用户名"
          prop='username'
        >
          <el-input
            v-model="grantform.username"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <template>
          <el-form-item label="角色">
            <el-select
              v-model="grantform.rid"
              placeholder="请选择"
              @change="getRid"
            >
              <el-option
                v-for="item in rolesList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </template>
  </el-form>
  <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible= false">取 消</el-button>
        <el-button
          type="primary"
          @click="grantUser"
        >确 定</el-button>
      </div>
  </el-dialog>
  </div>
</template>
<script>
// import { GetUserList, addUser, editUser, deleteUser, grantList, userList, changeUserList} from '@/api'
import {GetUserList, addUser, editUser, deleteUser, grantList, userList, changeUserList} from '@/api'
// , userList, changeUserList

export default {
  data () {
    return {
      options: [],
      dialogFormVisible: false,
      // 设置隐藏
      editdialogFormVisible: false,
      adddialogFormVisible: false,
      // 绑定新增的数据
      addform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑用户对象
      editform: {
        username: '',
        id: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur,change'
          }
        ],
        mobile: [{ required: true, message: '电话不能为空' }]
      },
      // 授权角色对象
      grantform: {
        username: '',
        id: '',
        rid: ''
      },
      total: 0,
      //   当前页码
      pagenum: 1,
      //   每页显示的记录数
      pagesize: 10,
      //   用户搜索关键字
      serachkey: '',
      userState: '',
      userList: [],
      // 角色数据
      rolesList: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 分配角色
    grantUser () {
      if (this.grantform.rid) {
        userList(this.grantform).then(res => {
          if (res.meta.status === 200) {
            this.$message.success('授权成功')
            this.dialogFormVisible = false
            this.init()
          }
        })
      }
    },
    showNam (row) {
      this.dialogFormVisible = true
      this.grantform.id = row.id
      this.grantform.username = row.username
      this.grantform.rid = row.role_name
      // 获取角色数据加载
      grantList().then(res => {
        if (res.meta.status === 200) {
          this.rolesList = res.data
        }
      })
    },
    getRid () {

    },
    // 实现用户修改
    changeUserState (row) {
      changeUserList(row.id, row.mg_state)
        .then(res => {
          if (res.meta.status === 200) {
            this.$message.success('用户状态修改成功')
          }
        })
    },
    // 编辑
    // editUser (formname) {
    //   this.$refs[formname].validate(valid => {
    //     if (valid) {
    //       // 调用接口实现用户数据的编辑
    //       editUser(this.editform).then(res => {
    //         if (res.meta.status === 200) {
    //           this.$message.success('编辑成功')
    //           this.editdialogFormVisible = false
    //           // 实现数据的刷新
    //           this.init()
    //         }
    //       })
    //     } else {
    //       this.$message.error('用户数据输入不完整')
    //       return false
    //     }
    //   })
    // },
    editUser (formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          editUser(this.editform).then(res => {
            if (res.meta.status === 200) {
              this.$message.success('编辑成功')
              this.editdialogFormVisible = false
              this.init()
            }
          })
        } else {
          this.$message.error('用户数据有误')
          return false
        }
      })
    },
    // 添加功能
    addUser (formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          addUser(this.addform).then(result => {
            console.log(result)
            if (result.meta.status === 201) {
              this.adddialogFormVisible = false
              this.$refs[formname].resetFields()
              this.$message({
                type: 'success',
                message: result.meta.msg
              })
              this.init()
            } else {
              this.$message({
                type: 'error',
                message: result.meta.msg
              })
            }
          })
        } else {
          this.$message.error('用户数据输入不完整')
          return false
        }
      })
    },

    // 获取用户数据
    init () {
      GetUserList({
        query: this.serachkey,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(result => {
        if (result.meta.status === 200) {
          this.userList = result.data.users
          this.total = result.data.total
        }
      })
    },
    //   切换页中所显示的记录数量
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      console.log('切换每页')
      this.init()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      console.log('切换野马')
      this.pagenum = val
      this.init()
    },
    handleEdit (row) {
      console.log(row)
      this.editdialogFormVisible = true
      console.log(row)
      this.editform.id = row.id
      this.editform.username = row.username
      this.editform.email = row.email
      this.editform.mobile = row.mobile
    },
    handleDelete (id) {
      this.$confirm(`此操作将永久删除id为${id}的数据，是否继续`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 实现删除操作
          deleteUser(id).then(res => {
            console.log(res)
            if (res.meta.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.init()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
        })
    },
    searchkey () {},
    // 搜索功能
    searchUsers () {
      GetUserList({
        query: this.serachkey,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(result => {
        if (result.meta.status === 200) {
          this.userList = result.data.users
          this.total = result.data.total
        }
      })
    }
  }
}
</script>
<style></style>
