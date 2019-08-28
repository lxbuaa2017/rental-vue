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
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" v-on:click="showOrder">当前订单</el-menu-item>
            <el-menu-item index="2-2" v-on:click="showOrderHistory">历史订单</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>维修工单</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" v-on:click="showTicket">待处理工单</el-menu-item>
            <el-menu-item index="3-2" v-on:click="showTicketHistory">历史记录</el-menu-item>
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
    showTicket () {
      this.$router.push('/ticket')
    },
    showTicketHistory () {
      this.$router.push('/tickethistory')
    }
  }
}
</script>
