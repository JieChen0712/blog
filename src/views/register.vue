<template>
  <div class="register">
    <el-form :model="formData" :rules="rules2" ref="formData" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">注册登录</h3>
      <el-form-item prop="name">
        <el-input type="text" v-model="formData.name" auto-complete="off" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input type="email" v-model="formData.email" auto-complete="off" placeholder="邮箱地址"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="formData.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="checPass">
        <el-input type="password" v-model="formData.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="success" @click="handleRegister" class="register">注册</el-button>
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
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.passWord) {
        callback(new Error('两次输入密码不一致!'))
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
        checPass: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleRegister () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.registering = true
          var registerParams = { 'name': this.formData.name, 'ac': this.formData.email, 'pd': this.formData.passWord }
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
            .catch(error => {
              this.$notify.error({
                title: '错误',
                message: error,
                position: 'bottom-right',
                showClose: false
              })
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
.register{
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
    .register,.login{
      width: 48%;
    }
  }
}
</style>
