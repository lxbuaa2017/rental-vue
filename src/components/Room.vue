<template>
  <div class="demo-image__preview">
    <el-row style="width: 100%;height: 170px">
      <el-col style="width:33%;margin-left:0">
        <el-image
          style="margin-left:0;width: 120px; height: 120px"
          :src="url"
          :preview-src-list="url">
        </el-image>
      </el-col>
      <el-col style="width:33%;vertical-align: center">
        {{address}}
      </el-col>
      <el-col style="width:33%;vertical-align: center">
        短租{{sr_price}}元/天
        <br>
        长租{{lr_price}}元/月
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: `Room`,
  props: ['room'],
  data () {
    return {
      url: this.room.imageUrls[0],
      address: this.room.address,
      sr_price: this.room.priceForDay,
      lr_price: this.room.priceForMonth
    }
  }
}
</script>

<style scoped>

</style>
