<template>
  <div class="demo-image__preview">
    <el-row style="width: 100%;height: 170px">
      <el-col style="width:33%;margin-left:0">
        <el-image
          style="margin-left:0;width: 120px; height: 120px"
          :src="url">
        </el-image>
      </el-col>
      <el-col style="width:33%;vertical-align: center">
        <el-link :underline="false" style="font-size: 16px" @click="detailShow">{{address}}</el-link>
      </el-col>
      <el-col style="width:33%;vertical-align: center">
        短租{{this.sr_price}}元/天
        <br>
        长租{{this.lr_price}}元/月
      </el-col>
    </el-row>
    <el-dialog title="查看详情" :visible.sync="detailDialogVisible" width="90%">
      <div style="margin: 20px;height: inherit">
        <div style="display: inline-block;width: fit-content">
          <el-carousel trigger="click" height="420px" indicator-position="none" :autoplay="false" :loop="false"
                       style="width: 560px;vertical-align: top">
            <el-carousel-item v-for="item in image" :key="item">
              <img :src=item style="width: 100%">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div
          style="display: inline-block;text-align: left;width: fit-content;max-width: 30%;padding-left: 50px;vertical-align: top">
          <h1>{{this.data.address}}</h1>
          <p>状态：{{this.data.state}}</p>
          <p>人数：{{this.data.type}}</p>
          <p>出租类型：{{this.data.renttype}}</p>
          <p>面积：{{this.data.area}} 平方米</p>
          <p>价格：{{this.data.price}}</p>
          <p>房主：{{this.data.landlord}}</p>
          <p>联系方式：{{this.data.phone}}</p>
        </div>
      </div>
    </el-dialog>
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
      lr_price: this.room.priceForMonth,
      detailDialogVisible: false,
      data: {},
      image: []
    }
  },
  methods: {
    detailShow () {
      console.log(this.room)
      let self = this
      this.$axios.get('/api/room/findById?id=' + this.room.roomId).then((res) => {
        console.log(res)
        let state = ''
        switch (res.data.state) {
          case 2001:
            state = '已租'
            break
          case 2002:
            state = '未租'
            break
        }
        let renttype = ''
        let price = ''
        switch (res.data.rentType) {
          case 2004:
            renttype = '长租'
            price = res.data.priceForMonth.toString() + '/月'
            break
          case 2005:
            renttype = '短租'
            price = res.data.priceForDay.toString() + '/天'
            break
          case 2006:
            renttype = '长租 / 短租'
            price = '长租 ' + res.data.priceForMonth.toString() + '/月，短租 ' + res.data.priceForDay.toString() + '/天'
            break
        }
        self.data = {
          'address': res.data.address,
          'state': state,
          'type': res.data.type,
          'renttype': renttype,
          'area': res.data.area,
          'price': price,
          'landlord': res.data.landLord.username,
          'phone': res.data.landLord.phone
        }
        self.image = res.data.imageUrls
      })
      this.detailDialogVisible = true
    }
  }
}
</script>

<style scoped>

</style>
