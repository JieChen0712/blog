<template>
  <div class="register">
    <el-form :model="formData" :rules="rules2" ref="formData" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">注册登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="formData.account" auto-complete="off" placeholder="用户名"></el-input>
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
        <el-button type="success" @click.native.prevent="handleRegister" class="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript">
import { register } from '../api/api'
export default {
  data () {
    return {
      registering: false,
      formData: {
        account: Number,
        email: String,
        passWord: String,
        checPass: String
      }
    }
  },
  methods: {
    handleRegister () {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.registering = true
          var registerParams = { 'ac': this.formData.account, 'pd': this.formData.passWord, 'ckpd': this.formData.checPass }
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
.register{}
</style>
