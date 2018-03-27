<template>
  <div class="menuleft">
    <i class="fa fa-bars collapse" :class="{'close':isCollapse,'open':!isCollapse}" @click="toggleMenu"></i>
    <div class="hidden-scroll">
      <div class="menu-wrapper">
        <div class="logo-wrapper">
          <p class="logo-text" v-show="!isCollapse">Jie Chen</p>
        </div>
        <div class="menulist">
          <userstatus :isCollapse="isCollapse"></userstatus>
          <searchbox :isCollapse="isCollapse"></searchbox>
          <menulist :isCollapse="isCollapse" :useRouter="useRouter" :uniqueOpened="uniqueOpened"></menulist>
        </div>
        <div class="tool-wrapper">
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
  data () {
    return {
      isCollapse: false, // 菜单关闭或开启状态
      useRouter: true, // 是否使用路由
      uniqueOpened: true // 是否只能展示一列的菜单
    }
  },
  created () {},
  methods: {
    toggleMenu () {
      this.isCollapse = !this.isCollapse
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
  .menuleft{
    height: 100%;
    width: 250px;
    overflow: hidden;
    padding-left: 5px;
    padding-bottom: 35px;
    @include menu-bg-color();
    .collapse{
        position: absolute;
        left: 25px;
        top: 10px;
        font-size: 25px;
        cursor: pointer;
        transition: color .3s ease;
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
        /*padding-right: 20px;*/
        overflow-y: scroll;
        overflow-x: hidden;
        .logo-wrapper{
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
            @include menu-logo-color();
          }
        }
        .tool-wrapper{
            position: absolute;
            bottom: 0;
            left: 0;
            height: 35px;
            width: 100%;
        }
      }
    }
  }
</style>
