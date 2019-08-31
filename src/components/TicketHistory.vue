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
          <div class="orderWorkorder">
            <el-row>
              <el-card :body-style="{ padding: '50px' }" shadow="hover">
                <div class="label">
                  <div style="padding: 5px">
                    <el-row>
                      <el-col :span="6">
                        <time class="time">{{workorder.createdTime}}<br>{{workorder.address}}</time>
                      </el-col>
                      <el-col :span="18">
                        <el-row>
                          <el-col>
                            <div>{{workorder.message}}</div>
                          </el-col >
                          <el-col>
                            <el-rate v-model="value" @change="evaluate"></el-rate>
                          </el-col>
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
    </div>
  </div>
</template>

<script>
import {getCookie} from '../assets/js/cookie.js'
export default {
  name: 'Reply',
  data () {
    return {
      fileList: [],
      text: '',
      username: '',
      urls: [],
      workorders: [],
      newWorkorder: {
        'message': '',
        'address': '',
        'tenantUsername': '',
        'urls': []
      },
      value: null
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
    evaluate () {
      console.log(this.value)
      this.$axios.post('/api/workorder/evaluate?username=' + this.username + '&score=' + this.value)
    }
  }
}
</script>

<style scoped>

</style>
