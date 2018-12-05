<template>
    <div class="lists">
    <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        class="search-input" v-model="keywords"
        style="width:300px"
      >
      </el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
      ></el-button>
          <el-button type="success" plain @click='$router.push({"path":"add"})'>添加商品</el-button>
    </div>
    <template>
  <el-table
    :data="goodsList"
    border
    stripe
    style="width: 100%">
    <el-table-column
    type='index'
      width="50">
    </el-table-column>
    <el-table-column
      prop="goods_name"
        label="商品名称"

      >
    </el-table-column>
    <el-table-column
        prop="goods_price"
        width="155"
        label="商品价格(元)">
    </el-table-column>
    <el-table-column
     width="155"
       prop="goods_weight"
        label="商品重量">
    </el-table-column>
    <el-table-column
      prop="add_time"
        width="180"
        label="创建时间">
        <template slot-scope="scope">
          {{scope.row.add_time}}
        </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="180">
     <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeGoods(scope)"></el-button>
        </template>
    </el-table-column>
  </el-table>
</template>
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
 <!-- 分页 -->
</template>
<script>
import {getGoodsList} from '@/api'
export default{
  data () {
    return {
      goodsList: [],
      total: 0,
      //   当前页码
      pagenum: 1,
      //   每页显示的记录数
      pagesize: 10,
      //   用户搜索关键字
      keywords: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      getGoodsList({
        query: this.keywords,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.goodsList = res.data.goods
          this.total = res.data.total
        }
      })
    },
    // 监听 pageSize 改变的事件
    handleSizeChange (newSize) {
      this.pagesize = newSize
      this.init()
    },
    // 监听页码值 改变的事件
    handleCurrentChange (newPage) {
      this.pagenum = newPage
      this.init()
    }
  }
}
</script>
<style>

</style>
