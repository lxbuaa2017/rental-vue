<template>
  <div>
    <img src="../../assets/logo.png">
    <div class="login-wrap" v-show="showLogin">
      <h3>登录</h3>
      <p v-show="showTishi">{{tishi}}</p>
      <input type="text" placeholder="请输入用户名" v-model="username"/>
      <input type="password" placeholder="请输入密码" v-model="password"/>
      <button v-on:click="login">登录</button>
      <span v-on:click="ToRegister">没有账号？马上注册</span>
    </div>

    <div class="register-wrap" v-show="showRegister">
      <h3>注册</h3>
      <p v-show="showTishi">{{tishi}}</p>
      <input type="text" placeholder="用户名" v-model="newUsername"/>
      <input type="password" placeholder="密码" v-model="newPassword"/>
      <input type="password" placeholder="确认密码" v-model="confirmPassword"/>
      <input type="text" placeholder="手机号码" v-model="phone"/>
      <input type="email" placeholder="电子邮箱" v-model="email"/>
      <div id="optionbox">
        <input type="radio" id="one" value="true" v-model="isMale"/>
        <label for="one">男</label>
        <input type="radio" id="two" value="false" v-model="isMale"/>
        <label for="two">女</label>
      </div>
      <input type="number" min="0" max="150" placeholder="年龄" v-model="age"/>
      <button v-on:click="register">注册</button>
      <span v-on:click="ToLogin">已有账号？马上登录</span>
    </div>
  </div>
</template>

<style>
  #optionbox {
    width: 250px;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    align-content: flex-start;
  }

  #one, #two {
    width: 20px;
    height: 20px;
    text-align: left;
    margin-left: 10px;
    margin-right: 0;
  }

  .login-wrap {
    text-align: center;
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

  span:hover {
    color: #41b883;
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
      if (this.username === '' || this.password === '') {
        alert('请输入用户名或密码！')
      } else {
        let data = {'username': this.username, 'password': this.password}

        this.$axios.post('http://localhost:8081/login', data).then((res) => {
          console.log(res)
          if (res.data === -1) {
            this.tishi = '该用户不存在'
            this.showTishi = true
          } else if (res.data === 0) {
            this.tishi = '密码输入错误'
            this.showTishi = true
          } else if (res.data === 'admin') {
            this.$router.push('/main')
          } else {
            alert('登录成功!')
            this.tishi = '登录成功'
            this.showTishi = true
            setCookie('username', this.username, 1000 * 60)
            setTimeout(function () {
              this.$router.push({path: 'home', query: {id: 1}})
            }.bind(this), 1000)
          }
        })
      }
    },
    ToRegister () {
      this.showRegister = true
      this.showLogin = false
    },
    ToLogin () {
      this.showRegister = false
      this.showLogin = true
    },
    register () {
      if (this.newUsername === '' || this.newPassword === '') {
        alert('请输入用户名或密码')
      } else {
        let data = {'username': this.newUsername,
          'password': this.newPassword,
          'phone': this.phone,
          'email': this.email,
          'isMale': this.isMale,
          'age': this.age}
        this.$axios.post('http://localhost:8081/register', data).then((res) => {
          console.log(res)
          if (res.data === 'ok') {
            this.tishi = '注册成功'
            this.showTishi = true
            this.username = ''
            this.password = ''
            setTimeout(function () {
              this.showRegister = false
              this.showLogin = true
              this.showTishi = false
            }.bind(this), 1000)
          }
        })
      }
    }
  }
}
</script>
