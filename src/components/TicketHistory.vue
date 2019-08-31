<template>
  <div class="order-wrap">
    <h2 style="padding-left: 10px; text-align: left">工单历史记录</h2>
    <div class="infinite-list-wrapper" style="overflow:auto">
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        style="list-style-type: none;padding-inline-start: 0px">
        <li v-for="workOrder in workOrders" v-bind:key="workOrder.id">
          <div class="orderComplain">
            <el-row>
              <el-card :body-style="{ padding: '50px' }" shadow="hover">
                <div class="label">
                  <div style="padding: 5px">
                    <el-row :gutter="12">
                      <el-col :span="8">
                        <time class="time">{{workOrder.createdTime}}</time>
                      </el-col>
                      <el-col :span="8">
                        <el-card shadow="always">
                          评分：{{workOrder.score}}
                        </el-card>
                      </el-col>
                      <el-col :span="8">
                        <el-row>
                          <el-col>
                            <div>{{workOrder.message}}</div>
                          </el-col >
                          <el-col v-if="workOrder.urls!=null&&workOrder.urls.length>0">
                            <el-row :gutter="10" style="text-align: right;float:right" v-for="url in workOrder.urls" v-bind:key="url">
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
  name: 'Score',
  data () {
    return {
      username: '',
      workOrders: [],
      score: '5',
      urls: []
    }
  },
  mounted () {
    this.username = getCookie('username')
    var self = this
    this.$axios.post('/api/workorder/getfinish', this.qs.stringify({
      'username': this.username
    })).then((res) => {
      self.workOrders = res.data
    })
  }
}
</script>

<style scoped>

</style>
