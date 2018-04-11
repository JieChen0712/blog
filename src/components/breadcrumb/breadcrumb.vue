<template>
  <div class="breadcrumb">
    <h1 v-text="name">{{$route.name}}</h1>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in $route.matched"  :key="item.path" v-text="item.name" ></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script type="text/ecmascript">
export default {
  data () {
    return {}
  },
  created () {},
  mounted () {
    console.log(this.$router.options.routes)
  },
  methods: {}
}
</script>

<style lang="scss" scoped="" type="text/css">
</style>
