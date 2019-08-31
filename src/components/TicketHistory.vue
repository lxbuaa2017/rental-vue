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
                      <div id="starBg" class="star_bg">
                        <input type="radio" id="starScore1" class="score score_1" value="1" name="score">
                        <a href="#starScore1" class="star star_1" title="差"><label for="starScore1">差</label></a>
                        <input type="radio" id="starScore2" class="score score_2" value="2" name="score">
                        <a href="#starScore2" class="star star_2" title="较差"><label for="starScore2">较差</label></a>
                        <input type="radio" id="starScore3" class="score score_3" value="3" name="score">
                        <a href="#starScore3" class="star star_3" title="普通"><label for="starScore3">普通</label></a>
                        <input type="radio" id="starScore4" class="score score_4" value="4" name="score">
                        <a href="#starScore4" class="star star_4" title="较好"><label for="starScore4">较好</label></a>
                        <input type="radio" id="starScore5" class="score score_5" value="5" name="score">
                        <a href="#5" class="star star_5" title="好"><label for="starScore5">好</label></a>
                      </div>
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
                                  :src="url">
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
  /* 星星点灯照亮我的家门 */
  .star_bg {
    width: 120px; height: 20px;
    background: url(../assets/img/star.png) repeat-x;
    position: relative;
    overflow: hidden;
  }
  .star {
    height: 100%; width: 24px;
    line-height: 6em;
    position: absolute;
    z-index: 3;
  }
  .star:hover {
    background: url(../assets/img/star.png) repeat-x 0 -20px!important;
    left: 0; z-index: 2;
  }
  .star_1 { left: 0; }
  .star_2 { left: 24px; }
  .star_3 { left: 48px; }
  .star_4 { left: 72px; }
  .star_5 { left: 96px; }
  .star_1:hover { width: 24px; }
  .star_2:hover { width: 48px; }
  .star_3:hover { width: 72px; }
  .star_4:hover { width: 96px; }
  .star_5:hover { width: 120px; }

  label {
    display: block; _display:inline;
    height: 100%; width: 100%;
    cursor: pointer;
  }

  /* 幕后的英雄，单选按钮 */
  .score { position: absolute; clip: rect(0 0 0 0); }
  .score:checked + .star {
    background: url(../assets/img/star.png) repeat-x 0 -20px;
    left: 0; z-index: 1;
  }
  .score_1:checked ~ .star_1 { width: 24px; }
  .score_2:checked ~ .star_2 { width: 48px; }
  .score_3:checked ~ .star_3 { width: 72px; }
  .score_4:checked ~ .star_4 { width: 96px; }
  .score_5:checked ~ .star_5 { width: 120px; }

  .star_bg:hover .star {  background-image: none; }

  /* for IE6-IE8 JS 交互 */
  .star_checked {
    background: url(../assets/img/star.png) repeat-x 0 -20px;
    left: 0; z-index: 1;
  }
</style>
