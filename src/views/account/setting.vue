<template>
  <div class="setting">
    <breadcrumb></breadcrumb>
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
          <el-col :span="7">
            <el-upload class="avatar-uploader" action="/api/img/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="formData.avatar" :src="formData.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-form-item>
        <el-form-item label="我的签名：" prop="desc">
          <el-col :span="24">
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
</template>

<script type="text/ecmascript">
import breadcrumb from '../../components/breadcrumb/breadcrumb'
import citypicker from '../../components/citypicker/citypicker'
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
        phone: '',
        email: '',
        qq: '',
        wechat: ''
      },
      rules: rule
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/api/user/set_user_detail', {
            nickname: this.formData.name,
            avatar: this.formData.avatar,
            sex: this.formData.sex,
            phone: this.formData.phone,
            qq: this.formData.qq,
            wechat: this.formData.wechat,
            email: this.formData.email,
            introduct: this.formData.desc,
            province: this.formData.province,
            city: this.formData.city,
            county: this.formData.county,
            address: this.formData.address.join(' '),
            brith_day: this.formData.date,
            uid: '6'
          })
            .then(response => {
              console.log(response)
            })
            .catch(error => {
              console.log(error)
            })
          console.log('submit!')
        } else {
          console.log('error submit!!')
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
    handleAvatarSuccess (res, file) {
      this.formData.avatar = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  },
  components: {
    breadcrumb,
    citypicker
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
@import '../../common/scss/base.scss';
.setting{
  margin: .5rem;
  border:solid 1px #354052;
  .detail-wrapper{
    padding:1.5rem;
    text-align: left;
    max-width: 830px;
  }
  .avatar-uploader {
    border:solid 5px red;
    .el-upload {
      border:solid 5px red!important;
      /*border: 1px dashed #d9d9d9;*/
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover{
        border-color: #409EFF;
      }
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
}
</style>
