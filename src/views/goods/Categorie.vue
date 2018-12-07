<template>
  <div class="categories">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 15px;margin-bottom: 15px;">
      <el-button
        type="success"
        plain
        @click='showadddialog'
      >添加分类</el-button>
    </div>
    <!-- 表单数据 -->
    <tree-grid
      :treeStructure="true"
      :columns="columns"
      :data-source="dataSource"
      @deleteCate="deleteCategory"
      @editCate="editCategory"
    >
    </tree-grid>
 <!-- <el-table-column label="操作" v-if="controls" width="160">
      <template slot-scope="scope">
        <el-button plain title='修改商品分类'  type="primary" size="small" @click="getCateInfoById(scope.row)" icon="el-icon-edit"></el-button>
        <el-button plain title='删除商品分类'  type="danger" size="small" @click="deleteCategory(scope.row)" icon="el-icon-delete"></el-button>
      </template>
    </el-table-column> -->
     <el-dialog title="添加商品分类" :visible.sync="adddialogFormVisible">
  <el-form :model="addform" label-width="80px">
    <el-form-item label="分类名称">
      <el-input v-model="addform.cat_name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="父级名称">
     <el-cascader
     :clearable='true'
    expand-trigger="hover"
    :options="catelist"
     v-model="selectedOptions"
        @change="handleChange">
  </el-cascader>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="adddialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCateSubmit">确 定</el-button>
  </div>
</el-dialog>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import TreeGrid from '@/components/TreeGrid/treeGrid.vue'
import {getCategories} from '@/api'
export default {
  // 引入自定义组件。因为当前文件已经是一个组件，所以通过components属性来引入自定义组件
  components: {
    TreeGrid: TreeGrid
  },
  data () {
    return {
      selectedOptions: [],
      catelist: [],
      adddialogFormVisible: false,
      total: 0,
      //   当前页码
      pagenum: 1,
      //   每页显示的记录数
      pagesize: 10,
      dataSource: [],
      addform: {
        cat_pid: '',
        cat_name: '',
        cat_level: ''
      },
      cascaderProps: {
        label: 'cat_name',
        children: 'children',
        value: 'cat_id'
      },
      //   这里面存储着我们当前所选择的父级分类数据(id)
      columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: ''
      }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: ''
      }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: ''
      }]
    }
  },
  mounted () {
    this.init()
  },

  methods: {
    init () {
      getCategories({type: 3, pagenum: this.pagenum, pagesize: this.pagesize}).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.dataSource = res.data.result
          this.total = res.data.total
          console.log(this.dataSource)
        }
      })
    },
    showadddialog () {
      this.adddialogFormVisible = true
      getCategories({type: 2})
        .then(res => {
          if (res.meta.status === 200) {
            this.catelist = res.data
          }
        })
    },
    addCateSubmit () {
      if (this.selectedOptions.length === 0) {
        this.addform.cat_level = 0
        this.addform.cat_pid = 0
      } else if (this.selectedOptions.length === 1) {
        this.addform.cat_level = 1
        this.addform.cat_pid = this.selectedOptions[0]
      } else if (this.selectedOptions.length === 2) {
        this.addform.cat_level = 2
        this.addform.cat_pid = this.selectedOptions[1]
      }
    },
    //   当级联菜单选项发生改变的时候触发
    // 在这里可以获取当前所选择的分类的id,这个id就是添加分类时所需要的父级id
    handleChange (value) {
      this.addform.cat_pid = value
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.init()
    },
    // 监听页码值 改变的事件
    handleCurrentChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagenum = val
      this.init()
    },
    deleteCategory (val) {
      console.log('delete:' + val)
    },
    editCategory (val) {
      console.log('edit:' + val)
    }
  }
}
</script>
<style>
</style>
