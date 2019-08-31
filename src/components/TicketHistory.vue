<template>
  <div class="order-wrap">
    <h2 style="padding-left: 10px; text-align: left">已完成工单</h2>
    <div class="infinite-list-wrapper" style="overflow:auto">
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        style="list-style-type: none;padding-inline-start: 0px">
        <li v-for="workorder in workorders" v-bind:key="workorder.id">
          <div class="orderComplain">
            <el-row>
              <el-card :body-style="{ padding: '50px' }" shadow="hover">
                <div class="label">
                  <div style="padding: 5px">
                    <el-row :gutter="12">
                      <el-col :span="8">
                        <time class="time">{{workorder.maintenanceName}}</time>
                      </el-col>
                      <el-col :span="8">
                        <el-button type="info" @click="evaluate(workorder.id,1)"></el-button>
                        <el-button type="info" @click="evaluate(workorder.id,2)"></el-button>
                        <el-button type="info" @click="evaluate(workorder.id,3)"></el-button>
                        <el-button type="info" @click="evaluate(workorder.id,4)"></el-button>
                        <el-button type="info" @click="evaluate(workorder.id,5)"></el-button>
                      </el-col>
                      <el-col :span="8">
                        <el-row>
                          <el-col>
                            <div>{{workorder.message}}</div>
                          </el-col >
                          <el-col v-if="workorder.urls!=null&&workorder.urls.length>0">
                            <el-row :gutter="10" style="text-align: right;float:right" v-for="url in workorder.urls" v-bind:key="url">
                              <el-col style="text-align: right;display: inline-block" :span="6">
                                <el-image
                                  style="width: 100px; height: 100px;text-align: right"
                                  :src="url"
                                  :preview-src-list="srcList">
                                </el-image>
                              </el-col>
                            </el-row>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
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

<script>
import {getCookie} from '../assets/js/cookie.js'
export default {
  name: 'Reply',
  data () {
    return {
      username: '',
      workorders: [],
      urls: [
        'http://icon.nipic.com/BannerPic/20160426/photo/20160426160807.jpg',
        'http://icon.nipic.com/BannerPic/20160426/photo/20160426160826.jpg'
      ]
    }
  },
  mounted () {
    this.username = getCookie('username')
    var self = this
    this.$axios.post('/api/workorder/getfinish', this.qs.stringify({
      'username': this.username
    })).then((res) => {
      self.workorders = res.data
    })
  },
  methods: {
    evaluate (id, point) {
      this.$axios.post('/api/workorder/evaluate', this.qs.stringify({
        'username': id,
        'score': point
      }))
    }
  }
}
</script>

<style scoped>

</style>
