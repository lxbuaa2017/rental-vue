<template>
  <div class="rent-wrap">
    <div style="text-align: left">
      <el-radio-group v-model="typeRadio" border="true" size=50%>
        <el-radio-button label="短租"></el-radio-button>
        <el-radio-button label="长租"></el-radio-button>
      </el-radio-group>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="单人间">
<!--        <div v-for="room1 in rooms" :key="room1">-->
<!--          <Room :room="room1"></Room>-->
<!--        </div>-->
        <div class="infinite-list-wrapper" style="overflow:auto">
          <ul
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled"
            style="list-style: none"
          >
            <li v-for="room1 in rooms" :key="room1"
                style="list-style: none"
            >
              <Room :room="room1" @click.native="SdialogFormVisible = true,rent_room = room1"></Room>
              <el-dialog title="请填写申请信息" :visible.sync="SdialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="username" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证" :label-width="formLabelWidth">
                    <el-input v-model="shortRentOrder.tenantId" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="房源" :label-width="formLabelWidth">
                    <el-input
                      placeholder="房源地址"
                      v-model="rent_room.address"
                      :disabled="true">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="租住时间" :label-width="formLabelWidth">
                    <el-date-picker
                      v-model="dates"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="下午入住"
                      end-placeholder="上午离开"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="SdialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="commitShortRent()">确 定</el-button>
                </div>
              </el-dialog>
            </li>
          </ul>
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="双人间"><Room></Room></el-tab-pane>
      <el-tab-pane label="四人间"><Room></Room></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Room from './Room'
import {getCookie} from '../assets/js/cookie'
export default {
  name: 'Rent',
  components: {Room},
  data () {
    return {
      rent_room: {},
      shortRentOrder: {
        'checkInDay': '',
        'leaveDay': '',
        'tenantName': '',
        'tenantId': '',
        'state': 1823,
        'room': ''
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      username: '',
      // dialogRoomAddress: '',
      dates: [],
      input: '花园路77号',
      typeRadio: '短租',
      rooms: null,
      loading: false,
      count: 0,
      SdialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    noMore () {
      return this.count > this.rooms.length + 4
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  mounted () {
    this.username = getCookie('username')
    var self = this
    this.$axios.get('http://localhost:8081/room/findAll', {withCredentials: true}).then(function (res) {
      console.log(res.data)
      self.rooms = res.data
      self.count = res.data.length
    })
  },
  methods: {
    commitShortRent () {
      this.SdialogFormVisible = false
      // eslint-disable-next-line no-unused-vars
      var order = this.shortRentOrder
      order.tenantName = this.username
      // eslint-disable-next-line no-undef
      order.checkInDay = this.dates[0]
      // eslint-disable-next-line no-undef
      order.leaveDay = this.dates[1]
      order.room = this.rent_room
      console.log(order)
      this.$axios.post('http://localhost:8081/shortRentEnroll', order)
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    }
  }
}
</script>

<style>
</style>
