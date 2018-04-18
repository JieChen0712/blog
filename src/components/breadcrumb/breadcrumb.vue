<template>
  <div class="breadcrumb">
    <div class="breadcrumb-wrapper">
      <p class="title">{{$router.options.name}}</p>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="item in $route.matched"  :key="item.path" :to="item.path">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
  </div>
</template>

<script type="text/ecmascript">
export default {
  data () {
    return {}
  },
  created () {},
  mounted () {
    console.log(this.$router.options)
  },
  methods: {}
}
</script>

<style lang="scss" type="text/css">
@import '../../common/scss/color.scss';
.breadcrumb-wrapper{
    position: relative;
    height:50px;
    padding-left: 55px;
    @include breadcrumb-bg-color();
    &:before{
      content: "";
      width: 0;
      height: 0;
      position: absolute;
      left: 0;
      top: 0;
      border-top: 45px solid white;
      border-right: 45px solid transparent;
      box-sizing: content-box;
    }
    &:after{
      content: "";
      width: 0;
      height: 0;
      position: absolute;
      left: 0;
      top: 0;
      border-bottom: 45px solid;
      @include breadcrumb-border-color();
      border-left: 45px solid transparent;
      box-shadow:  2px 2px 3px rgba(0,0,0,.5);
      box-sizing: content-box;
    }
    .title{
      margin:0;
      text-align: left;
      font-weight: bold;
      line-height: 30px;
    }
    .el-breadcrumb{
      @include breadcrumb-text-color();
      .el-breadcrumb__inner{
        @include breadcrumb-text-color();
      }
    }
}
</style>
