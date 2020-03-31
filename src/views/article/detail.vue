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
              <uploadsingle :filePath="filePath" :imgUrl="formData.image" @change="setAvatar"></uploadsingle>
            </div>
          </el-form-item>
          <el-form-item label="摘要：" prop="desc">
            <el-col :span="20">
              <el-input type="textarea" v-model="formData.desc" size="txtarea"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="文章内容：" prop="content">
            <ueditor :id="ueId" :config="ueConfig" :content="formData.content" class="ueditor" ref="ue" @change="setContent"></ueditor>
          </el-form-item>
          <el-form-item>
            <el-button type="success" class="btn-submit" @click.native.prevent="submitArticle('formData')" v-if="type === 'add'">添加</el-button>
            <el-button type="primary" class="btn-submit" @click.native.prevent="submitArticle('formData')" v-if="type === 'edit'">修改</el-button>
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
import { saveArticle, getArticleDetail, getArticleKindList } from '@/api/api.js'

export default {
  data () {
    return {
      type: String,
      articleId: Number,
      ueId: 'article_detail',
      ueConfig: {
        autoHeightEnabled: false,
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      formData: {
        title: '',
        kind: '',
        status: '',
        content: '',
        desc: '',
        image: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        kind: [
          { required: true, message: '请选择文章分类', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请填写文章内容', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写文章描述', trigger: 'blur' }
        ]
      },
      opt_kind: [],
      opt_status: [{
        value: 1,
        label: '公开'
      }, {
        value: 2,
        label: '私密'
      }, {
        value: 3,
        label: '不显示'
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
    this.articleId = this.$route.query.id
  },
  activated () {
    this.ueId = 'article_detail' + Math.round(new Date() / 1000)
    this.getArticleKind()
    this.type = this.$route.query.type
    this.articleId = this.$route.query.id
    if (this.type === 'edit') {
      this.getArticleInfo(this.articleId)
    } else {
      for (let i in this.formData) {
        this.formData[i] = ''
      }
      this.formData.content = '<span style="color:#bfbfbf">请添加文章内容</span>'
    }
  },
  mounted () {},
  methods: {
    setAvatar (value) {
      this.formData.image = value
    },
    setContent (value) {
      this.formData.content = value
    },
    getArticleInfo (articleId) {
      if (articleId !== null && articleId !== '' && articleId !== undefined) {
        let param = {
          id: articleId
        }
        getArticleDetail(param)
          .then(response => {
            if (response.data.code === 1) {
              this.formData = response.data.info
            } else {
              this.$message.error(response.data.msg)
            }
          })
      }
    },
    getArticleKind () {
      getArticleKindList()
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            this.opt_kind = []
            for (let i in data.info) {
              this.opt_kind.push({
                label: data.info[i].name,
                value: data.info[i].id
              })
            }
          } else {
            this.$message.error(data.msg)
          }
        })
    },
    submitArticle (value) {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          let param = this.formData
          param.id = this.articleId
          param.type = this.type
          saveArticle(param)
            .then(response => {
              if (response.data.code === 1) {
                this.$message({
                  message: response.data.msg,
                  type: 'success'
                })
                setTimeout(() => { this.$router.back(-1) }, 2000)
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
      .btn-submit{
        float: right;
      }
    }
    .el-form-item{
      margin-right: 100px;
    }
  }
}
</style>
