<template>
  <div class="detail">
    <breadcrumb></breadcrumb>
    <div class="tb-wrap">
      <div class="scroll-hide">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="article-form">
          <el-form-item label="账号：" prop="account">
            <el-col :span="7">
              <el-input v-model="formData.account" placeholder="登录账号"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-col :span="7">
              <el-input v-model="formData.password" placeholder="登录密码"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="确认密码：" prop="password">
            <el-col :span="7">
              <el-input v-model="formData.checkPass" placeholder="再次确认密码"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="用户名：" prop="name">
            <el-col :span="7">
              <el-input v-model="formData.name" placeholder="用户名"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="用户类型：" prop="type">
            <el-col :span="7">
              <el-select v-model="formData.type" filterable placeholder="用户类型">
                <el-option v-for="item in optUserType" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="权限：" prop="power">
            <el-col :span="7">
              <el-checkbox-group v-for="pitem in powerList" :key="pitem.val" v-model="checkedPower" @change="handlePowerChange">
                <el-checkbox @change="handleCheckAllChange" :label="pitem.val" class="head-check" :checked="pitem.check">{{pitem.name}}</el-checkbox>
                <el-checkbox v-for="item in pitem.child" :label="item.val" :key="item.val" class="child-check" @change="childChange" :checked="pitem.check">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-form-item>
          <el-form-item label="头像：">
            <div class="uploadImg">
              <uploadsingle :filePath="filePath" :imgUrl="formData.image" @change="setAvatar"></uploadsingle>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="success" class="btn-submit" @click.native.prevent="submitRegister">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript">
import breadcrumb from '../../components/breadcrumb/breadcrumb'
import uploadsingle from '../../components/upload/uploadSingle'

export default {
  data () {
    return {
      formData: {
        name: '',
        account: '',
        password: '',
        type: '',
        power: '',
        status: '',
        image: '',
        checkPass: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择文章分类', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请填写文章内容', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写文章描述', trigger: 'blur' }
        ]
      },
      opt_status: [
        {value: 1, label: '公开'},
        {value: 2, label: '私密'},
        {value: 3, label: '不显示'}
      ],
      powerList: [
        {name: '管理员', val: 1, check: true, child: [{name: '个人信息', val: 1.1, check: true}, {name: '管理员列表', val: 1.2, check: true}]},
        {name: '文章', val: 2, check: false, child: [{name: '文章分类', val: 2.1, check: false}, {name: '文章列表', val: 2.2, check: false}]}
      ],
      checkedPower: [],
      optUserType: [
        {value: 1, label: '超级管理员'},
        {value: 2, label: '普通管理员'}
      ],
      filePath: {path: 'avatar'}
    }
  },
  components: {
    breadcrumb,
    uploadsingle
  },
  created () {
    this.type = this.$route.query.type
    this.articleId = this.$route.query.id
  },
  activated () {},
  mounted () {},
  methods: {
    setAvatar (value) {
      this.formData.image = value
    },
    handlePowerChange (value) {
      console.log(value)
    },
    handleCheckAllChange (val) {
      console.log(val)
    },
    submitRegister () {
      console.log(1)
    },
    childChange (val, event) {
      console.log(event)
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
.detail{
  .tb-wrap{
    .article-form{
      .uploadImg{
        width:180px;
        height:180px;
      }
      .btn-submit{
        float: right;
      }
    }
    .el-form-item{
      margin-right: 100px;
      .el-checkbox-group{
        .head-check{
          display: block;
        }
        .child-check{
          /*height: 30px;
          font-size: 0;
          &.el-checkbox__input{
            line-height: 30px;
          }*/
        }
      }
    }
  }
}
</style>
