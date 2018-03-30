<template>
  <div id="app">
    <menuleft></menuleft>
    <div class="right_wrapper_full"><router-view/></div>
  </div>
</template>

<script>
import menuleft from './components/menu/MenuLeft'

export default {
  name: 'App',
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
  margin-top: 60px;
  .right_wrapper_full{
    position: fixed;
    top: 60px;
    right: 0;
    left: 250px;
    bottom: 0;
    transition: all .5s ease-out;
    overflow-x: hidden;
    z-index: 100;
  }
}
</style>
