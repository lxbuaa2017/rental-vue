<template>
  <el-row class="tac" style="height: 100%">
    <el-col :span="12" style="width: 100%;height: 100%;text-align: left">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        unique-opened=true
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="1" v-on:click="showRent">
          <i class="el-icon-location"></i>
          <span slot="title">租房</span>
        </el-menu-item>
        <el-menu-item index="2" v-on:click="showOrder">
          <i class="el-icon-document"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>维修工单</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" >待处理工单</el-menu-item>
            <el-menu-item index="3-2" >历史记录</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>投诉</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1" v-on:click="showUnreply">未回复</el-menu-item>
            <el-menu-item index="4-2" v-on:click="showReply">已回复</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style>

  html, body, .el-container, .el-menu-vertical-demo {
    height: 100%;
  }

</style>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    showRent () {
      this.$router.push('/rent')
    },
    showOrder () {
      this.$router.push('/order')
    },
    showOrderHistory () {
      this.$router.push('/orderhistory')
    },
    showUnreply () {
      this.$router.push('/unreply')
    },
    showReply () {
      this.$router.push('/reply')
    }
  }
}
</script>
