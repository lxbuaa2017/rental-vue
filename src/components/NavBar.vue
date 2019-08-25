<template>
    <el-menu class="el-menu-demo" mode="horizontal" :default-active="activeIndex" @select="handleSelect">
      <el-link :underline="false" id="header"><h1>青年租房</h1></el-link>
      <el-submenu index="1" id="name">
        <template slot="title">{{name}}</template>
        <el-menu-item index="2-1" v-on:click="showProfile">个人资料</el-menu-item>
        <el-menu-item index="2-2" v-on:click="quit">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
</template>

<style>
  #header {
    float: left;
    color: #3399ff;
    padding-left: 20px;
    padding-right: 20px;
  }

  #name {
    float: right;
    width: auto;
  }

  .el-header {
    padding: 0;
  }

</style>

<script>
import {getCookie, delCookie} from '../assets/js/cookie.js'

export default {
  data () {
    return {
      name: 'NavBar',
      activeIndex: '2-2'
    }
  },
  mounted () {
    this.name = getCookie('username')
    if (this.name === '') {
      this.$router.push('/')
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    quit () {
      delCookie('username')
      this.$router.push('/')
    },
    showProfile () {
      this.$router.push('/profile')
    }
  }
}
</script>
