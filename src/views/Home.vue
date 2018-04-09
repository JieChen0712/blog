<template>
  <div class="home">
    <menuleft @collapse="toggleMenu" :isCollapse="isCollapse"></menuleft>
    <div class="right_wrapper_full" :class="{close:isCollapse}"><keep-alive><router-view></router-view></keep-alive></div>
  </div>
</template>

<script type="text/ecmascript">
import menuleft from '../components/menu/MenuLeft'
export default {
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
</style>
