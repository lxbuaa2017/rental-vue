<template>
  <div style="height: 100%">
    <el-container>
      <el-header>
        <nav-bar/>
      </el-header>
      <el-container style="padding-top: 3px">
        <el-aside width="200px">
          <nav-menu/>
        </el-aside>
        <el-main style="height: inherit" id="main">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
    <el-row><span>Copyright © 2019.All rights reserved.</span></el-row>
  </div>
</template>

<style scoped>
  .el-main {
    padding: 5px;
  }

</style>

<style>
  body {
    margin: 0;
  }
</style>

<script>
import NavBar from '../../components/NavBar'
import NavMenu from '../../components/NavMenu'
import Rent from '../../components/Rent'

export default {
  components: {Rent, NavBar, NavMenu},
  data () {
    return {
      name: '',
      showRent: 'true'
    }
  },
  mounted () {
    this.$router.push('/rent')
  },
  methods: {}
}
</script>
