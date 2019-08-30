<template>
  <div class="order-wrap">
    <h2 style="padding-left: 10px; text-align: left">订单管理</h2>
    <div class="infinite-list-wrapper" style="overflow:auto">
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        style="list-style-type: none;padding-inline-start: 0px">
        <li v-for="(list) in lists" v-bind:key="list.id">
          <div class="orderShow">
            <el-row>
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <img :src=list.image class="image">
                <div class="label">
                  <div style="padding: 5px">
                    <el-link :underline="false" style="font-size: 16px" :href=list.detailpage target="_blank">{{list.address}}（{{list.status}}）</el-link>
                    <time class="time">{{list.createdtime}}</time>
                  </div>
                  <div class="position">{{list.roomtype}}&nbsp;&nbsp;{{list.renttype}}</div>
                  <div class="buttongroup">
                    <el-button class="button" type="primary" @click="view(list.orderid)">查看</el-button>
                    <el-button class="button" type="success" plain @click="charge(list.orderid)" :disabled=list.chargebuttondisabled>{{list.chargebutton}}</el-button>
                  </div>
                </div>
              </el-card>
            </el-row>
          </div>
        </li>
      </ul>
      <p v-if="loading" style="color: #2c3e50">加载中...</p>
      <p v-if="noMore" style="color: #2c3e50">没有更多了</p>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="viewDialogVisible"
      width="30%">
      <span>test</span>
    </el-dialog>
  </div>
</template>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
    text-align: right;
    float: right;
  }

  .position {
    padding: 5px;
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .buttongroup {
    margin-top: 15px;
  }

  .el-button {
    float: right;
    margin: 10px;
    width: auto;
  }

  .image {
    height: 120px;
    display: inline-block;
    float: left;
    width: 120px;
    padding: 15px;
  }

  .label {
    padding: 14px;
    text-align: left;
    margin-left: 150px;
  }

  .el-card {
    height: 150px;
    margin: 5px;
  }

</style>

<script>
import {getCookie} from '../assets/js/cookie.js'
export default {
  data () {
    return {
      name: 'OrderView',
      loading: false,
      id: 1,
      total: 0,
      count: 0,
      lists: [],
      orders: [],
      viewDialogVisible: false
    }
  },
  mounted () {
    // get total here
    let data = {'username': getCookie('username')}
    let self = this
    this.$axios.post('/api/getOrderTotal', data).then((res) => {
      console.log(res)
      self.total = res.data
    })
    this.$axios.post('/api/getAllOrder', data).then((res) => {
      console.log(res)
      self.orders = res.data
    })
  },
  computed: {
    noMore () {
      return this.count >= this.total
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    load () {
      this.loading = true
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          if (this.count >= this.total) {
            break
          }
          // get order information here
          let status = ''
          let chargebutton = ''
          let chargebuttondisabled = true
          switch (this.orders[this.count].object.state) {
            case 1823:
              status = '待审核'
              chargebutton = '付款'
              chargebuttondisabled = true
              break
            case 1824:
              status = '待支付'
              chargebutton = '付款'
              chargebuttondisabled = true
              break
            case 1825:
              status = '款项待确认'
              chargebutton = '续租'
              chargebuttondisabled = true
              break
            case 1826:
              status = '在住'
              chargebutton = '续租'
              chargebuttondisabled = false
              break
            case 1827:
              status = '续租待确认'
              chargebutton = '续租'
              chargebuttondisabled = true
              break
          }
          let detailpage = '/detail/' + this.orders[this.count].object.room.roomId
          this.lists.push({
            'orderid': this.orders[this.count].object.id,
            'roomid': this.orders[this.count].object.room.roomId,
            'image': this.orders[this.count].object.room.imageUrls[0],
            'address': this.orders[this.count].object.room.address,
            'status': status,
            'renttype': this.orders[this.count].type,
            'roomtype': this.orders[this.count].object.room.type,
            'createdtime': this.orders[this.count].object.createdTime,
            'checkinday': this.orders[this.count].object.checkInDay,
            'leaveday': this.orders[this.count].object.leaveDay,
            'detailpage': detailpage,
            'chargebutton': chargebutton,
            'chargebuttondisabled': chargebuttondisabled
          })
          this.count++
        }
        this.loading = false
      }, 500)
      console.log('list')
      console.log(this.lists)
    },
    view (id) {
      this.viewDialogVisible = true
    },
    charge (id) {
      alert('Clicked \'charge\' on room id ' + id)
    }
  }
}
</script>
