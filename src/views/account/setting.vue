<template>
  <div class="setting">
    <breadcrumb></breadcrumb>
    <div class="fm-wrap">
      <div class="detail-wrapper">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm">
          <el-form-item label="称呢：" prop="name">
            <el-col :span="7">
              <el-input v-model="formData.name" placeholder="你的称呢"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="用户名：">
            <span class="r-text">JieChen</span>
          </el-form-item>
          <el-form-item label="用户头像：" prop="avatar">
            <div class="uploadImg">
              <uploadsingle :filePath="filePath" :imgUrl="formData.avatar" @change="setAvatar"></uploadsingle>
            </div>
          </el-form-item>
          <el-form-item label="我的签名：" prop="desc">
            <el-col :span="20">
              <el-input type="textarea" v-model="formData.desc" size="txtarea"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-radio-group v-model="formData.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
              <el-radio label="0">保密</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期：">
            <el-col :span="7">
              <el-date-picker type="date" v-model="formData.date" placeholder="选择出生日期"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="所在地：" prop="address">
            <el-col :span="7">
              <citypicker :address="formData.address" @change="setAddress"></citypicker>
            </el-col>
          </el-form-item>
          <el-form-item label="详细地址：" prop="address_detail">
            <el-col :span="20">
              <el-input type="textarea" v-model="formData.address_detail" size="txtarea"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="手机号码：" required>
            <el-col :span="7">
              <el-input prefix-icon="el-icon-mobile-phone" v-model="formData.phone" placeholder="请输入手机号码"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="邮箱：" required>
            <el-col :span="7">
              <el-input prefix-icon="el-icon-message" v-model="formData.email" placeholder="请输入邮箱"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="QQ：">
            <el-col :span="7">
              <el-input prefix-icon="fa fa-qq" v-model="formData.qq" placeholder="请输入QQ号码"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="微信：" required>
            <el-col :span="7">
              <el-input prefix-icon="fa fa-wechat" v-model="formData.wechat" placeholder="请输入微信号"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('formData')">提交修改</el-button>
            <el-button @click="resetForm('formData')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript">
import { getAdminInfo, setAdminInfo } from '@/api/api'
import breadcrumb from '../../components/breadcrumb/breadcrumb'
import citypicker from '../../components/citypicker/citypicker'
import uploadsingle from '../../components/upload/uploadSingle'
import rule from '../../common/js/rules.js'
export default {
  data () {
    return {
      formData: {
        name: '',
        avatar: '',
        desc: '',
        sex: '',
        date: '',
        address: [],
        address_detail: '',
        phone: '',
        email: '',
        qq: '',
        wechat: '',
        province: '',
        city: '',
        county: ''
      },
      rules: rule,
      filePath: {path: 'avatar'}
    }
  },
  mounted () {
    this.getAdminInfo_init()
    console.log(this.formData)
  },
  methods: {
    getAdminInfo_init () {
      getAdminInfo()
        .then(response => {
          console.log(response)
          let data = response.data
          if (data.code === 1) {
            this.formData.name = data.info.nickname
            this.formData.avatar = 'http://localhost:8080/static/img/user.e333137.jpg'
            this.formData.desc = data.info.introduce
            this.formData.sex = String(data.info.sex)
            this.formData.date = data.info.brith_day
            this.formData.province = data.info.province
            this.formData.city = data.info.city
            this.formData.county = data.info.county
            this.formData.address_detail = data.info.address
            this.formData.address = [data.info.province, data.info.city, data.info.county]
            this.formData.phone = data.info.phone
            this.formData.email = data.info.email
            this.formData.qq = data.info.qq
            this.formData.wechat = data.info.wechat
          } else {
            this.$message(data.msg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = {
            nickname: this.formData.name,
            avatar: this.formData.avatar,
            sex: this.formData.sex,
            phone: this.formData.phone,
            qq: this.formData.qq,
            wechat: this.formData.wechat,
            email: this.formData.email,
            introduce: this.formData.desc,
            province: this.formData.province,
            city: this.formData.city,
            county: this.formData.county,
            address: this.formData.address_detail,
            brith_day: this.formData.date
          }
          setAdminInfo(param)
            .then(response => {
              let data = response.data
              if (data.code === 1) {
                this.$message.success(data.msg)
              } else {
                this.$message.error(data.msg)
              }
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    setAddress (value) {
      this.formData.address = value
      this.formData.province = value[0]
      this.formData.city = value[1]
      this.formData.county = value[2]
    },
    setAvatar (value) {
      this.formData.avatar = value
    }
  },
  components: {
    breadcrumb,
    citypicker,
    uploadsingle
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
@import '../../common/scss/base.scss';
.setting{
  .uploadImg{
    width:180px;
    height:180px;
  }
}
</style>
