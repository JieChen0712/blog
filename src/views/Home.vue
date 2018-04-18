<template>
  <div class="home">
    <menuleft @collapse="toggleMenu" :isCollapse="isCollapse"></menuleft>
    <div class="right_wrapper_full" :class="{close:isCollapse}">
      <transition name="rotate" mode="out-in">
        <keep-alive><router-view class="wrapper"></router-view></keep-alive>
      </transition>
    </div>
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
  mounted () {
  // console.log(this.$route)
  },
  components: {
    menuleft
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
@import '../common/scss/animation.scss';
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
    .wrapper{
      @include Rotate(0deg,90deg,.5s);
    }
  }
</style>
