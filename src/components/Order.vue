<template>
  <div class="order-wrap">
    <h2 style="padding-left: 10px; text-align: left">当前订单</h2>
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
                <img :src=list.room class="image">
                <div class="label">
                  <div style="padding: 5px">
                    <el-link :underline="false" style="font-size: 16px">{{list.room.address}}（{{list.state}}）</el-link>
                    <time class="time">{{list.createdTime}}</time>
                  </div>
                  <div class="position">{{list.room.type}}&nbsp;{{list.room.rentType}}</div>
                  <div class="buttongroup">
                    <el-button class="button" type="primary" v-on:click="view(list.id)">查看</el-button>
                    <el-button class="button" type="warning" plain v-on:click="repair(list.id)">报修</el-button>
                    <el-button class="button" type="success" plain v-on:click="charge(list.id)">续租</el-button>
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
      id: 1,
      total: 0,
      count: 0,
      lists: [],
      orders: []
    }
  },
  mounted () {
    // get total here
    let data = {'username': getCookie('username')}
    this.$axios.post('/api/getOrderTotal', data).then((res) => {
      console.log(res)
      this.total = res.data
    })
    this.$axios.post('/api/getAllOrder', data).then((res) => {
      console.log(res)
      for (let i = 0; i < this.total; i++) {
        this.orders = res.data
      }
      console.log('order')
      console.log(this.orders)
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
          this.lists.push({
            'orderid': this.orders[this.count].object.id,
            'roomid': this.orders[this.count].object.room.roomId,
            'renttype': this.orders[this.count].type,
            'roomtype': this.orders[this.count].object.room.type
          })
          this.count++
        }
        this.loading = false
      }, 2000)
      console.log('list')
      console.log(this.lists)
    },
    view (id) {
      alert('Clicked \'view\' on room id ' + id)
    },
    repair (id) {
      alert('Clicked \'repair\' on room id ' + id)
    },
    charge (id) {
      alert('Clicked \'charge\' on room id ' + id)
    }
  }
}
</script>
