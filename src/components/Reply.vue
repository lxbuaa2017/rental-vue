<template>
  <div class="order-wrap">
    <h2 style="padding-left: 10px; text-align: left">已回复投诉</h2>
    <div class="infinite-list-wrapper" style="overflow:auto">
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        style="list-style-type: none;padding-inline-start: 0px">
        <li v-for="complaint in complaints" v-bind:key="complaint.id">
          <div class="orderComplain">
            <el-row>
              <el-card :body-style="{ padding: '50px' }" shadow="hover">
                <div class="label">
                  <div style="padding: 5px">
                    <el-row :gutter="12">
                      <el-col :span="8">
                        <time class="time">{{complaint.createdTime}}</time>
                      </el-col>
                      <el-col :span="8">
                        <el-card shadow="always">
                          给您的答复：{{complaint.reply}}
                        </el-card>
                      </el-col>
                      <el-col :span="8">
                        <el-row>
                          <el-col>
                            <div>{{complaint.message}}</div>
                          </el-col >
                          <el-col v-if="complaint.urls!=null&&complaint.urls.length>0">
                            <el-row :gutter="10" style="text-align: right;float:right" v-for="url in complaint.urls" v-bind:key="url">
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
      complaints: [],
      reply: '您好！已经解决了！',
      urls: [
        'http://icon.nipic.com/BannerPic/20160426/photo/20160426160807.jpg',
        'http://icon.nipic.com/BannerPic/20160426/photo/20160426160826.jpg'
      ]
    }
  },
  mounted () {
    this.username = getCookie('username')
    var self = this
    this.$axios.post('/api/complaints/getRepliedComplaints', this.qs.stringify({
      'username': this.username
    })).then((res) => {
      self.complaints = res.data
    })
  }
}
</script>

<style scoped>

</style>
