<template>
  <div id="app">
    <div class="top_wrapper_full"></div>
    <div class="left_wrapper_full"></div>
    <div class="right_wrapper_full"><img src="./assets/logo.png"><router-view/></div>
  </div>
</template>

<script>
export default {
  name: 'App'
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
  .top_wrapper_full{
    position: fixed;
    height: 60px;
    top: 0;
    left: 0;
    right: 0;
  }
  .left_wrapper_full{
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    width: 250px;
    transition: all .5s ease-out;
  }
  .right_wrapper_full{
    position: fixed;
    top: 60px;
    right: 0;
    left: 250px;
    bottom: 0;
    transition: all .5s ease-out;
  }
}
</style>
