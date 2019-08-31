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
                    <el-button class="button" type="primary" @click="view(list)">查看</el-button>
                    <el-button class="button" type="success" plain @click="charge(list)" :disabled=list.chargebuttondisabled>{{list.chargebutton}}</el-button>
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
    <el-dialog title="订单详细信息" :visible.sync="viewDialogVisible" width="40%" style="text-align: left">
      <p>房源：{{this.viewAddress}}</p>
      <p>状态：{{this.viewStatus}}</p>
      <p>类型：{{this.viewType}}</p>
      <p>入住时间：{{this.viewCheckInTime}}</p>
      <p>到期时间：{{this.viewDueTime}}</p>
      <p>下单时间：{{this.viewCreatedTime}}</p>
      <p>订单号：{{this.viewOrderId}}</p>
    </el-dialog>
    <el-dialog title="付款" :visible.sync="payDialogVisible" width="30%">
      <p>请扫二维码付款</p>
      <img style="width: 150px;height: 150px" src="../assets/img/qrcode.png">
      <div style="text-align: right;padding: 10px">
        <el-button @click="pay" type="primary">付款完成</el-button>
        <el-button @click="payDialogVisible = false">取消</el-button>
      </div>
      <div style="height: 30px"/>
    </el-dialog>
    <el-dialog title="续租" :visible.sync="shortExtDialogVisible" width="30%">
      <div>
        <p style="display: inline-block">请选择续租天数：</p>
        <el-input type="number" min="1" max="240" style="width: 40%;display: inline-block" v-model="shortExtDays"></el-input>
      </div>
      <p>请扫二维码付款</p>
      <img style="width: 150px;height: 150px" src="../assets/img/qrcode.png">
      <div style="text-align: right;padding: 10px">
        <el-button @click="extendShort" type="primary">付款完成</el-button>
        <el-button @click="shortExtDialogVisible = false">取消</el-button>
      </div>
      <div style="height: 30px"/>
    </el-dialog>
    <el-dialog title="续租" :visible.sync="longExtDialogVisible" width="30%">
      <div>
        <p style="display: inline-block">请选择续租月数：</p>
        <el-input type="number" min="1" max="240" style="width: 40%;display: inline-block" v-model="longExtMonths"></el-input>
      </div>
      <div style="text-align: right;padding: 10px">
        <el-button @click="extentLong" type="primary">确认续租</el-button>
        <el-button @click="longExtDialogVisible = false">取消</el-button>
      </div>
      <div style="height: 30px"/>
    </el-dialog>
  </div>
</template>

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
      viewDialogVisible: false,
      viewAddress: '',
      viewStatus: '',
      viewType: '',
      viewCheckInTime: '',
      viewDueTime: '',
      viewCreatedTime: '',
      viewOrderId: '',
      payDialogVisible: false,
      payOrder: '',
      shortExtDialogVisible: false,
      shortExtDays: 0,
      longExtDialogVisible: false,
      longExtMonths: 0
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
              chargebuttondisabled = false
              break
            case 1825:
              if (this.orders[this.count].type === '长租') {
                status = '待签合同'
                chargebutton = '查看合同'
                chargebuttondisabled = false
              } else {
                status = '款项待确认'
                chargebutton = '续租'
                chargebuttondisabled = true
              }
              break
            case 1826:
              status = '在住'
              chargebutton = '续租'
              chargebuttondisabled = false
              break
            case 1827:
              if (this.orders[this.count].type === '长租') {
                status = '续租合同待确认'
                chargebutton = '查看合同'
                chargebuttondisabled = false
              } else {
                status = '续租待确认'
                chargebutton = '续租'
                chargebuttondisabled = true
              }
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
            'chargebuttondisabled': chargebuttondisabled,
            'orderobject': this.orders[this.count].object
          })
          this.count++
        }
        this.loading = false
      }, 500)
      console.log('list')
      console.log(this.lists)
    },
    view (order) {
      this.viewAddress = order.address
      this.viewStatus = order.status
      this.viewType = order.roomtype + '  ' + order.renttype
      this.viewCheckInTime = order.checkinday
      this.viewDueTime = order.leaveday
      this.viewCreatedTime = order.createdtime
      this.viewOrderId = order.orderid
      this.viewDialogVisible = true
    },
    charge (order) {
      switch (order.orderobject.state) {
        case 1824:
          this.payOrder = order
          this.payDialogVisible = true
          break
        case 1825:
        case 1827:
          var newPage = window.open('about:blank')
          newPage.location.href = ('/api/file/pdfContract?orderid=' + order.orderobject.id)
          break
        case 1826:
          if (order.renttype === '长租') {
            this.payOrder = order
            this.longExtDialogVisible = true
          } else {
            this.payOrder = order
            this.shortExtDialogVisible = true
          }
          break
      }
    },
    pay () {
      this.$axios.post('/api/setShortRentState', {'shortRentOrder': this.payOrder.orderobject, 'state': 1825})
      alert('付款成功。')
      this.payDialogVisible = false
      window.location.reload()
    },
    extendShort () {
      this.payOrder.orderobject.days = this.shortExtDays
      this.$axios.post('/api/applyShortRentRelet', {'shortRentOrder': this.payOrder.orderobject})
      alert('续租成功。请等待审核。')
      this.shortExtDialogVisible = false
      window.location.reload()
    },
    extentLong () {
      this.payOrder.orderobject.months = this.longExtMonths
      this.$axios.post('/api/applyLongRentRelet', {'longRentOrder': this.payOrder.orderobject})
      alert('续租成功。请等待审核。')
      this.longExtDialogVisible = false
      window.location.reload()
    }
  }
}
</script>

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
