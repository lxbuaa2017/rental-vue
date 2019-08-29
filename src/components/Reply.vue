<template>
  <div class="order-wrap">
    <h2 style="padding-left: 10px; text-align: left">已回复投诉</h2>
    <div class="infinite-list-wrapper" style="overflow:auto">
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        style="list-style-type: none;padding-inline-start: 0px">
        <li v-for="(complain) in complains" v-bind:key="complain.id">
          <div class="orderComplain">
            <el-row>
              <el-card :body-style="{ padding: '50px' }" shadow="hover">
                <div class="label">
                  <div style="padding: 5px">
                    <el-row :gutter="12">
                      <el-col :span="8">
                        <time class="time">{{complain.createdTime}}</time>
                      </el-col>
                      <el-col :span="8">
                        <el-card shadow="always">
                          给您的答复：{{reply}}
                        </el-card>
                      </el-col>
                      <el-col :span="8">
                        <el-row>
                          <el-col>
                            <div>{{complain.message}}</div>
                          </el-col >
                          <el-col>
                            <el-image
                              style="width: 100px; height: 100px;text-align: right"
                              :src="urls[0]"
                              :preview-src-list="srcList">
                            </el-image>
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
export default {
  name: 'Reply',
  data () {
    return {
      reply: '您好！已经解决了！',
      urls: [
        'http://icon.nipic.com/BannerPic/20160426/photo/20160426160807.jpg',
        'http://icon.nipic.com/BannerPic/20160426/photo/20160426160826.jpg'
      ],
      complains: [
        {
          'id': 1,
          'message': '这不好那不好',
          'createdTime': '2019-8-29',
          'TenantUsername': '某某'

        },
        {
          'id': 2,
          'message': '这不好那不好',
          'createdTime': '2019-8-29',
          'TenantUsername': '某某'

        },
        {
          'id': 3,
          'message': '这不好那不好',
          'createdTime': '2019-8-29',
          'TenantUsername': '某某'

        },
        {
          'id': 4,
          'message': '这不好那不好',
          'createdTime': '2019-8-29',
          'TenantUsername': '某某'

        },
        {
          'id': 5,
          'message': '这不好那不好',
          'createdTime': '2019-8-29',
          'TenantUsername': '某某'

        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
