<template>
  <div class="login">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="帐号">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript">
export default {
  data () {
    return {
      form: {
        account: '',
        password: ''
      }
    }
  },
  created () {},
  mounted () {
    this.$http.get('/api/login/getAccount')
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    onSubmit () {
      this.$http.post('/api/login', {
        ac: this.form.account,
        pd: this.form.password
      })
        .then(response => {
          console.log(response)
          if (response.data.code === 1) {
            this.$router.push('/blog/home')
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
</style>
