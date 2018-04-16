<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="title-container">
        <h3 class="title">{{$t('login.title')}} </h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon name="user" scale="2.2"/>
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="账户" ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="password" scale="1.6"/>
        </span>
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon name="eye" scale="2"/>
        </span>
      </el-form-item>

      <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>

      
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'xiao',
        password: '123456'
      },
      loginRules: {
        // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
           
            
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch((message) => {
            this.loading = false;
            this.$message.error(message);
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 37px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 5px;
      // color: $light_gray;
      height: 37px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    height:37px;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  // background-color: $bg;
  background:url('../../assets/login_bg.jpg') no-repeat;
  background-size : 100% 100%;
  .login-form {
    position: absolute;
    left: 66%;
    right: 0;
    width: 330px;
    padding: 15px;
    margin: 250px 90px;
    background-color:white;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    line-height: 4px;
    padding: 0 3px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 23px;
      font-weight: 300;
      // color: $light_gray;
      margin: 0px auto 20px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
