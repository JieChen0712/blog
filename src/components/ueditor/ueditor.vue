<template>
  <div>
    <script :id="id" type="text/plain"></script>
  </div>
</template>

<script type="text/ecmascript">
export default {
  name: 'UE',
  data () {
    return {
      editor: null
    }
  },
  props: {
    content: String,
    config: {
      type: Object
    },
    id: {
      type: String
    }
  },
  mounted () {
    let _this = this
    this.editor = window.UE.getEditor(this.id, this.config)// 初始化UE
    this.editor.addListener('ready', function () {
      _this.editor.setContent(_this.content)// 确保UE加载完成后，放入内容。
    })
    this.editor.addListener('contentChange', function () {
      _this.$emit('change', _this.getUEContent())
    })
  },
  methods: {
    getUEContent () { // 获取内容方法
      return this.editor.getContent()
    },
    getUEContentTxt () { // 获取纯文本内容方法
      return this.editor.getContentTxt()
    }
  },
  destroyed () {
    this.editor.destroy()
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
</style>
