<template>
  <div class="login">
    <div class="login_wrapper" v-show="register">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm2.account" auto-complete="on" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="on" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button type="primary" @click.native.prevent="handleSubmit2" :loading="logining" class="btn-login">登录</el-button>
          <el-button type="success" @click="handleRegister" class="btn-register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--<div class="register_wrapper">
      <register></register>
    </div>-->
  </div>
</template>

<script>
import { login } from '@/api/api'
import { setCookie, getCookie } from '@/common/js/base.js'
import register from './register'
// import NProgress from 'nprogress'
export default {
  data () {
    return {
      register: true,
      logining: false,
      ruleForm2: {
        account: '',
        checkPass: ''
      },
      rules2: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
          // { validator: validaePass }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
          // { validator: validaePass2 }
        ]
      },
      checked: true
    }
  },
  mounted () {
    let ac = getCookie('account')
    let pd = getCookie('checkPass')
    if (ac !== undefined || ac !== '' || ac !== null) {
      this.ruleForm2.account = atob(ac)
    }
    if (ac !== undefined || ac !== '' || ac !== null) {
      this.ruleForm2.checkPass = atob(pd)
    }
  },
  methods: {
    handleReset2 () {
      this.$refs.ruleForm2.resetFields()
    },
    handleSubmit2 (ev) {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          // _this.$router.replace('/table')
          this.logining = true
          if (this.checked) {
            setCookie('account', btoa(this.ruleForm2.account), 2)
            setCookie('checkPass', btoa(this.ruleForm2.checkPass), 2)
          }
          // NProgress.start()
          var loginParams = { 'ac': this.ruleForm2.account, 'pd': this.ruleForm2.checkPass }
          login(loginParams)
            .then(response => {
              this.logining = false
              // NProgress.done()
              if (response.data.code === 1) {
                this.$notify({
                  title: '成功',
                  message: response.data.msg,
                  type: 'success',
                  position: 'bottom-right',
                  showClose: false
                })
                this.$router.push({ path: '/blog/home' })
              } else {
                this.$notify.error({
                  title: '错误',
                  message: response.data.msg,
                  position: 'bottom-right',
                  showClose: false
                })
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRegister () {
      this.register = true
      this.$router.push({path: '/blog/home/register'})
    }
  },
  components: {
    register
  }
}

</script>

<style lang="scss" scoped>
.login{
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
    .btn-register,.btn-login{
      width: 47%;
    }
  }
}
</style>
