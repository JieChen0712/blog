<template>
  <div class="kind-detail">
    <breadcrumb></breadcrumb>
    <div class="tb-wrap">
      <div class="scroll-hide">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="article-form">
          <el-form-item label="分类名：" prop="name">
            <el-col :span="3">
              <el-input v-model="formData.name" placeholder="分类名"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="归属分类：" prop="kind">
            <el-col :span="7">
              <el-select v-model="formData.kind" filterable placeholder="归属分类">
                <el-option v-for="item in opt_kind" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="状态：">
            <el-col :span="7">
              <el-switch v-model="formData.status" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="2">
            </el-switch>
            </el-col>
          </el-form-item>
          <el-form-item label="封面：">
            <div class="uploadImg">
              <uploadsingle :filePath="filePath" :imgUrl="formData.imgurl" @change="setAvatar"></uploadsingle>
            </div>
          </el-form-item>
          <el-form-item label="优先级：">
            <el-col :span="1">
              <el-input v-model="formData.order" placeholder="优先级"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click.native.prevent="submitForm('formData')" v-if="type === 'add'" class="fr">确认添加</el-button>
            <el-button type="primary" @click.native.prevent="submitForm('formData')" v-if="type === 'edit'" class="fr">确认修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript">
import breadcrumb from '../../components/breadcrumb/breadcrumb'
import uploadsingle from '../../components/upload/uploadSingle'
import { saveArticle } from '@/api/api.js'

export default {
  data () {
    return {
      kind_id: Number,
      type: 'add',
      formData: {
        name: '',
        kind: '',
        status: '1',
        order: 0,
        imgurl: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入分类名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        kind: [
          { required: true, message: '请选择归属分类', trigger: 'change' }
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
      filePath: {path: 'article_kind'}
    }
  },
  components: {
    breadcrumb,
    uploadsingle
  },
  created () {
    this.kind_id = this.$route.query.id
    this.type = this.$route.query.type
  },
  mounted () {
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
.kind-detail{
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
