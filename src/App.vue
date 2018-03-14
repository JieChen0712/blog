<template>
  <div id="app">
    <div class="left_wrapper_full">
      <menuleft></menuleft>
    </div>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .left_wrapper_full{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 250px;
    transition: all .5s ease-out;
    overflow-x: hidden;
    z-index: 100;
  }
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
