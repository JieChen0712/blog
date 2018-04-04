<template>
  <div id="app">
    <menuleft @collapse="toggleMenu" :isCollapse="isCollapse"></menuleft>
    <div class="right_wrapper_full" :class="{close:isCollapse}"><keep-alive><router-view></router-view></keep-alive></div>
  </div>
</template>

<script>
import menuleft from './components/menu/MenuLeft'

export default {
  name: 'App',
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    }
  },
  components: {
    menuleft
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
@import './common/scss/color.scss';
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .right_wrapper_full{
    position: fixed;
    top: 0;
    right: 0;
    left: 250px;
    bottom: 0;
    transition: all .5s ease-out;
    overflow-x: hidden;
    z-index: 100;
    &.close{
      left: 70px;
    }
  }
}
</style>
