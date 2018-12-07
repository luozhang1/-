<template>
  <div class="add">
    <el-steps
      :active="active - 0"
      finish-status="success"
    >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <!-- <el-step title="完成"></el-step> -->
    </el-steps>
    <template>
      <el-form
        :model="addForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
        <el-tabs
          v-model="active"
          tab-position='left'
          style='margin-top:30px'
        >
          <el-tab-pane
            label="基本信息"
            name="0"
          >
            <!-- 表单信息 -->
            <el-form-item
              label="商品名称"
              prop="goods_name"
            >
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item
              label="商品价格"
              prop="goods_price"
            >
              <el-input
                type='number'
                v-model="addForm.goods_price"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="商品重量"
              prop="goods_weight"
            >
              <el-input
                type='number'
                v-model="addForm.goods_weight"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="商品数量"
              prop="goods_number"
            >
              <el-input
                type='number'
                v-model="addForm.goods_number"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <!-- :props:用来配置级联选择器的显示属性和value属性 -->
              <el-cascader
                :options="cateList"
                v-model="selectedOptions"
                @change="handleChange"
                :props='goodprops'
                :clearable='true'
              >
              </el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane
            label="商品参数"
            name="1"
          >商品参数</el-tab-pane>
          <el-tab-pane
            label="商品属性"
            name="2"
          >
            <!-- 添加地图 -->
            <!-- <h3 class="title">vue-amap向你问好！</h3>
            <div class="amap-wrapper">
              <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
            </div> -->
          </el-tab-pane>
          <el-tab-pane
            label="商品图片"
            name="3"
          >
            <!-- 商品图片 -->
            <el-upload
              class="upload-demo"
              action="http://localhost:8888/api/private/v1/upload"
              :headers="getToken()"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :before-upload='uploadBeforeValid'
              :file-list="fileList"
              :on-success='uploadDone'
            >
              <el-button
                size="small"
                type="primary"
              >点击上传</el-button>
              <div
                slot="tip"
                class="el-upload__tip"
              >只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane
            label="商品内容"
            name="4"
          >
            <quill-editor
              v-model="addForm.goods_introduce"
              class="goodsEditor"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
            >
            </quill-editor>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <el-button
        type="success"
        class="btn"
        @click="getAdd"
      >确认添加</el-button>
    </template>
    <el-dialog
      title="图片查看"
      :visible.sync="picdialogTableVisible"
    >
      <img
        :src="userpic"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
import { getcategories, addgoods } from '@/api'
export default {
  data () {
    return {
      editorOption: {},
      active: '0',
      picdialogTableVisible: false,
      userpic: '',
      goodprops: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      selectedOptions: [],
      cateList: [],
      addForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: '0',
        goods_number: '1',
        goods_weight: '0',
        goods_introduce: '',
        pics: [],
        attrs: ''
      },
      fileList: []
    }
  },
  mounted () {
    getcategories(3).then(res => {
      this.cateList = res.data
    })
  },
  methods: {
    getAdd () {
      addgoods(this.addForm)
        .then(res => {
          if (res.meta.status === 201) {
            this.$message.success('添加成功')
            this.$router.push({ name: 'List' })
          }
        })
    },
    // 文件
    onEditorBlur (ev) {
      console.log(this.addForm)
    },
    getToken () {
      var token = localStorage.getItem('itcast_token')
      return { Authorization: token }
    },
    // 实现文件的删除
    handleRemove (file, fileList) {
      // 如果上传失败会自动的触发handleRemove
      console.log(file)
      if (!file.response) {
        return
      }
      // 删除图片。不仅仅要删除界面中的显示，而且还要删除pics中的数据
      var deletePic = file.response.data.tmp_path
      var index = this.addForm.pics.findIndex(value => {
        return value.pic.indexOf(deletePic) !== -1
      })
      this.addForm.pics.splice(index, 1)
    },
    handlePreview (file) {
      this.picdialogTableVisible = true
      this.userpic = 'http://localhost:8888/' + file.response.data.tmp_path
      console.log(file)
    },

    // 实现文件上传之前的验证
    uploadBeforeValid (file) {
      if (file.size > 500 * 1024) {
        this.$message.warning('图片大小超出指定大小')
        return false
      }
      console.log(file)
    },
    // 文件上传成功
    uploadDone (response, file, fileList) {
      console.log(response)
      console.log(file)
      console.log(fileList)
      this.addForm.pics.push({ pic: '/' + response.data.tmp_path })
      console.log(this.addForm.pics)
    },
    handleChange (value) {
      this.addForm.goods_cat = value.join(',')
    }
  }
}

</script>
<style lang="scss" scoped>
.btn {
  margin-top: 20px;
  float: right;
}
.goodsEditor{
   width: 100%;
  height: 300px;
  border-bottom: 1px solid #ccc;
}
</style>
