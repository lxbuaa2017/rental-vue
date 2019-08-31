<template>
  <div>
    <el-button type="info" @click="SdialogFormVisible=true">报修</el-button>
    <el-dialog  title="建立新工单" :visible.sync="SdialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="房间地址" :label-width="formLabelWidth">
          <el-input v-model="newWorkOrder.location" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="报修说明" :label-width="formLabelWidth">
          <el-input v-model="newWorkOrder.message" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" :label-width="formLabelWidth">
          <br>
          <!--        action="https://localhost:8081/file/uploadImages"-->
          <el-upload
            style="text-align: left"
            list-type="picture-card"
            :http-request="uploadImgs"
            action="/api/file/uploadImage"
            :file="file"
            :file-list="fileList"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="SdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitWorkOrder()">确 定</el-button>
      </div>
    </el-dialog>
  <div class="ticket-wrap">
    <h2 style="padding-left: 10px; text-align: left">待处理工单</h2>
    <div class="infinite-list-wrapper" style="overflow:auto">
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        style="list-style-type: none;padding-inline-start: 0px">
        <li v-for="(list) in lists" v-bind:key="list.id">
          <div class="ticketShow">
            <el-row>
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <img :src=list.image class="image">
                <div class="label">
                  <div style="padding: 5px">
                    <el-link :underline="false" style="font-size: 16px">{{list.title}}</el-link>
                    <time class="time">{{list.time}}</time>
                  </div>
                  <div class="position">{{list.address}}</div>
                  <div class="buttongroup">
                    <el-button class="button" type="primary" v-on:click="view(list.id)">查看</el-button>
                    <el-button class="button" type="success" plain v-on:click="append(list.id)">附加</el-button>
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
      count: 0,
      total: 0,
      loading: false,
      dialogVisible: false,
      SdialogFormVisible: false,
      currentDate: new Date(),
      lists: [],
      workOrder: [],
      newWorkOrder: {
        'message': '',
        'tenantUsername': '',
        'location': '',
        'urls': []
      }
    }
  },
  mounted () {
    // get total here
    this.total = 37
    this.username = getCookie('username')
    var self = this
    this.$axios.post('/api/workorder/getbyTenant', this.qs.stringify({
      'username': this.username
    })).then((res) => {
      self.workOrder = res.data
      // self.urls = self.complains.urls
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
    uploadImgs (file) {
      let param = new FormData()
      param.append('file', file.file)
      this.$axios({
        method: 'post',
        url: '/api/file/uploadImage',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: param,
        withCredentials: true
      }).then(res => {
        this.newComplain.urls.push(res.data)
      })
    },
    load () {
      this.loading = true
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          if (this.count >= this.total) {
            break
          }
          // get order information here
          this.lists.push({
            id: this.id,
            image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            title: '测试数据' + this.id++,
            time: '2019年8月25日 10:51',
            address: '北京市海淀区学院路37号'
          })
          this.count++
        }
        this.loading = false
      }, 2000)
    },
    view (id) {
      alert('Clicked \'view\' on room id ' + id)
    },
    append (id) {
      alert('Clicked \'append\' on room id ' + id)
    },
    commitWorkOrder () {
      this.newWorkOrder.tenantUsername = this.username
      this.$axios.post('/api/workorder/add', this.newWorkOrder)
      this.SdialogFormVisible = false
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>
