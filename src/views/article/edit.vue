<template>
  <div class="edit">
    <breadcrumb></breadcrumb>
    <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题：" prop="name">
        <el-col :span="7">
          <el-input v-model="formData.name" placeholder="你的称呢"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="封面：" prop="name">
        <el-col :span="7">
          <el-input v-model="formData.name" placeholder="你的称呢"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="描述：" prop="name">
        <el-col :span="7">
          <el-input v-model="formData.name" placeholder="文章的内容描述"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="分类：" prop="name">
        <el-col :span="7">
          <el-select v-model="value8" filterable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="文章内容：" prop="desc">
        <el-col :span="24">
          <ueditor :id=ueId :config=ueConfig :content=formData.ueContent ref="ue"></ueditor>
        </el-col>
      </el-form-item>
  </div>
</template>

<script type="text/ecmascript">
import ueditor from '../../components/ueditor/ueditor'

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
    ueditor
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
