<template>
  <div class="upload">
    <el-upload class="avatar-uploader" drag action="/api/img/upload" :data="filePath" name="avatar" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
      <img v-if="imgUrl" :src="imgUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script type="text/ecmascript">
export default {
  props: {
    filePath: Object,
    imgUrl: String
  },
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {
    handleAvatarSuccess (res, file) {
      this.imgUrl = res.data.info
      // this.formData.avatar = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      let isJPG = file.type === 'image/jpeg'
      let isPNG = file.type === 'image/png'
      let isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG || !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isPNG && isLt2M
    }
  },
  watch: {
    imgUrl (val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
@import '../../common/scss/base.scss';
.upload {
  .avatar-uploader {
    overflow: hidden;
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
