<template>
    <div class="goods">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <router-view>
            </router-view>
        </el-card>
    </div>
</template>
<script>

export default {

}
</script>
<style lang="scss" scoped>

</style>
