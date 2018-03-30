<template>
    <transition name="movefade">
  <div class="searchbox" v-show="!isCollapse">
      <el-autocomplete
      class="inline-input"
      suffix-icon="el-icon-search"
      v-model="state2"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
  </transition>
</template>

<script type="text/ecmascript">
export default {
  props: {
    isCollapse: Boolean
  },
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

<style lang="scss" type="text/css">
@import '../../common/scss/index.scss';
@import '../../common/scss/animation.scss';
.searchbox{
    padding: 10px 20px;
    @include menu-item-border();
    @include LeftTopFade(100%,60px,.5s);
    .el-input--suffix .el-input__inner{
        @include search-box();
    }
}

</style>
