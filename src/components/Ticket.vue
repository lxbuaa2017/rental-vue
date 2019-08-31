<template>
  <div>
    <el-dialog  title="创建新工单" :visible.sync="SdialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="报修内容" :label-width="formLabelWidth">
          <el-input v-model="newWorkorder.message" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="报修地址" :label-width="formLabelWidth">
          <el-input v-model="newWorkorder.address" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="commitWorkorder()">确 定</el-button>
      </div>
    </el-dialog>
    <div class="order-wrap">
      <div>
        <h2 style="padding-left: 10px; text-align: left;display: inline-block;float: left">未处理工单</h2>
        <el-button type="danger" style="display: inline-block;float: right;margin-top: 20px;margin-right: 10px" @click="SdialogFormVisible=true">创建工单</el-button>
      </div>
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
                          <time class="time">{{workorder.createdTime}}</time>
                        </el-col>
                        <el-col :span="18">
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
  </div>
</template>

<script>
import {getCookie} from '../assets/js/cookie.js'
export default {
  name: 'Unresolve',
  data () {
    return {
      fileList: [],
      text: '',
      username: '',
      urls: [],
      dialogImageUrl: '',
      dialogVisible: false,
      SdialogFormVisible: false,
      workorders: [],
      newWorkorder: {
        'message': '',
        'address': '',
        'tenantUsername': '',
        'urls': []
      }
    }
  },
  mounted () {
    this.username = getCookie('username')
    var self = this
    this.$axios.post('/api/workorder/getbyTenant', this.qs.stringify({
      'username': this.username
    })).then((res) => {
      self.workorders = res.data
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
        this.newWorkorder.urls.push(res.data)
      })
    },
    commitWorkorder () {
      this.newWorkorder.tenantName = this.username
      this.$axios.post('/api/workorder/add', this.newWorkorder)
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
