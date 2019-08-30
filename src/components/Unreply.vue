<template>
<div>
  <el-button type="info" @click="SdialogFormVisible=true">创建投诉</el-button>
  <el-dialog  title="发起新投诉" :visible.sync="SdialogFormVisible">
    <el-form :model="form">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="username" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="投诉内容" :label-width="formLabelWidth">
        <el-input v-model="newComplain.message" autocomplete="off"></el-input>
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
      <el-button type="primary" @click="commitComplain()">确 定</el-button>
    </div>
  </el-dialog>
  <div class="order-wrap">
    <h2 style="padding-left: 10px; text-align: left">未回复投诉</h2>
    <div class="infinite-list-wrapper" style="overflow:auto">
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        style="list-style-type: none;padding-inline-start: 0px">
        <li v-for="complain in complains" v-bind:key="complain.id">
          <div class="orderComplain">
            <el-row>
              <el-card :body-style="{ padding: '50px' }" shadow="hover">
                <div class="label">
                  <div style="padding: 5px">
                    <el-row>
                      <el-col :span="6">
                        <time class="time">{{complain.createdTime}}</time>
                      </el-col>
                      <el-col :span="18">
                        <el-row>
                          <el-col>
                            <div>{{complain.message}}</div>
                          </el-col >
                          <el-col v-if="complain.urls!=null&&complain.urls.length>0">
                            <el-row :gutter="10" style="text-align: right;float:right" v-for="url in complain.urls" v-bind:key="url">
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
</div>
</template>

<script>
import {getCookie} from '../assets/js/cookie.js'
export default {
  name: 'Unreply',
  data () {
    return {
      fileList: [],
      text: '',
      username: '',
      urls: [
        'http://icon.nipic.com/BannerPic/20160426/photo/20160426160807.jpg',
        'http://icon.nipic.com/BannerPic/20160426/photo/20160426160826.jpg'
      ],
      dialogImageUrl: '',
      dialogVisible: false,
      SdialogFormVisible: false,
      complains: [],
      newComplain: {
        'message': '',
        'tenantUsername': '',
        'urls': []
      }
    }
  },
  mounted () {
    this.username = getCookie('username')
    var self = this
    this.$axios.post('/api/complaints/getTenantComplaints', this.qs.stringify({
      'username': this.username
    })).then((res) => {
      self.complains = res.data
      self.urls = self.complains.urls
    })
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
    commitComplain () {
      this.newComplain.tenantUsername = this.username
      this.$axios.post('/api/complaints/add', this.newComplain)
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

<style scoped>

</style>
