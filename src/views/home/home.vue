<template>
  <div style="height: 100%">
    <el-container>
      <el-header>
        <nav-bar/>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <nav-menu/>
        </el-aside>
        <el-main/>
      </el-container>
    </el-container>
  </div>
</template>

<style>
  .el-main {
    padding: 5px;
  }

  body {
    margin: 0;
  }
</style>

<script>
import NavBar from '../../components/NavBar'
import NavMenu from '../../components/NavMenu'

export default {
  components: {NavBar, NavMenu},
  data () {
    return {
      name: ''
    }
  },
  methods: {}
}
</script>
