<template>
  <div>
    <h3>欢迎 {{name}}</h3>
    <a href="javascript:void(0);" @click="quit">注销登录</a>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {getCookie, delCookie} from '../../assets/js/cookie.js'

export default {
  data () {
    return {
      name: ''
    }
  },
  mounted () {
    let uname = getCookie('username')
    uname = 'test'
    this.name = uname
    if (uname === '') {
      this.$router.push('/')
    }
  },
  methods: {
    quit () {
      delCookie('username')
      this.$router.push('/')
    }
  }
}
</script>
