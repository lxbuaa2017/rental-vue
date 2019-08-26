<template>
  <el-container>
    <el-header style="padding: 0px">
      <p
        style="margin: 0px; padding-top: 18px;padding-left: 20px;padding-right: 20px;text-align: left;font-size: 21px;font-weight: 700">
        房屋详情</p>
    </el-header>
    <el-main>
      <div style="margin: 20px;height: inherit">
        <div style="display: inline">
          <el-carousel trigger="click" height="360px" indicator-position="none" :autoplay="false" :loop="false"
                       style="padding: 20px;width: 480px">
            <el-carousel-item v-for="item in 10" :key="item">
              <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div style="display: inline;width: auto">
          <h1>房子名</h1>
          <p>位置</p>
          <p>几人间</p>
          <p>长租短租，还有价钱</p>
          <p>该联系谁去看房子</p>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      data: []
    }
  },
  mounted () {
    // get detail here
  }
}
</script>

<style>
  body {
    margin: 0;
  }
</style>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
