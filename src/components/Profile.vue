<template>
  <div class="profile">
    <div><h2>{{this.userobject.username}} 的个人资料</h2></div>
    <div style="padding: 5px">
      <span style="display: inline-block;width: 100px;text-align: left">旧密码：</span>
      <el-input type="password" style="width: 250px;display: inline-block" v-model="oldpassword"></el-input>
    </div>
    <div style="padding: 5px">
      <span style="display: inline-block;width: 100px;text-align: left">新密码：</span>
      <el-input type="password" style="width: 250px;display: inline-block" v-model="newpassword"></el-input>
    </div>
    <div style="padding: 5px">
      <span style="display: inline-block;width: 100px;text-align: left">确认新密码：</span>
      <el-input type="password" style="width: 250px;display: inline-block" v-model="confirmpassword"></el-input>
    </div>
    <div style="padding: 5px">
      <span style="display: inline-block;width: 100px;text-align: left">手机号：</span>
      <el-input style="width: 250px;display: inline-block" v-model="phone"></el-input>
    </div>
    <div style="padding: 5px">
      <span style="display: inline-block;width: 100px;text-align: left">电子邮箱：</span>
      <el-input style="width: 250px;display: inline-block" v-model="email"></el-input>
    </div>
    <div style="padding: 5px">
      <span style="display: inline-block;width: 100px;text-align: left">年龄：</span>
      <el-input type="number" min="0" max="150" style="width: 250px;display: inline-block" v-model="age"></el-input>
    </div>
    <div style="padding: 10px">
      <span style="display: inline-block;width: 100px;text-align: left">性别：</span>
      <div style="display: inline-block;width: 250px">
        <el-radio style="display: inline-block;padding-left: 5px;padding-right: 5px" v-model="isMale" label="true">男</el-radio>
        <el-radio style="display: inline-block;padding-left: 5px;padding-right: 5px" v-model="isMale" label="false">女</el-radio>
      </div>
    </div>
    <div style="padding: 10px">
      <el-button type="primary" @click="update">保存</el-button>
    </div>
  </div>
</template>

<script>
import {getCookie} from '../assets/js/cookie.js'
export default {
  name: 'Profile',
  data () {
    return {
      username: '',
      userobject: {},
      oldpassword: '',
      newpassword: '',
      confirmpassword: '',
      phone: '',
      email: '',
      age: '',
      isMale: 'true'
    }
  },
  mounted () {
    this.username = getCookie('username')
    let self = this
    this.$axios.get('/api/tenant/getByName?name=' + this.username).then((res) => {
      console.log(res)
      self.userobject = res.data
      self.phone = this.userobject.phone
      self.email = this.userobject.email
      self.age = this.userobject.age.toString()
      self.isMale = this.userobject.male.toString()
    })
    console.log(this.isMale)
    console.log(this.userobject.male)
  },
  methods: {
    update () {
      if (this.oldpassword !== '' || this.newpassword !== '' || this.confirmpassword !== '') {
        if (this.oldpassword !== this.userobject.password) {
          alert('旧密码不正确！')
          return
        } else if (this.newpassword.length < 6) {
          alert('新密码位数必须6位或以上！')
          return
        } else if (this.newpassword !== this.confirmpassword) {
          alert('两次输入的密码不一致！')
          return
        } else {
          this.userobject.password = this.newpassword
        }
      }
      let rePhone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
      if (!rePhone.test(this.phone)) {
        alert('手机号无效！')
        return
      } else {
        this.userobject.phone = this.phone
      }
      let reMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!reMail.test(this.email)) {
        alert('邮箱无效！')
        return
      } else {
        this.userobject.email = this.email
      }
      if (this.age < 0 || this.age > 150) {
        alert('年龄无效！')
        return
      } else {
        this.userobject.age = this.age
      }
      if (this.isMale === 'true') {
        this.userobject.male = true
      } else {
        this.userobject.male = false
      }
      console.log(this.userobject)
      this.$axios.post('/api/tenant/update', {'tenant': this.userobject}).then((res) => {
        console.log(res)
        alert('保存成功！')
      })
    }
  }
}
</script>

<style scoped>

</style>
