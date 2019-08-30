<template>
  <div style="height: 100%">
    <el-container>
      <el-header style="padding: 0">
        <nav-bar/>
      </el-header>
      <el-container style="padding-top: 3px">
        <el-aside width="200px">
          <nav-menu/>
        </el-aside>
        <el-main style="height: inherit;padding: 5px" id="main">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

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
