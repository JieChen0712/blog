<template>
  <div class="menutool">
    <el-autocomplete
      class="inline-input"
      suffix-icon="el-icon-date"
      v-model="state2"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script type="text/ecmascript">
export default {
  data () {
    return {
      restaurants: [],
      state1: '',
      state2: ''
    }
  },
  created () {},
  mounted () {
    this.restaurants = this.loadAll()
  },
  methods: {
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll () {
      return [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' }
      ]
    },
    handleSelect (item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
</style>
