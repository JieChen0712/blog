<template>
  <div class="menuleft" :class="{close:isCollapse}">
    <i class="fa fa-bars collapse" :class="{'close':isCollapse,'open':!isCollapse}" @click.stop="toggleMenu"></i>
    <div class="hidden-scroll">
      <div class="menu-wrapper" :class="{close:isCollapse}">
        <div class="logo-wrapper">
          <transition name="fade">
          <p class="logo-text" v-show="!isCollapse">{{userName}}</p>
          </transition>
        </div>
        <div class="menulist">
          <userstatus :isCollapse="isCollapse"></userstatus>
          <searchbox :isCollapse="isCollapse"></searchbox>
          <menulist :isCollapse="isCollapse" :useRouter="useRouter" :uniqueOpened="uniqueOpened"></menulist>
        </div>
        <div class="tool-wrapper" :class="{close:isCollapse}">
            <menutool :isCollapse="isCollapse"></menutool>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript">
import menulist from './MenuList'
import userstatus from '../userstatus/status'
import searchbox from '../searchbox/searchbox'
import menutool from '../toolbox/menutool'
export default {
  name: 'MenuLeft',
  props: {
    isCollapse: Boolean
  },
  data () {
    return {
      useRouter: true, // 是否使用路由
      uniqueOpened: true // 是否只能展示一列的菜单
    }
  },
  created () {},
  methods: {
    toggleMenu () {
    //  this.isCollapse = !this.isCollapse
      this.$emit('collapse', event.target, this.isCollapse)
    },
    check_link () {
      console.log(1)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  computed: {
    userName () {
      return this.$store.getters.getUserName
    }
  },
  components: {
    menulist,
    userstatus,
    searchbox,
    menutool
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
@import '../../common/scss/index.scss';
@import '../../common/scss/animation.scss';
  .menuleft{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    overflow-x: hidden;
    z-index: 100;
    height: 100%;
    width: 250px;
    overflow: hidden;
    padding: 55px 0px 35px 5px;
    transition: width .5s ease;
    box-sizing: border-box;
    &.close{
      width: 70px
    }
    @include menu-bg-color();
    .collapse{
        position: absolute;
        left: 25px;
        top: 10px;
        font-size: 25px;
        cursor: pointer;
        transition: color .5s ease;
        z-index: 10;
        &.open{
            @include menu-logo-color();
        }
        &.close{
            @include menu-bg-color();
        }
    }
    .hidden-scroll{
      height:100%;
      overflow-x: hidden;
      .menu-wrapper{
        width: 270px;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        transition: width .5s ease;
        &.close{
          width: 90px;
        }
        .logo-wrapper{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          min-width: 250px;
          -webkit-transition: all .5s ease;
          transition: all .5s ease;
          height: 55px;
          padding: 15px 20px;
          color: white;
          font-weight: bold;
          font-size: 18px;
          text-align: center;
          border-bottom: 1px solid #10151d;
          box-sizing: border-box;
          .logo-text{
            margin: 0;
            @include Fade(1,.2s,.3s);
            @include menu-logo-color();
          }
        }
        .tool-wrapper{
          position: absolute;
          bottom: 0;
          left: 0;
          height: 35px;
          width: 100%;
          min-width: 250px;
          transition: all .5s ease;
          &.close{
            left: -185px;
          }
        }
      }
    }
  }
</style>
