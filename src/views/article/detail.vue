<template>
  <div class="detail">
    <breadcrumb></breadcrumb>
    <div class="tb-wrap">
      <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题：" prop="title">
          <el-col :span="7">
            <el-input v-model="formData.title" placeholder="文章标题"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="封面：">
          <el-col :span="7">
            <el-input v-model="formData.imgurl" placeholder="文章的封面"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="描述：" prop="disc">
          <el-col :span="7">
            <el-input v-model="formData.disc" placeholder="文章的内容描述"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="分类：" prop="kind">
          <el-col :span="7">
            <el-select v-model="formData.kind" filterable placeholder="文章分类">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="文章内容：" prop="ueContent">
          <el-col :span="22">
            <ueditor :id=ueId :config=ueConfig :content=formData.ueContent class="ueditor" ref="ue"></ueditor>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript">
import ueditor from '../../components/ueditor/ueditor'
import breadcrumb from '../../components/breadcrumb/breadcrumb'

export default {
  data () {
    return {
      ueId: 'article_edit',
      ueConfig: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      formData: {
        title: '',
        kind: '',
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
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  components: {
    ueditor,
    breadcrumb
  },
  created () {},
  mounted () {
    this.formData.ueContent = '<span style="color:red">123</span>'
  },
  methods: {}
}
</script>

<style lang="scss" scoped="" type="text/css">
</style>
