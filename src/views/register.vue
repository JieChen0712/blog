<template>
  <div class="register">
    <el-form :model="formData" :rules="rules2" ref="formData" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">注册登录</h3>
      <el-form-item prop="name">
        <el-input type="text" v-model="formData.name" auto-complete="off" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="account">
        <el-input type="text" v-model="formData.account" auto-complete="off" placeholder="登录账号"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input type="password" v-model="formData.passWord" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="formData.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input type="email" v-model="formData.email" auto-complete="off" placeholder="邮箱地址"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input type="tel" v-model="formData.phone" auto-complete="off" placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item prop="wechat">
        <el-input type="text" v-model="formData.wechat" auto-complete="off" placeholder="微信号"></el-input>
      </el-form-item>
      <el-form-item prop="qq">
        <el-input type="text" v-model="formData.qq" auto-complete="off" placeholder="Q Q号"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="warning" @click="handleBack" class="btn-back">已有账号</el-button>
        <el-button type="success" @click="handleRegister" class="btn-register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript">
import { register } from '../api/api'
export default {
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formData.checkPass !== '') {
          this.$refs.formData.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.passWord) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    let checkNeed = (rule, value, callback) => {
      if (this.formData.qq === '' && this.formData.wechat === '' && this.formData.phone === '' && this.formData.email === '') {
        callback(new Error('QQ号、微信号、手机号、邮箱必须填写其中一项'))
      } else {
        callback()
      }
    }
    return {
      registering: false,
      formData: {
        name: '',
        email: '',
        passWord: '',
        checkPass: '',
        wechat: '',
        qq: '',
        account: '',
        phone: ''
      },
      rules2: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        qq: [
          {validator: checkNeed, triger: 'blur'}
        ],
        email: [
          {validator: checkNeed, triger: 'blur'}
        ],
        wechat: [
          {validator: checkNeed, triger: 'blur'}
        ],
        phone: [
          {validator: checkNeed, triger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleRegister () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.registering = true
          var registerParams = {
            name: this.formData.name,
            ac: this.formData.account,
            pd: this.formData.passWord,
            qq: this.formData.qq,
            email: this.formData.email,
            wechat: this.formData.wechat,
            phone: this.formData.phone
          }
          register(registerParams)
            .then(response => {
              this.registering = false
              if (response.data.code === 1) {
                this.$notify({
                  title: '注册成功',
                  message: response.data.msg,
                  type: 'success',
                  position: 'bottom-right',
                  showClose: false
                })
                this.$router.back(-1)
              } else {
                this.$notify.error({
                  title: '错误',
                  message: response.data.msg,
                  position: 'bottom-right',
                  showClose: false
                })
              }
            })
        }
      })
    },
    handleBack () {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
.register {
  height: 100%;
  display: grid;
  place-items: center;
  overflow: auto;
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    /*margin: 180px auto;*/
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
    .btn-register,
    .login,
    .btn-back {
      width: 48%;
    }
  }
}

</style>
