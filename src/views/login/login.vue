<template>
  <div id="main">
    <img src="../../assets/logo.png">
    <div class="login-wrap" v-show="showLogin">
      <h3>登录</h3>
      <p v-show="showTishi">{{tishi}}</p>
      <el-input type="text" placeholder="请输入用户名" v-model="username"></el-input>
      <el-input type="password" placeholder="请输入密码" v-model="password"></el-input>
      <el-button v-on:click="login">登录</el-button>
      <el-link :underline="false" v-on:click="ToRegister">没有账号？马上注册</el-link>
    </div>

    <div class="register-wrap" v-show="showRegister">
      <h3>注册</h3>
      <p v-show="showTishi">{{tishi}}</p>
      <el-input type="text" placeholder="用户名" v-model="newUsername"></el-input>
      <el-input type="password" placeholder="密码" v-model="newPassword"></el-input>
      <el-input type="password" placeholder="确认密码" v-model="confirmPassword"></el-input>
      <el-input type="text" placeholder="手机号码" v-model="phone"></el-input>
      <el-input type="email" placeholder="电子邮箱" v-model="email"></el-input>
      <div id="optionbox">
        <el-radio v-model="isMale" label="true">男</el-radio>
        <el-radio v-model="isMale" label="false">女</el-radio>
      </div>
      <el-input type="number" min="0" max="150" placeholder="年龄" v-model="age"></el-input>
      <el-button v-on:click="register">注册</el-button>
      <el-link :underline="false" v-on:click="ToLogin">已有账号？马上登录</el-link>
    </div>
  </div>
</template>

<style>
  #main {
    vertical-align: center;
  }

  #optionbox {
    width: 250px;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    align-content: flex-start;
  }

  .login-wrap {
    width: 250px;
    text-align: center;
    margin: auto;
    display: inline-block;
    vertical-align: top;
    padding-left: 20px;
  }

  .register-wrap {
    width: 250px;
    text-align: center;
    margin: auto;
    display: inline-block;
    vertical-align: top;
    padding-left: 20px;
  }

  input {
    display: block;
    width: 250px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto 10px;
    outline: none;
    border: 1px solid #888;
    padding: 10px;
    box-sizing: border-box;
  }

  p {
    color: red;
  }

  button {
    display: block;
    width: 250px;
    height: 40px;
    line-height: 40px;
    border: none;
    background-color: #41b883;
    color: #fff;
    font-size: 16px;
    margin: 0 auto 5px;
  }

  span {
    cursor: pointer;
  }
</style>

<script>
import {setCookie, getCookie} from '../../assets/js/cookie.js'

export default {
  data () {
    return {
      username: '',
      password: '',
      newUsername: '',
      newPassword: '',
      confirmPassword: '',
      phone: '',
      email: '',
      isMale: 'true',
      age: '',
      tishi: '',
      showTishi: false,
      showLogin: true,
      showRegister: false
    }
  },
  mounted () {
    if (getCookie('username')) {
      this.$router.push('/home')
    }
  },
  methods: {
    login () {
      if (this.username === '') {
        this.tishi = '请输入用户名'
        this.showTishi = true
      } else if (this.password === '') {
        this.tishi = '请输入密码'
        this.showTishi = true
      } else {
        let data = {'username': this.username, 'password': this.password}

        this.$axios.post('http://localhost:8081/login', data).then((res) => {
          console.log(res)
          if (res.data === 0) {
            this.tishi = '用户名或密码错误'
            this.showTishi = true
          } else if (res.data === 'admin') {
            this.$router.push('/main')
          } else {
            this.tishi = '登录成功'
            this.showTishi = true
            setCookie('username', this.username, 1000 * 60)
            setTimeout(function () {
              this.$router.push('/home')
            }.bind(this), 1000)
          }
        })
      }
    },
    ToRegister () {
      this.showTishi = false
      this.showRegister = true
      this.showLogin = false
    },
    ToLogin () {
      this.showTishi = false
      this.showRegister = false
      this.showLogin = true
    },
    register () {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      var rePhone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
      if (this.newUsername === '') {
        this.tishi = '请输入用户名'
        this.showTishi = true
      } else if (this.newPassword === '') {
        this.tishi = '请输入密码'
        this.showTishi = true
      } else if (this.newPassword.length < 6) {
        this.tishi = '密码长度必须为6位或以上'
        this.showTishi = true
      } else if (this.newPassword !== this.confirmPassword) {
        this.tishi = '两次输入的密码不一致'
        this.showTishi = true
      } else if (!rePhone.test(this.phone)) {
        this.tishi = '手机号无效'
        this.showTishi = true
      } else if (!re.test(this.email)) {
        this.tishi = '邮箱无效'
        this.showTishi = true
      } else if (this.age < 0 || this.age > 150) {
        this.tishi = '年龄无效'
        this.showTishi = true
      } else {
        let data = {'username': this.newUsername,
          'password': this.newPassword,
          'phone': this.phone,
          'email': this.email,
          'isMale': this.isMale,
          'age': this.age}
        this.$axios.post('http://localhost:8081/register', data).then((res) => {
          console.log(res)
          if (res.data === 1000) {
            this.tishi = '注册成功'
            this.showTishi = true
            this.username = ''
            this.password = ''
            setTimeout(function () {
              this.showRegister = false
              this.showLogin = true
              this.showTishi = false
            }.bind(this), 1000)
          } else if (res.data === 1028) {
            this.tishi = '用户名已存在'
            this.showTishi = true
          }
        })
      }
    }
  }
}
</script>
