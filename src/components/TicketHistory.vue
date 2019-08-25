<template>
  <div class="tickethistory-wrap">
    <h2 style="padding-left: 10px; text-align: left">历史记录</h2>
    <div class="infinite-list-wrapper" style="overflow:auto">
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        style="padding-inline-start: 0px">
        <div class="ticketShow">
          <el-row>
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                   class="image">
              <div class="label">
                <div style="padding: 5px">
                  <el-link :underline="false" style="font-size: 16px">好吃的汉堡</el-link>
                  <time class="time">2019年8月24日 17:15:00</time>
                </div>
                <div class="position">北京市海淀区学院路37号</div>
                <div class="buttongroup">
                  <el-button class="button">查看</el-button>
                </div>
              </div>
            </el-card>
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                   class="image">
              <div class="label">
                <div style="padding: 5px">
                  <el-link :underline="false" style="font-size: 16px">好吃的汉堡</el-link>
                  <time class="time">2019年8月24日 17:15:00</time>
                </div>
                <div class="position">北京市海淀区学院路37号</div>
                <div class="buttongroup">
                  <el-button class="button">查看</el-button>
                </div>
              </div>
            </el-card>
          </el-row>
        </div>
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
export default {
  data () {
    return {
      name: 'TicketHistoryView',
      count: 10,
      loading: false,
      currentDate: new Date()
    }
  },
  computed: {
    noMore () {
      return this.count >= 20
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
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
