<template>
  <div class="detail">
    <breadcrumb></breadcrumb>
    <div class="tb-wrap">
      <div class="scroll-hide">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="article-form">
          <el-form-item label="标题：" prop="title">
            <el-col :span="7">
              <el-input v-model="formData.title" placeholder="文章标题"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="分类：" prop="kind">
            <el-col :span="7">
              <el-select v-model="formData.kind" filterable placeholder="文章分类">
                <el-option v-for="item in opt_kind" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="状态：" prop="status">
            <el-col :span="7">
              <el-select v-model="formData.status" filterable placeholder="文章状态">
                <el-option v-for="item in opt_status" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="封面：">
            <div class="uploadImg">
              <uploadsingle :filePath="filePath" :imgUrl="formData.imgurl" @change="setAvatar"></uploadsingle>
            </div>
          </el-form-item>
          <el-form-item label="摘要：" prop="disc">
            <el-col :span="20">
              <el-input type="textarea" v-model="formData.disc" size="txtarea"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="文章内容：" prop="ueContent">
            <el-col :span="22">
              <ueditor :id=ueId :config=ueConfig :content=formData.ueContent class="ueditor" ref="ue"></ueditor>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native.prevent="submitForm('formData')">发布</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript">
import ueditor from '../../components/ueditor/ueditor'
import breadcrumb from '../../components/breadcrumb/breadcrumb'
import uploadsingle from '../../components/upload/uploadSingle'
import { saveArticle } from '@/api/api.js'

export default {
  data () {
    return {
      type: String,
      article_id: Number,
      ueId: 'article_edit',
      ueConfig: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      formData: {
        title: '',
        kind: '',
        status: '',
        ueContent: '',
        disc: '',
        imgurl: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        kind: [
          { required: true, message: '请选择文章分类', trigger: 'change' }
        ],
        ueContent: [
          { required: true, message: '请填写文章内容', trigger: 'blur' }
        ],
        disc: [
          { required: true, message: '请填写文章描述', trigger: 'blur' }
        ]
      },
      opt_kind: [{
        value: '1',
        label: '日常'
      }, {
        value: '2',
        label: '技术'
      }, {
        value: '3',
        label: '音乐'
      }, {
        value: '4',
        label: '日记'
      }, {
        value: '5',
        label: '游戏'
      }],
      opt_status: [{
        value: '1',
        label: '公开'
      }, {
        value: '2',
        label: '私密'
      }, {
        value: '3',
        label: '不显示'
      }, {
        value: '4',
        label: '管理员'
      }],
      filePath: {path: 'avatar'}
    }
  },
  components: {
    ueditor,
    breadcrumb,
    uploadsingle
  },
  created () {
    this.type = this.$route.query.type
    this.article_id = this.$route.query.id
  },
  mounted () {
    this.formData.ueContent = '<span style="color:red">123</span>'
  },
  methods: {
    setAvatar (value) {
      this.formData.imgurl = value
    },
    submitForm (value) {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          saveArticle(this.formData)
            .then(response => {
              if (response.data.code === 1) {
                this.$message({
                  message: response.data.msg,
                  type: 'success'
                })
              } else {
                this.$message({
                  message: response.data.msg,
                  type: 'error'
                })
              }
            })
        } else {
          console.log(valid)
        }
      })
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
    }
  }
}
</style>
